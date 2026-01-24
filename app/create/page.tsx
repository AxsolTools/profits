'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { createTransactionSchema } from '@/lib/validations/transaction'

export default function CreateTransactionPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    buyerWallet: '',
    sellerWallet: '',
    amount: '',
    currency: 'USDC',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    try {
      // In a real app, this would call api.transactions.create
      console.log('Creating transaction:', formData)
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Redirect to dashboard
      router.push('/dashboard')
    } catch (error) {
      console.error('Failed to create transaction', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">New Escrow Transaction</h1>
        <p className="text-gray-500 mt-1">Create a secure, non-custodial escrow contract</p>
      </div>

      <div className="bg-white p-8 rounded-3xl border border-gray-200 shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Buyer Wallet (You)</label>
              <Input
                value={formData.buyerWallet}
                onChange={(e) => setFormData({ ...formData, buyerWallet: e.target.value })}
                placeholder="Solana Wallet Address"
                className="h-12 rounded-xl"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Seller Wallet</label>
              <Input
                value={formData.sellerWallet}
                onChange={(e) => setFormData({ ...formData, sellerWallet: e.target.value })}
                placeholder="Solana Wallet Address"
                className="h-12 rounded-xl"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Amount & Currency</label>
            <div className="relative">
              <Input
                type="number"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                placeholder="0.00"
                className="h-12 rounded-xl pl-8"
                required
                min="0"
                step="0.01"
              />
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 bg-gray-100 px-2 py-1 rounded text-xs font-semibold text-gray-600">
                USDC
              </div>
            </div>
          </div>

          <div className="bg-[var(--proof-primary)]/5 p-4 rounded-xl border border-[var(--proof-primary)]/10">
            <h4 className="text-sm font-semibold text-[var(--proof-primary)] mb-1">Streamflow Escrow</h4>
            <p className="text-xs text-gray-600">
              Funds will be locked in a non-custodial smart contract. 
              The platform fee is 1%.
            </p>
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full h-14 bg-[var(--proof-primary)] hover:bg-[var(--proof-primary-hover)] text-white font-semibold text-lg rounded-full transition-all shadow-lg hover:shadow-[var(--proof-primary)]/20"
          >
            {loading ? 'Creating Contract...' : 'Create Escrow Contract'}
          </Button>
        </form>
      </div>
    </div>
  )
}
