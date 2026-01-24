'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { api } from '@/lib/api'

export default function DashboardPage() {
  const [transactions, setTransactions] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate data fetching with a slight delay to show off the skeleton state
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Dashboard Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-4xl font-black text-gray-900 tracking-tight font-[family-name:var(--font-montserrat)]">
            Command Center
          </h1>
          <p className="text-gray-500 mt-2 text-lg">Manage your secure escrows and governance.</p>
        </div>
        <Link
          href="/create"
          className="group relative overflow-hidden bg-gradient-to-r from-[var(--proof-primary)] to-[var(--proof-primary-dark)] text-white px-8 py-4 rounded-2xl font-bold transition-all shadow-xl shadow-[var(--proof-primary)]/20 hover:shadow-[var(--proof-primary)]/40 hover:scale-[1.02]"
        >
          <div className="relative z-10 flex items-center gap-2">
            <span>New Transaction</span>
            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </div>
          <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
        </Link>
      </div>

      {/* Stats Overview with Glassmorphism */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatsCard 
          label="Total Volume" 
          value="$0.00" 
          loading={loading} 
          icon={
            <svg className="w-6 h-6 text-[var(--proof-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
        />
        <StatsCard 
          label="Active Escrows" 
          value="0" 
          loading={loading}
          icon={
            <svg className="w-6 h-6 text-[var(--proof-accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
        />
        <StatsCard 
          label="Disputes" 
          value="0" 
          loading={loading}
          isWarning
          icon={
            <svg className="w-6 h-6 text-[var(--proof-warning)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          }
        />
      </div>

      {/* Transactions List with Premium Empty State */}
      <div className="bg-white/80 backdrop-blur-xl rounded-[2rem] border border-white/20 shadow-xl shadow-gray-200/50 overflow-hidden min-h-[500px] relative">
        {/* Decorative background gradient */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[var(--proof-primary)]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        
        <div className="p-8 border-b border-gray-100 flex justify-between items-center relative z-10">
          <h2 className="text-2xl font-bold text-gray-900">Recent Transactions</h2>
          <div className="flex gap-2 bg-gray-100/50 p-1 rounded-xl">
            <FilterButton active label="All" />
            <FilterButton label="Active" />
            <FilterButton label="Completed" />
          </div>
        </div>
        
        <div className="relative z-10">
          {loading ? (
            <div className="p-8 space-y-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-20 bg-gray-50/80 rounded-2xl animate-pulse flex items-center px-6">
                  <div className="w-10 h-10 bg-gray-200 rounded-full mr-4" />
                  <div className="space-y-2 flex-1">
                    <div className="h-4 bg-gray-200 rounded w-1/4" />
                    <div className="h-3 bg-gray-200 rounded w-1/3" />
                  </div>
                  <div className="h-8 bg-gray-200 rounded w-20" />
                </div>
              ))}
            </div>
          ) : transactions.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-[400px] text-center p-8">
              <div className="relative mb-6 group cursor-pointer">
                <div className="absolute inset-0 bg-[var(--proof-primary)]/20 rounded-full blur-xl group-hover:blur-2xl transition-all duration-500" />
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center relative border border-gray-100 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-8 h-8 text-[var(--proof-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">No active escrows</h3>
              <p className="text-gray-500 max-w-md text-lg leading-relaxed mb-8">
                Your secure transaction history will appear here. Create your first contract to start verifying payments on-chain.
              </p>
              <Link
                href="/create"
                className="text-[var(--proof-primary)] font-bold hover:text-[var(--proof-primary-dark)] transition-colors flex items-center gap-2 group"
              >
                Create Transaction 
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {/* Map transactions here */}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function StatsCard({ label, value, loading, icon, isWarning = false }: { label: string, value: string, loading: boolean, icon: React.ReactNode, isWarning?: boolean }) {
  return (
    <div className="bg-white/60 backdrop-blur-md p-6 rounded-[2rem] border border-white/40 shadow-lg shadow-gray-200/40 group hover:scale-[1.02] transition-all duration-300">
      <div className="flex justify-between items-start mb-4">
        <div className="p-3 bg-white rounded-2xl shadow-sm group-hover:shadow-md transition-shadow">
          {icon}
        </div>
        {loading && <div className="w-16 h-6 bg-gray-100 rounded-full animate-pulse" />}
      </div>
      <div>
        <p className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-1">{label}</p>
        {loading ? (
          <div className="h-10 w-32 bg-gray-100 rounded-lg animate-pulse" />
        ) : (
          <p className={`text-4xl font-black ${isWarning ? 'text-[var(--proof-warning)]' : 'text-gray-900'}`}>
            {value}
          </p>
        )}
      </div>
    </div>
  )
}

function FilterButton({ label, active = false }: { label: string, active?: boolean }) {
  return (
    <button 
      className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${
        active 
          ? 'bg-white text-gray-900 shadow-sm' 
          : 'text-gray-500 hover:text-gray-900 hover:bg-white/50'
      }`}
    >
      {label}
    </button>
  )
}
