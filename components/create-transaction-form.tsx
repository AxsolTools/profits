'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { useWallet } from '@solana/wallet-adapter-react'
import { StreamflowSolana, Types, getBN } from '@streamflow/stream'
import BN from 'bn.js'

type Category = 
  | 'goods' 
  | 'services' 
  | 'digital' 
  | 'real_estate' 
  | 'vehicle' 
  | 'otc' 
  | 'other'

type Step = 'category' | 'details' | 'terms' | 'review'

const categories = [
  { id: 'goods', name: 'Physical Goods', icon: '📦', desc: 'Electronics, Clothing, Collectibles' },
  { id: 'services', name: 'Services & Freelance', icon: '💻', desc: 'Development, Design, Consulting' },
  { id: 'digital', name: 'Digital Assets', icon: '🌐', desc: 'Domains, Accounts, NFTs' },
  { id: 'vehicle', name: 'Automotive', icon: '🚗', desc: 'Cars, Bikes, Boats, Parts' },
  { id: 'real_estate', name: 'Real Estate', icon: '🏠', desc: 'Deposits, Rentals, Sales' },
  { id: 'otc', name: 'OTC Trade', icon: '💱', desc: 'P2P Token Swaps' },
]

const inspectionPresets: Record<string, number> = {
  '24h': 24 * 60 * 60,
  '48h': 48 * 60 * 60,
  '72h': 72 * 60 * 60,
  '7d': 7 * 24 * 60 * 60,
}

function parseInspectionPeriod(value: string) {
  return inspectionPresets[value] || 24 * 60 * 60
}

const DEFAULT_USDC_MINT = 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v'
const DEFAULT_USDT_MINT = 'Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB'
const DEFAULT_WSOL_MINT = 'So11111111111111111111111111111111111111112'

function getCurrencyConfig(currency: string) {
  const usdcMint = process.env.NEXT_PUBLIC_USDC_MINT || DEFAULT_USDC_MINT
  const usdtMint = process.env.NEXT_PUBLIC_USDT_MINT || DEFAULT_USDT_MINT
  const wsolMint = process.env.NEXT_PUBLIC_WSOL_MINT || DEFAULT_WSOL_MINT

  if (currency === 'USDC') {
    return {
      mint: usdcMint,
      decimals: Number(process.env.NEXT_PUBLIC_USDC_DECIMALS || 6),
      isNative: false
    }
  }
  if (currency === 'USDT') {
    return {
      mint: usdtMint,
      decimals: Number(process.env.NEXT_PUBLIC_USDT_DECIMALS || 6),
      isNative: false
    }
  }
  if (currency === 'SOL') {
    return { mint: wsolMint, decimals: 9, isNative: true }
  }

  throw new Error('Unsupported currency.')
}

export function CreateTransactionForm() {
  const router = useRouter()
  const { publicKey, wallet } = useWallet()
  const [step, setStep] = useState<Step>('category')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  const [formData, setFormData] = useState({
    category: '' as Category,
    buyerWallet: '',
    sellerWallet: '',
    amount: '',
    currency: 'USDC',
    description: '',
    // Dynamic fields
    shippingCarrier: '',
    trackingNumber: '',
    shippingRequiresSignature: false,
    milestones: [{ title: '', amount: '' }],
    domainName: '',
    inspectionPeriod: '24h',
    serviceScope: '',
    revisionPolicy: '',
    assetType: '',
    transferMethod: '',
  })

  const walletAddress = publicKey?.toBase58() || ''

  useEffect(() => {
    if (walletAddress) {
      setFormData((prev) => ({ ...prev, buyerWallet: walletAddress }))
    }
  }, [walletAddress])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (step !== 'review') return

    setLoading(true)
    setError(null)
    try {
      if (!walletAddress) {
        throw new Error('Connect your wallet to create an escrow.')
      }
      if (!formData.sellerWallet || !formData.amount || !formData.category || !formData.description) {
        throw new Error('Please complete all required fields.')
      }
      if (!wallet?.adapter) {
        throw new Error('Wallet adapter not available for signing.')
      }

      const metadata: Record<string, unknown> = {}
      if (formData.shippingCarrier) metadata.shippingCarrier = formData.shippingCarrier
      if (formData.trackingNumber) metadata.trackingNumber = formData.trackingNumber
      if (formData.shippingRequiresSignature) metadata.shippingRequiresSignature = true
      if (formData.domainName) metadata.domainName = formData.domainName
      if (formData.inspectionPeriod) metadata.inspectionPeriod = formData.inspectionPeriod
      if (formData.serviceScope) metadata.serviceScope = formData.serviceScope
      if (formData.revisionPolicy) metadata.revisionPolicy = formData.revisionPolicy
      if (formData.assetType) metadata.assetType = formData.assetType
      if (formData.transferMethod) metadata.transferMethod = formData.transferMethod
      if (formData.milestones?.length) {
        metadata.milestones = formData.milestones
          .filter((milestone) => milestone.title || milestone.amount)
          .map((milestone) => ({
            title: milestone.title,
            amount: milestone.amount ? Number(milestone.amount) : null,
          }))
      }

      const { mint, decimals, isNative } = getCurrencyConfig(formData.currency)
      const totalAmount = getBN(Number(formData.amount), decimals)
      const minimalUnit = new BN(1)
      const cliffAmount = totalAmount.lte(minimalUnit) ? totalAmount : totalAmount.subn(1)
      const amountPerPeriod = totalAmount.lte(minimalUnit) ? new BN(0) : minimalUnit

      const now = Math.floor(Date.now() / 1000)
      const cliffTime = now + parseInspectionPeriod(formData.inspectionPeriod)

      const client = new StreamflowSolana.SolanaStreamClient(
        process.env.NEXT_PUBLIC_SOLANA_RPC_URL || 'https://api.mainnet-beta.solana.com'
      )

      const createParams: Types.ICreateStreamData = {
        recipient: formData.sellerWallet,
        tokenId: mint,
        start: cliffTime,
        amount: totalAmount,
        period: 1,
        cliff: cliffTime,
        cliffAmount,
        amountPerPeriod,
        name: formData.description,
        canTopup: false,
        automaticWithdrawal: false,
        cancelableBySender: false,
        cancelableByRecipient: false,
        transferableBySender: false,
        transferableByRecipient: false,
      }

      const { metadataId, txId } = await client.create(createParams, {
        sender: wallet.adapter,
        isNative,
      })

      metadata.streamflowTxId = txId

      const response = await fetch('/api/transactions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          buyerWallet: walletAddress,
          sellerWallet: formData.sellerWallet,
          amount: Number(formData.amount),
          currency: formData.currency,
          category: formData.category,
          title: formData.description,
          metadata,
          streamflowId: metadataId,
        }),
      })

      if (!response.ok) {
        const data = await response.json().catch(() => ({}))
        throw new Error(data.error || 'Failed to create escrow')
      }

      router.push('/dashboard')
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to create escrow'
      setError(message)
    } finally {
      setLoading(false)
    }
  }

  const nextStep = () => {
    if (step === 'category') setStep('details')
    else if (step === 'details') setStep('terms')
    else if (step === 'terms') setStep('review')
  }

  const updateMilestone = (index: number, field: 'title' | 'amount', value: string) => {
    setFormData((prev) => ({
      ...prev,
      milestones: prev.milestones.map((milestone, i) =>
        i === index ? { ...milestone, [field]: value } : milestone
      ),
    }))
  }

  const addMilestone = () => {
    setFormData((prev) => ({
      ...prev,
      milestones: [...prev.milestones, { title: '', amount: '' }],
    }))
  }

  const removeMilestone = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      milestones: prev.milestones.filter((_, i) => i !== index),
    }))
  }

  const prevStep = () => {
    if (step === 'details') setStep('category')
    else if (step === 'terms') setStep('details')
    else if (step === 'review') setStep('terms')
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Progress Steps */}
      <div className="flex justify-between mb-12 relative max-w-2xl mx-auto">
        <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-100 -translate-y-1/2 z-0" />
        {['category', 'details', 'terms', 'review'].map((s, i) => {
          const isActive = s === step
          const isCompleted = ['category', 'details', 'terms', 'review'].indexOf(step) > i
          
          return (
            <div key={s} className="relative z-10 flex flex-col items-center gap-2">
              <div 
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all duration-500 border-4 ${
                  isActive || isCompleted 
                    ? 'bg-[var(--proof-primary)] border-[var(--proof-primary)]/30 text-white shadow-lg shadow-[var(--proof-primary)]/20' 
                    : 'bg-white border-gray-200 text-gray-400'
                }`}
              >
                {isCompleted ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  i + 1
                )}
              </div>
              <span className={`text-xs font-bold uppercase tracking-wider ${isActive ? 'text-[var(--proof-primary)]' : 'text-gray-400'}`}>
                {s}
              </span>
            </div>
          )
        })}
      </div>

      {/* Form Container */}
      <div className="bg-white p-8 md:p-10 rounded-[2.5rem] border border-gray-100 shadow-xl shadow-gray-200/50 relative overflow-hidden">
        <form onSubmit={handleSubmit} className="relative z-10">
          <div className="min-h-[400px]">
            
            {/* STEP 1: CATEGORY SELECTION */}
            {step === 'category' && (
              <div className="space-y-8 animate-in fade-in slide-in-from-right-8 duration-500">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-gray-900 font-[family-name:var(--font-montserrat)]">What are you transacting?</h2>
                  <p className="text-gray-500 mt-2">Select the category to enable specific protection features.</p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => {
                        setFormData({ ...formData, category: cat.id as Category })
                        nextStep()
                      }}
                      className={`p-6 rounded-2xl border-2 text-left transition-all hover:scale-[1.02] ${
                        formData.category === cat.id
                          ? 'border-[var(--proof-primary)] bg-[var(--proof-primary)]/5 ring-4 ring-[var(--proof-primary)]/10'
                          : 'border-gray-100 hover:border-[var(--proof-primary)]/30 hover:bg-gray-50'
                      }`}
                    >
                      <span className="text-4xl mb-4 block">{cat.icon}</span>
                      <h3 className="font-bold text-gray-900">{cat.name}</h3>
                      <p className="text-xs text-gray-500 mt-1">{cat.desc}</p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 2: TRANSACTION DETAILS */}
            {step === 'details' && (
              <div className="space-y-8 animate-in fade-in slide-in-from-right-8 duration-500">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-gray-900 font-[family-name:var(--font-montserrat)]">Transaction Details</h2>
                  <p className="text-gray-500 mt-2">Define the terms of the agreement.</p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Transaction Title</label>
                      <Input 
                        placeholder="e.g. iPhone 15 Pro Max - Blue Titanium"
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        className="h-14 rounded-xl"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Amount</label>
                        <div className="relative">
                          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold">$</span>
                          <Input 
                            type="number"
                            placeholder="0.00"
                            value={formData.amount}
                            onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                            className="h-14 rounded-xl pl-8"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Currency</label>
                        <select 
                          className="w-full h-14 rounded-xl border border-gray-200 bg-white px-4 font-medium"
                          value={formData.currency}
                          onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
                        >
                          <option value="USDC">USDC (Solana)</option>
                          <option value="SOL">SOL</option>
                          <option value="USDT">USDT</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Dynamic Fields based on Category */}
                  <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 space-y-6">
                    <h3 className="font-bold text-gray-900 flex items-center gap-2">
                      <span className="text-xl">{categories.find(c => c.id === formData.category)?.icon}</span>
                      Category Specifics
                    </h3>

                    {formData.category === 'goods' && (
                      <>
                        <div>
                          <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Shipping Details</label>
                          <Input
                            placeholder="Carrier (e.g. FedEx, UPS)"
                            value={formData.shippingCarrier}
                            onChange={(e) => setFormData({ ...formData, shippingCarrier: e.target.value })}
                            className="h-12 bg-white mb-3"
                          />
                          <Input
                            placeholder="Tracking Number (Optional)"
                            value={formData.trackingNumber}
                            onChange={(e) => setFormData({ ...formData, trackingNumber: e.target.value })}
                            className="h-12 bg-white"
                          />
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <input
                            type="checkbox"
                            checked={formData.shippingRequiresSignature}
                            onChange={(e) => setFormData({ ...formData, shippingRequiresSignature: e.target.checked })}
                            className="w-4 h-4 rounded border-gray-300 text-[var(--proof-primary)]"
                          />
                          Require signature on delivery
                        </div>
                      </>
                    )}

                    {formData.category === 'services' && (
                      <>
                        <div>
                          <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Scope of Work</label>
                          <Textarea
                            placeholder="Describe the deliverables..."
                            value={formData.serviceScope}
                            onChange={(e) => setFormData({ ...formData, serviceScope: e.target.value })}
                            className="bg-white min-h-[100px]"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Revision Policy</label>
                          <Input
                            placeholder="e.g. 2 rounds of revisions included"
                            value={formData.revisionPolicy}
                            onChange={(e) => setFormData({ ...formData, revisionPolicy: e.target.value })}
                            className="h-12 bg-white"
                          />
                        </div>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <label className="block text-xs font-bold text-gray-500 uppercase">Milestones</label>
                            <button
                              type="button"
                              onClick={addMilestone}
                              className="text-xs font-bold text-[var(--proof-primary)] hover:underline"
                            >
                              Add Milestone
                            </button>
                          </div>
                          {formData.milestones.map((milestone, index) => (
                            <div key={`milestone-${index}`} className="grid grid-cols-5 gap-2 items-center">
                              <Input
                                placeholder="Milestone title"
                                value={milestone.title}
                                onChange={(e) => updateMilestone(index, 'title', e.target.value)}
                                className="col-span-3 h-11 bg-white"
                              />
                              <Input
                                type="number"
                                placeholder="Amount"
                                value={milestone.amount}
                                onChange={(e) => updateMilestone(index, 'amount', e.target.value)}
                                className="col-span-2 h-11 bg-white"
                              />
                              {formData.milestones.length > 1 && (
                                <button
                                  type="button"
                                  onClick={() => removeMilestone(index)}
                                  className="text-xs text-red-500 font-bold col-span-5 text-right"
                                >
                                  Remove
                                </button>
                              )}
                            </div>
                          ))}
                        </div>
                      </>
                    )}

                    {formData.category === 'digital' && (
                      <>
                        <div>
                          <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Asset Type</label>
                          <Input
                            placeholder="e.g. Domain Name, Social Handle"
                            value={formData.assetType}
                            onChange={(e) => setFormData({ ...formData, assetType: e.target.value })}
                            className="h-12 bg-white"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Domain / Asset Identifier</label>
                          <Input
                            placeholder="e.g. proof.xyz"
                            value={formData.domainName}
                            onChange={(e) => setFormData({ ...formData, domainName: e.target.value })}
                            className="h-12 bg-white"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Transfer Method</label>
                          <Input
                            placeholder="e.g. Auth Code, Email Change"
                            value={formData.transferMethod}
                            onChange={(e) => setFormData({ ...formData, transferMethod: e.target.value })}
                            className="h-12 bg-white"
                          />
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* STEP 3: WALLETS & TERMS */}
            {step === 'terms' && (
              <div className="space-y-8 animate-in fade-in slide-in-from-right-8 duration-500">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-gray-900 font-[family-name:var(--font-montserrat)]">Counterparties</h2>
                  <p className="text-gray-500 mt-2">Who is involved in this contract?</p>
                </div>

                <div className="space-y-6">
                  <div className="group">
                    <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">Buyer (You)</label>
                    <Input
                      value={walletAddress || formData.buyerWallet}
                      onChange={(e) => setFormData({ ...formData, buyerWallet: e.target.value })}
                      placeholder="Connect your wallet to auto-fill"
                      disabled={!!walletAddress}
                      className="h-16 pl-4 rounded-2xl border-gray-200 bg-gray-50/50 focus:bg-white focus:border-[var(--proof-primary)] transition-all font-mono text-sm disabled:opacity-70"
                    />
                  </div>

                  <div className="group">
                    <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">Seller</label>
                    <Input
                      value={formData.sellerWallet}
                      onChange={(e) => setFormData({ ...formData, sellerWallet: e.target.value })}
                      placeholder="Solana Wallet Address"
                      className="h-16 pl-4 rounded-2xl border-gray-200 bg-gray-50/50 focus:bg-white focus:border-[var(--proof-primary)] transition-all font-mono text-sm"
                    />
                  </div>

                  <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100 flex gap-4 mt-8">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center shrink-0 text-blue-600">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                    </div>
                    <div>
                      <h4 className="font-bold text-blue-900">Platform Fee: 1%</h4>
                      <p className="text-sm text-blue-700 mt-1">
                        Funds will be locked in a Streamflow smart contract.
                        If a dispute arises, PROOF token holders will vote on the outcome.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 4: REVIEW */}
            {step === 'review' && (
              <div className="space-y-8 animate-in fade-in slide-in-from-right-8 duration-500">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-gray-900 font-[family-name:var(--font-montserrat)]">Review Contract</h2>
                  <p className="text-gray-500 mt-2">Please verify all details before deploying to the blockchain.</p>
                </div>

                <div className="bg-gray-50 rounded-3xl p-8 space-y-6 relative overflow-hidden border border-gray-200">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--proof-primary)]/5 rounded-bl-[100px]" />
                  
                  <div className="flex justify-between items-center pb-6 border-b border-gray-200">
                    <div>
                      <p className="text-sm text-gray-500 font-medium">Total Locked Value</p>
                      <p className="text-3xl font-black text-gray-900 mt-1">${formData.amount || '0.00'} <span className="text-lg font-bold text-gray-400">USDC</span></p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500 font-medium">Category</p>
                      <div className="inline-flex items-center gap-2 bg-white px-3 py-1 rounded-full border border-gray-200 mt-1 shadow-sm">
                        <span>{categories.find(c => c.id === formData.category)?.icon}</span>
                        <span className="font-bold text-gray-700 text-sm">{categories.find(c => c.id === formData.category)?.name}</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-8 py-4">
                    <div>
                      <span className="text-xs uppercase font-bold text-gray-400 tracking-wider">Buyer (You)</span>
                      <p className="font-mono text-sm text-gray-900 mt-1 truncate">{formData.buyerWallet || '...'}</p>
                    </div>
                    <div>
                      <span className="text-xs uppercase font-bold text-gray-400 tracking-wider">Seller</span>
                      <p className="font-mono text-sm text-gray-900 mt-1 truncate">{formData.sellerWallet || '...'}</p>
                    </div>
                  </div>

                  <div className="bg-white p-4 rounded-xl border border-gray-200">
                    <span className="text-xs uppercase font-bold text-gray-400 tracking-wider block mb-2">Description</span>
                    <p className="text-gray-900 font-medium">{formData.description || 'No description provided.'}</p>
                  </div>

                  <div className="pt-2 flex items-center gap-2 text-sm text-gray-500 justify-center">
                    <svg className="w-4 h-4 text-[var(--proof-success)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                    Protected by <span className="font-bold text-gray-700">Streamflow</span> & <span className="font-bold text-gray-700">Realms</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {error && (
            <div className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
              {error}
            </div>
          )}

          <div className="flex gap-4 mt-8 pt-8 border-t border-gray-100">
            {step !== 'category' && (
              <Button
                type="button"
                variant="outline"
                onClick={prevStep}
                className="h-14 px-8 rounded-xl border-2 hover:bg-gray-50 text-gray-600 font-bold"
              >
                Back
              </Button>
            )}
            
            {step !== 'review' ? (
              <Button
                type="button"
                onClick={nextStep}
                disabled={step === 'category' && !formData.category}
                className="flex-1 h-14 bg-[var(--proof-primary)] hover:bg-[var(--proof-primary-hover)] text-white font-bold rounded-xl text-lg shadow-lg shadow-[var(--proof-primary)]/25 transition-all hover:scale-[1.02]"
              >
                Continue
              </Button>
            ) : (
              <Button
                type="submit"
                disabled={loading}
                className="flex-1 h-14 bg-gradient-to-r from-[var(--proof-primary)] to-[var(--proof-primary-dark)] text-white font-bold rounded-xl text-lg shadow-lg shadow-[var(--proof-primary)]/25 transition-all hover:scale-[1.02] flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Deploying Contract...
                  </>
                ) : (
                  <>
                    Deploy Escrow Contract
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                  </>
                )}
              </Button>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}
