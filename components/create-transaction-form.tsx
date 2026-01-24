'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useReducedMotion } from '@/hooks/use-reduced-motion'

type Step = 'parties' | 'amount' | 'review'

export function CreateTransactionForm() {
  const router = useRouter()
  const [step, setStep] = useState<Step>('parties')
  const [loading, setLoading] = useState(false)
  const prefersReducedMotion = useReducedMotion()
  
  const [formData, setFormData] = useState({
    buyerWallet: '',
    sellerWallet: '',
    amount: '',
    currency: 'USDC',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (step !== 'review') return

    setLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      router.push('/dashboard')
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const nextStep = () => {
    if (step === 'parties') setStep('amount')
    else if (step === 'amount') setStep('review')
  }

  const prevStep = () => {
    if (step === 'amount') setStep('parties')
    else if (step === 'review') setStep('amount')
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Progress Steps */}
      <div className="flex justify-between mb-12 relative">
        <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-100 -translate-y-1/2 z-0" />
        {['parties', 'amount', 'review'].map((s, i) => {
          const isActive = s === step
          const isCompleted = (step === 'amount' && i === 0) || (step === 'review' && i <= 1)
          
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
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[var(--proof-primary)]/5 to-transparent rounded-bl-[100px] pointer-events-none" />
        
        <form onSubmit={handleSubmit} className="relative z-10">
          <div className="min-h-[320px]">
            {step === 'parties' && (
              <div className="space-y-8 animate-in fade-in slide-in-from-right-8 duration-500">
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-gray-900">Who is involved?</h2>
                  <p className="text-gray-500 mt-2">Enter the wallet addresses for both parties.</p>
                </div>

                <div className="space-y-6">
                  <div className="group">
                    <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">Buyer (You)</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <div className="w-8 h-8 rounded-full bg-[var(--proof-primary)]/10 flex items-center justify-center text-[var(--proof-primary)]">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                        </div>
                      </div>
                      <Input
                        value={formData.buyerWallet}
                        onChange={(e) => setFormData({ ...formData, buyerWallet: e.target.value })}
                        placeholder="Solana Wallet Address"
                        className="h-16 pl-14 rounded-2xl border-gray-200 bg-gray-50/50 focus:bg-white focus:border-[var(--proof-primary)] focus:ring-[var(--proof-primary)]/20 transition-all font-mono text-sm"
                        autoFocus
                      />
                    </div>
                  </div>

                  <div className="group">
                    <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">Seller</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <div className="w-8 h-8 rounded-full bg-[var(--proof-accent)]/10 flex items-center justify-center text-[var(--proof-accent)]">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                        </div>
                      </div>
                      <Input
                        value={formData.sellerWallet}
                        onChange={(e) => setFormData({ ...formData, sellerWallet: e.target.value })}
                        placeholder="Solana Wallet Address"
                        className="h-16 pl-14 rounded-2xl border-gray-200 bg-gray-50/50 focus:bg-white focus:border-[var(--proof-primary)] focus:ring-[var(--proof-primary)]/20 transition-all font-mono text-sm"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {step === 'amount' && (
              <div className="space-y-8 animate-in fade-in slide-in-from-right-8 duration-500">
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-gray-900">How much?</h2>
                  <p className="text-gray-500 mt-2">Specify the amount to be locked in escrow.</p>
                </div>

                <div className="flex flex-col items-center justify-center py-8">
                  <div className="relative w-full max-w-xs group">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-4xl font-bold text-gray-300 group-focus-within:text-[var(--proof-primary)] transition-colors">$</span>
                    <input
                      type="number"
                      value={formData.amount}
                      onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                      placeholder="0.00"
                      className="w-full h-24 pl-12 bg-transparent text-5xl font-black text-gray-900 placeholder-gray-200 border-b-4 border-gray-100 focus:border-[var(--proof-primary)] outline-none text-center transition-all"
                      autoFocus
                    />
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-full ml-4">
                      <span className="bg-gray-100 text-gray-600 font-bold px-3 py-1 rounded-lg text-sm">USDC</span>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100 flex gap-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center shrink-0 text-blue-600">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-blue-900">Platform Fee: 1%</h4>
                    <p className="text-sm text-blue-700 mt-1">
                      A small fee is deducted from the final released amount. 
                      You will need ~0.002 SOL for network fees.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {step === 'review' && (
              <div className="space-y-8 animate-in fade-in slide-in-from-right-8 duration-500">
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-gray-900">Ready to Lock?</h2>
                  <p className="text-gray-500 mt-2">Review the details before creating the contract.</p>
                </div>

                <div className="bg-gray-50 rounded-3xl p-8 space-y-6 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--proof-primary)]/5 rounded-bl-[100px]" />
                  
                  <div className="flex justify-between items-center pb-6 border-b border-gray-200">
                    <span className="text-gray-500 font-medium">Total Amount</span>
                    <span className="text-3xl font-black text-gray-900">${formData.amount || '0.00'}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-8">
                    <div>
                      <span className="text-xs uppercase font-bold text-gray-400 tracking-wider">From (You)</span>
                      <p className="font-mono text-sm text-gray-900 mt-1 truncate">{formData.buyerWallet || '...'}</p>
                    </div>
                    <div>
                      <span className="text-xs uppercase font-bold text-gray-400 tracking-wider">To (Seller)</span>
                      <p className="font-mono text-sm text-gray-900 mt-1 truncate">{formData.sellerWallet || '...'}</p>
                    </div>
                  </div>

                  <div className="pt-4 flex items-center gap-2 text-sm text-gray-500">
                    <svg className="w-4 h-4 text-[var(--proof-success)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                    Protected by Streamflow Smart Contract
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="flex gap-4 mt-8 pt-8 border-t border-gray-100">
            {step !== 'parties' && (
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
                    Creating...
                  </>
                ) : (
                  <>
                    Create Contract
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
