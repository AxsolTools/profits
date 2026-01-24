'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'

export default function ProfilePage({ params }: { params: { address: string } }) {
  // Mock data - would come from backend
  const stats = {
    totalVolume: '$42,500',
    successfulTx: 142,
    disputeRate: '0.8%',
    memberSince: 'Oct 2024',
    reputationScore: 98
  }

  const history = [
    { id: 'tx_821', type: 'service', amount: '$1,200', date: '2 days ago', status: 'completed', role: 'Seller' },
    { id: 'tx_992', type: 'goods', amount: '$450', date: '1 week ago', status: 'completed', role: 'Buyer' },
    { id: 'tx_104', type: 'digital', amount: '$5,000', date: '3 weeks ago', status: 'disputed', role: 'Seller' },
  ]

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Profile Header */}
      <div className="bg-white rounded-[2.5rem] border border-gray-200 overflow-hidden shadow-sm relative">
        <div className="h-32 bg-gradient-to-r from-blue-600 to-purple-600" />
        
        <div className="px-8 pb-8">
          <div className="relative -mt-16 mb-6 flex justify-between items-end">
            <div className="flex items-end gap-6">
              <div className="w-32 h-32 rounded-3xl bg-white p-2 shadow-xl">
                <div className="w-full h-full bg-gray-100 rounded-2xl overflow-hidden flex items-center justify-center text-4xl">
                  👾
                </div>
              </div>
              <div className="mb-2">
                <h1 className="text-3xl font-black text-gray-900 font-mono tracking-tight">
                  {params.address.slice(0, 6)}...{params.address.slice(-4)}
                </h1>
                <div className="flex items-center gap-3 mt-2">
                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    Verified User
                  </span>
                  <span className="text-gray-500 text-sm font-medium">Joined {stats.memberSince}</span>
                </div>
              </div>
            </div>
            
            <Button className="h-12 px-6 rounded-xl bg-gray-900 text-white font-bold hover:bg-gray-800">
              Copy Address
            </Button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-6 border-t border-gray-100">
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Reputation Score</p>
              <p className="text-4xl font-black text-[var(--proof-primary)]">{stats.reputationScore}</p>
            </div>
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Total Volume</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalVolume}</p>
            </div>
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Successful Tx</p>
              <p className="text-2xl font-bold text-gray-900">{stats.successfulTx}</p>
            </div>
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Dispute Rate</p>
              <p className={`text-2xl font-bold ${parseFloat(stats.disputeRate) < 1 ? 'text-green-600' : 'text-red-600'}`}>
                {stats.disputeRate}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Transaction History */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900">Transaction History</h2>
            <div className="flex gap-2">
              <button className="px-4 py-2 rounded-lg bg-white border border-gray-200 text-sm font-bold text-gray-900 shadow-sm">All</button>
              <button className="px-4 py-2 rounded-lg text-sm font-medium text-gray-500 hover:bg-gray-100 transition-colors">Completed</button>
              <button className="px-4 py-2 rounded-lg text-sm font-medium text-gray-500 hover:bg-gray-100 transition-colors">Disputed</button>
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-sm">
            <div className="divide-y divide-gray-100">
              {history.map((tx) => (
                <div key={tx.id} className="p-6 hover:bg-gray-50 transition-colors flex items-center justify-between group cursor-pointer">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl ${
                      tx.status === 'completed' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                    }`}>
                      {tx.type === 'goods' ? '📦' : tx.type === 'service' ? '💻' : '🌐'}
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">Escrow #{tx.id.split('_')[1]}</p>
                      <p className="text-xs text-gray-500 font-medium uppercase mt-0.5">
                        {tx.role} • {tx.type} • {tx.date}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-900">{tx.amount}</p>
                    <span className={`text-xs font-bold uppercase tracking-wider px-2 py-1 rounded-md ${
                      tx.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {tx.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-4 border-t border-gray-100 bg-gray-50 text-center">
              <button className="text-sm font-bold text-[var(--proof-primary)] hover:underline">View All Transactions</button>
            </div>
          </div>
        </div>

        {/* Badges & Trust */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm">
            <h3 className="font-bold text-gray-900 mb-6">Verified Credentials</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </div>
                <span className="font-medium text-gray-700">Wallet Verified</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                </div>
                <span className="font-medium text-gray-700">Identity Linked (Civic)</span>
              </div>
              <div className="flex items-center gap-3 opacity-50">
                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-400">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                </div>
                <span className="font-medium text-gray-500">Power Voter (Top 10%)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
