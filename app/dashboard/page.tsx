'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { api } from '@/lib/api'
import { useWallet } from '@solana/wallet-adapter-react'
import { getCurrencyConfig, getStreamflowAmounts, parseInspectionPeriod } from '@/lib/streamflow/config'
import { getStreamflowClient } from '@/lib/streamflow/client'

export default function DashboardPage() {
  const { publicKey, wallet } = useWallet()
  const [loading, setLoading] = useState(true)
  const [transactions, setTransactions] = useState<any[]>([])
  const [error, setError] = useState<string | null>(null)
  const [actionId, setActionId] = useState<string | null>(null)

  useEffect(() => {
    let mounted = true
    async function loadDashboard() {
      try {
        setLoading(true)
        const data = await api.transactions.list({ limit: 20 })
        if (mounted) {
          setTransactions(data.transactions || [])
        }
      } catch (err) {
        if (mounted) {
          setError(err instanceof Error ? err.message : 'Failed to load dashboard')
        }
      } finally {
        if (mounted) {
          setLoading(false)
        }
      }
    }
    loadDashboard()
    return () => {
      mounted = false
    }
  }, [])

  const stats = useMemo(() => {
    const totalVolume = transactions.reduce((sum, tx) => sum + Number(tx.amount || 0), 0)
    const activeEscrows = transactions.filter((tx) => tx.escrow_status === 'locked').length
    const disputes = transactions.filter((tx) => tx.escrow_status === 'disputed').length
    const actionItems = transactions.filter((tx) => tx.escrow_status === 'locked').length

    return {
      totalVolume,
      activeEscrows,
      actionItems,
      disputes,
    }
  }, [transactions])

  const handleRelease = async (tx: any) => {
    if (!wallet?.adapter || !publicKey) {
      setError('Connect your wallet to release funds.')
      return
    }
    if (!tx.streamflow_id) {
      setError('Streamflow stream not found.')
      return
    }
    setActionId(tx.id)
    try {
      const { decimals, isNative } = getCurrencyConfig(tx.currency || 'USDC')
      const { totalAmount } = getStreamflowAmounts(Number(tx.amount || 0), decimals)
      const client = getStreamflowClient()
      await client.withdraw(
        { id: tx.streamflow_id, amount: totalAmount },
        { invoker: wallet.adapter, isNative }
      )
      await api.transactions.update(tx.id, { status: 'released' })
      const refreshed = await api.transactions.list({ limit: 20 })
      setTransactions(refreshed.transactions || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to release funds')
    } finally {
      setActionId(null)
    }
  }

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Overview</h1>
        <Link
          href="/create"
          className="bg-gray-900 text-white px-5 py-2.5 rounded-lg font-bold text-sm shadow-lg hover:bg-black transition-all flex items-center gap-2"
        >
          <span>New Transaction</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
        </Link>
      </div>

      {/* Compact Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard label="Total Volume" value={`$${stats.totalVolume.toFixed(2)}`} loading={loading} />
        <StatsCard label="Active Escrows" value={stats.activeEscrows.toString()} loading={loading} />
        <StatsCard label="Action Items" value={stats.actionItems.toString()} loading={loading} highlight />
        <StatsCard label="Disputes" value={stats.disputes.toString()} loading={loading} isWarning />
      </div>

      {/* Transactions Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
          <h2 className="font-bold text-gray-900 text-sm uppercase tracking-wide">Recent Activity</h2>
          <div className="flex gap-1">
            <button className="px-3 py-1 rounded-md text-xs font-bold bg-white border border-gray-200 text-gray-900">All</button>
            <button className="px-3 py-1 rounded-md text-xs font-bold text-gray-500 hover:bg-gray-100">Active</button>
          </div>
        </div>
        
        <div className="min-h-[300px]">
          {loading ? (
            <div className="p-4 space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-12 bg-gray-50 rounded-lg animate-pulse" />
              ))}
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center h-64 text-center">
              <p className="text-sm text-red-600 font-medium">{error}</p>
            </div>
          ) : transactions.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-center">
              <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mb-3">
                <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
              </div>
              <p className="text-gray-500 text-sm font-medium">No active transactions</p>
              <Link href="/create" className="text-blue-600 text-sm font-bold mt-2 hover:underline">
                Create your first escrow
              </Link>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {transactions.map((tx) => {
                const createdAt = new Date(tx.created_at).getTime()
                const inspectionSeconds = parseInspectionPeriod(tx?.metadata?.inspectionPeriod)
                const inspectionPassed = Date.now() > createdAt + inspectionSeconds * 1000
                const hasDispute = Array.isArray(tx.disputes) && tx.disputes.length > 0
                const isSeller = publicKey?.toBase58() === tx.seller_wallet
                const canRelease =
                  tx.streamflow_id &&
                  tx.escrow_status === 'locked' &&
                  inspectionPassed &&
                  !hasDispute &&
                  isSeller

                return (
                  <div key={tx.id} className="p-4 flex items-center justify-between hover:bg-gray-50/60 transition-colors">
                    <div className="space-y-1">
                      <p className="text-sm font-bold text-gray-900">{tx.title || 'Escrow Transaction'}</p>
                      <p className="text-xs text-gray-500 uppercase tracking-wide">
                        {tx.category || 'general'} • {tx.escrow_status}
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-sm font-bold text-gray-900">${Number(tx.amount).toFixed(2)}</p>
                        <p className="text-xs text-gray-400">{tx.currency}</p>
                      </div>
                      {canRelease && (
                        <button
                          onClick={() => handleRelease(tx)}
                          disabled={actionId === tx.id}
                          className="h-9 px-4 rounded-lg bg-[var(--proof-primary)] text-white text-xs font-bold hover:bg-[var(--proof-primary-hover)]"
                        >
                          {actionId === tx.id ? 'Releasing...' : 'Release'}
                        </button>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function StatsCard({ label, value, loading, highlight, isWarning }: { label: string, value: string, loading: boolean, highlight?: boolean, isWarning?: boolean }) {
  return (
    <div className={`p-5 rounded-xl border transition-all ${
      highlight ? 'bg-blue-50 border-blue-100' : 
      isWarning ? 'bg-red-50 border-red-100' : 
      'bg-white border-gray-200'
    }`}>
      <p className={`text-xs font-bold uppercase tracking-wider mb-1 ${
        highlight ? 'text-blue-700' : 
        isWarning ? 'text-red-700' : 
        'text-gray-500'
      }`}>{label}</p>
      {loading ? (
        <div className="h-8 w-24 bg-gray-200/50 rounded animate-pulse" />
      ) : (
        <p className={`text-2xl font-black ${
          highlight ? 'text-blue-900' : 
          isWarning ? 'text-red-900' : 
          'text-gray-900'
        }`}>{value}</p>
      )}
    </div>
  )
}
