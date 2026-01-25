'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { toast } from 'sonner'
import { api } from '@/lib/api'
import Link from 'next/link'

export default function GovernancePage() {
  const [activeTab, setActiveTab] = useState<'proposals' | 'history'>('proposals')
  const [disputes, setDisputes] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const handleDelegate = () => {
    toast.success("Delegation Initiated", {
      description: "Please confirm the transaction in your wallet."
    })
  }

  useEffect(() => {
    let mounted = true
    async function loadDisputes() {
      try {
        setLoading(true)
        const data = await api.disputes.list({ limit: 50 })
        if (mounted) {
          setDisputes(data.disputes || [])
        }
      } catch (err) {
        if (mounted) {
          setError(err instanceof Error ? err.message : 'Failed to load disputes')
        }
      } finally {
        if (mounted) setLoading(false)
      }
    }
    loadDisputes()
    return () => {
      mounted = false
    }
  }, [])

  const filteredDisputes = disputes.filter((dispute) =>
    activeTab === 'proposals' ? dispute.status === 'voting' : dispute.status === 'resolved'
  )

  const formatTimeLeft = (createdAt: string) => {
    const end = new Date(createdAt).getTime() + 72 * 60 * 60 * 1000
    const diff = end - Date.now()
    if (diff <= 0) return 'Closed'
    const hours = Math.floor(diff / (1000 * 60 * 60))
    const minutes = Math.floor((diff / (1000 * 60)) % 60)
    return `${hours}h ${minutes}m`
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-700">
      {/* Testnet Banner */}
      <div className="bg-blue-50 border border-blue-100 px-4 py-3 rounded-lg flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="bg-blue-600 text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">TESTNET</span>
          <p className="text-sm text-blue-900 font-medium">Governance actions will settle on Solana Devnet.</p>
        </div>
        <Button variant="ghost" size="sm" className="h-auto py-1 text-blue-700 hover:text-blue-900 text-xs font-bold" onClick={handleDelegate}>
          Delegate Votes →
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Stats */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">My Voting Power</p>
            <p className="text-3xl font-black text-gray-900 mb-2">42,050 <span className="text-sm text-gray-400 font-bold">vPROOF</span></p>
            <div className="w-full bg-gray-100 rounded-full h-1.5 mb-2">
              <div className="bg-blue-600 h-1.5 rounded-full" style={{ width: '75%' }} />
            </div>
            <p className="text-xs text-gray-500">Top 5% of voters</p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Rewards</p>
              <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded">Ready to Claim</span>
            </div>
            <p className="text-3xl font-black text-gray-900 mb-4">$1,240.50</p>
            <Button className="w-full h-10 bg-green-600 hover:bg-green-700 text-white font-bold text-sm rounded-lg">
              Claim Yield
            </Button>
          </div>
        </div>

        {/* Right Column: Proposals */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex gap-4 bg-gray-50/50">
              <button 
                onClick={() => setActiveTab('proposals')}
                className={`text-sm font-bold pb-4 -mb-4 border-b-2 transition-all ${
                  activeTab === 'proposals' 
                    ? 'border-blue-600 text-gray-900' 
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Active Disputes
              </button>
              <button 
                onClick={() => setActiveTab('history')}
                className={`text-sm font-bold pb-4 -mb-4 border-b-2 transition-all ${
                  activeTab === 'history' 
                    ? 'border-blue-600 text-gray-900' 
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                History
              </button>
            </div>

            {loading ? (
              <div className="p-6 text-sm text-gray-500">Loading disputes...</div>
            ) : error ? (
              <div className="p-6 text-sm text-red-600">{error}</div>
            ) : filteredDisputes.length === 0 ? (
              <div className="p-6 text-sm text-gray-500">No disputes available.</div>
            ) : (
              <div className="divide-y divide-gray-100">
                {filteredDisputes.map((prop) => {
                  const votesForSeller = Number(prop.votes_for_seller || 0)
                  const votesForBuyer = Number(prop.votes_for_buyer || 0)
                  const totalVotes = votesForSeller + votesForBuyer || 1
                  const sellerPct = Math.round((votesForSeller / totalVotes) * 100)
                  const buyerPct = Math.round((votesForBuyer / totalVotes) * 100)

                  return (
                    <div key={prop.id} className="p-6 hover:bg-gray-50/50 transition-colors group">
                      <div className="flex justify-between items-start gap-4 mb-3">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-[10px] font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded uppercase tracking-wider">Dispute</span>
                            <span className="text-xs font-mono text-gray-400">{prop.id}</span>
                          </div>
                          <h3 className="font-bold text-gray-900">
                            {prop.transactions?.title || 'Escrow Dispute'}
                          </h3>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-gray-900">
                            ${Number(prop.transactions?.amount || 0).toFixed(2)}
                          </p>
                          <p className="text-xs text-gray-500 font-medium">
                            {formatTimeLeft(prop.created_at)} left
                          </p>
                        </div>
                      </div>

                      <p className="text-sm text-gray-600 mb-4 line-clamp-2">{prop.reason}</p>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <div className="flex justify-between text-xs font-bold text-gray-500 mb-1">
                            <span>Release</span>
                            <span>{sellerPct}%</span>
                          </div>
                          <Progress value={sellerPct} className="h-1.5 bg-gray-100" />
                        </div>
                        <div>
                          <div className="flex justify-between text-xs font-bold text-gray-500 mb-1">
                            <span>Refund</span>
                            <span>{buyerPct}%</span>
                          </div>
                          <Progress value={buyerPct} className="h-1.5 bg-gray-100" />
                        </div>
                      </div>

                      <div className="mt-4 pt-4 border-t border-gray-100 flex justify-end">
                        <Button asChild size="sm" variant="outline" className="font-bold text-xs h-8">
                          <Link href={`/dispute/${prop.id}`}>View Dispute</Link>
                        </Button>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
