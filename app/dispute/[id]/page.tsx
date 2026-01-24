'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'

export default function DisputePage({ params }: { params: { id: string } }) {
  const [activeTab, setActiveTab] = useState<'evidence' | 'vote'>('evidence')
  
  return (
    <div className="space-y-8">
      {/* Dispute Header */}
      <div className="bg-white p-8 rounded-3xl border border-red-100 shadow-sm">
        <div className="flex justify-between items-start">
          <div>
            <div className="inline-flex items-center gap-2 bg-red-50 text-red-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
              Active Dispute
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Transaction #{params.id.slice(0, 8)}</h1>
            <p className="text-gray-500 mt-1">Dispute opened by Buyer • Reason: Non-delivery of services</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500 uppercase tracking-wider">Amount Locked</p>
            <p className="text-3xl font-bold text-gray-900">$1,500.00</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content Area */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-3xl border border-gray-200 overflow-hidden">
            <div className="border-b border-gray-100 flex">
              <button 
                onClick={() => setActiveTab('evidence')}
                className={`flex-1 py-4 text-sm font-semibold border-b-2 transition-colors ${activeTab === 'evidence' ? 'border-[var(--proof-primary)] text-[var(--proof-primary)]' : 'border-transparent text-gray-500 hover:text-gray-900'}`}
              >
                Evidence Timeline
              </button>
              <button 
                onClick={() => setActiveTab('vote')}
                className={`flex-1 py-4 text-sm font-semibold border-b-2 transition-colors ${activeTab === 'vote' ? 'border-[var(--proof-primary)] text-[var(--proof-primary)]' : 'border-transparent text-gray-500 hover:text-gray-900'}`}
              >
                Voting Terminal
              </button>
            </div>

            <div className="p-6 min-h-[400px]">
              {activeTab === 'evidence' ? (
                <div className="space-y-8">
                  {/* Evidence Upload Area */}
                  <div className="border-2 border-dashed border-gray-200 rounded-2xl p-8 text-center hover:bg-gray-50 transition-colors cursor-pointer">
                    <div className="w-12 h-12 bg-[var(--proof-primary)]/10 text-[var(--proof-primary)] rounded-xl flex items-center justify-center mx-auto mb-3">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                    </div>
                    <h3 className="font-semibold text-gray-900">Upload Evidence</h3>
                    <p className="text-sm text-gray-500 mt-1">Drag & drop receipts, screenshots, or documents</p>
                  </div>

                  {/* Timeline */}
                  <div className="space-y-6 relative pl-8 border-l-2 border-gray-100 ml-4">
                    <div className="relative">
                      <div className="absolute -left-[41px] top-0 w-5 h-5 rounded-full bg-white border-4 border-gray-200"></div>
                      <p className="text-sm text-gray-500 mb-1">Jan 24, 2026 • 10:30 AM</p>
                      <div className="bg-gray-50 p-4 rounded-xl">
                        <p className="text-gray-900 font-medium">Dispute Opened</p>
                        <p className="text-gray-600 text-sm mt-1">Buyer claimed goods were not received by the deadline.</p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="bg-[var(--proof-primary)]/5 border border-[var(--proof-primary)]/20 p-6 rounded-2xl">
                    <h3 className="font-bold text-[var(--proof-primary)] mb-2">Realms Governance</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      This dispute is now subject to PROOF token holder voting. The outcome will automatically trigger fund release via Streamflow.
                    </p>
                    <div className="flex gap-4 text-sm font-medium">
                      <div className="flex-1 bg-white p-3 rounded-xl border border-gray-200 text-center">
                        <span className="block text-gray-500 text-xs uppercase mb-1">Time Remaining</span>
                        <span className="text-gray-900">47h 12m</span>
                      </div>
                      <div className="flex-1 bg-white p-3 rounded-xl border border-gray-200 text-center">
                        <span className="block text-gray-500 text-xs uppercase mb-1">Quorum</span>
                        <span className="text-gray-900">12% / 30%</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <button className="p-4 rounded-2xl border-2 border-transparent bg-green-50 text-green-700 hover:border-green-500 transition-all font-bold">
                      Vote Release to Seller
                    </button>
                    <button className="p-4 rounded-2xl border-2 border-transparent bg-red-50 text-red-700 hover:border-red-500 transition-all font-bold">
                      Vote Refund Buyer
                    </button>
                  </div>
                  
                  <div className="pt-4 border-t border-gray-100">
                    <h4 className="text-sm font-semibold text-gray-900 mb-3">Recent Votes</h4>
                    {/* Voting log would go here */}
                    <p className="text-sm text-gray-500 italic">No votes cast yet.</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-gray-200">
            <h3 className="font-bold text-gray-900 mb-4">Contract Details</h3>
            <div className="space-y-4 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Buyer</span>
                <span className="font-mono text-gray-900">0x71...9A2</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Seller</span>
                <span className="font-mono text-gray-900">0x3B...1C4</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Contract ID</span>
                <span className="font-mono text-[var(--proof-primary)]">#88219</span>
              </div>
              <div className="pt-4 border-t border-gray-100">
                <Button variant="outline" className="w-full">View on Explorer</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
