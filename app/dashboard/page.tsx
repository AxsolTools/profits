'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { api } from '@/lib/api'

export default function DashboardPage() {
  const [transactions, setTransactions] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // TODO: Implement GET /api/transactions in lib/api.ts and fetch here
    // For now, simulating empty state or loading
    setLoading(false)
  }, [])

  return (
    <div className="space-y-8">
      {/* Dashboard Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-500 mt-1">Manage your escrows and disputes</p>
        </div>
        <Link
          href="/create"
          className="group flex items-center gap-2 bg-[var(--proof-primary)] hover:bg-[var(--proof-primary-hover)] text-white px-6 py-3 rounded-full font-semibold transition-all shadow-lg hover:shadow-[var(--proof-primary)]/30"
        >
          <span>New Transaction</span>
          <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </Link>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
          <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">Total Volume</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">$0.00</p>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
          <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">Active Escrows</p>
          <p className="text-3xl font-bold text-[var(--proof-primary)] mt-2">0</p>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
          <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">Disputes</p>
          <p className="text-3xl font-bold text-[var(--proof-warning)] mt-2">0</p>
        </div>
      </div>

      {/* Transactions List */}
      <div className="bg-white rounded-3xl border border-gray-200 overflow-hidden min-h-[400px]">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-900">Recent Transactions</h2>
          <div className="flex gap-2">
            <button className="text-sm font-medium text-gray-500 hover:text-gray-900 px-3 py-1 bg-gray-50 rounded-lg transition-colors">All</button>
            <button className="text-sm font-medium text-gray-500 hover:text-gray-900 px-3 py-1 hover:bg-gray-50 rounded-lg transition-colors">Active</button>
            <button className="text-sm font-medium text-gray-500 hover:text-gray-900 px-3 py-1 hover:bg-gray-50 rounded-lg transition-colors">Completed</button>
          </div>
        </div>
        
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--proof-primary)]"></div>
          </div>
        ) : transactions.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-center p-8">
            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900">No transactions yet</h3>
            <p className="text-gray-500 mt-1 max-w-sm">Create your first escrow transaction to start verifying payments securely on-chain.</p>
            <Link
              href="/create"
              className="mt-6 text-[var(--proof-primary)] font-medium hover:text-[var(--proof-primary-hover)] transition-colors"
            >
              Create Transaction &rarr;
            </Link>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {/* Map transactions here */}
          </div>
        )}
      </div>
    </div>
  )
}
