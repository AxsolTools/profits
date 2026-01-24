'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'

export default function DisputePage({ params }: { params: { id: string } }) {
  const [activeTab, setActiveTab] = useState<'evidence' | 'vote'>('evidence')
  
  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Dispute Header */}
      <div className="bg-white p-8 rounded-[2rem] border border-red-100 shadow-xl shadow-red-50/50 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-red-50 rounded-bl-full -translate-y-8 translate-x-8" />
        
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start gap-6">
          <div>
            <div className="inline-flex items-center gap-2 bg-red-50 text-red-600 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-4 border border-red-100">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
              Active Dispute
            </div>
            <h1 className="text-4xl font-black text-gray-900 font-[family-name:var(--font-montserrat)] tracking-tight">
              Transaction #{params.id.slice(0, 8)}
            </h1>
            <div className="flex items-center gap-3 mt-3 text-gray-500 font-medium">
              <span className="bg-gray-100 px-2 py-1 rounded text-xs uppercase tracking-wider font-bold">Reason</span>
              Non-delivery of services
            </div>
          </div>
          <div className="text-right bg-gray-50 p-4 rounded-2xl border border-gray-100 min-w-[200px]">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Locked Amount</p>
            <p className="text-4xl font-black text-gray-900 font-mono tracking-tight">$1,500.00</p>
            <p className="text-xs text-gray-400 font-mono mt-1">1,500 USDC</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content Area */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-[2rem] border border-gray-200 overflow-hidden shadow-lg shadow-gray-100/50">
            <div className="border-b border-gray-100 flex p-2 gap-2 bg-gray-50/50">
              <button 
                onClick={() => setActiveTab('evidence')}
                className={`flex-1 py-3 px-4 rounded-xl text-sm font-bold transition-all duration-300 ${
                  activeTab === 'evidence' 
                    ? 'bg-white text-gray-900 shadow-sm ring-1 ring-gray-200' 
                    : 'text-gray-500 hover:text-gray-900 hover:bg-white/50'
                }`}
              >
                Evidence Timeline
              </button>
              <button 
                onClick={() => setActiveTab('vote')}
                className={`flex-1 py-3 px-4 rounded-xl text-sm font-bold transition-all duration-300 ${
                  activeTab === 'vote' 
                    ? 'bg-white text-gray-900 shadow-sm ring-1 ring-gray-200' 
                    : 'text-gray-500 hover:text-gray-900 hover:bg-white/50'
                }`}
              >
                Governance Terminal
              </button>
            </div>

            <div className="p-8 min-h-[500px]">
              {activeTab === 'evidence' ? (
                <div className="space-y-10 animate-in fade-in slide-in-from-left-4 duration-300">
                  {/* Evidence Upload Area */}
                  <div className="border-2 border-dashed border-gray-200 rounded-2xl p-10 text-center hover:bg-gray-50 hover:border-[var(--proof-primary)]/30 transition-all cursor-pointer group">
                    <div className="w-16 h-16 bg-[var(--proof-primary)]/5 text-[var(--proof-primary)] rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900">Upload Evidence</h3>
                    <p className="text-gray-500 mt-2 max-w-sm mx-auto">
                      Drag & drop receipts, screenshots, or contract documents.
                      Supported: PDF, PNG, JPG (Max 10MB)
                    </p>
                  </div>

                  {/* Timeline */}
                  <div className="relative pl-8 border-l-2 border-gray-100 ml-4 space-y-8">
                    <div className="relative group">
                      <div className="absolute -left-[41px] top-0 w-5 h-5 rounded-full bg-white border-4 border-red-100 group-hover:border-red-200 transition-colors ring-4 ring-white"></div>
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Today • 10:30 AM</p>
                      <div className="bg-red-50/50 p-5 rounded-2xl border border-red-100">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center text-[10px] text-white font-bold">BU</div>
                          <p className="text-gray-900 font-bold text-sm">Dispute Opened by Buyer</p>
                        </div>
                        <p className="text-gray-600 text-sm leading-relaxed">
                          "Goods were not received by the deadline specified in the contract. Seller has been unresponsive for 48 hours."
                        </p>
                      </div>
                    </div>

                    <div className="relative group opacity-50">
                      <div className="absolute -left-[41px] top-0 w-5 h-5 rounded-full bg-white border-4 border-gray-200 ring-4 ring-white"></div>
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Jan 20 • 2:15 PM</p>
                      <div className="bg-gray-50 p-5 rounded-2xl border border-gray-100">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-6 h-6 rounded-full bg-gray-400 flex items-center justify-center text-[10px] text-white font-bold">SYS</div>
                          <p className="text-gray-900 font-bold text-sm">Escrow Locked</p>
                        </div>
                        <p className="text-gray-600 text-sm">Funds secured in Streamflow contract.</p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">
                  <div className="bg-[var(--proof-primary)]/5 border border-[var(--proof-primary)]/20 p-6 rounded-2xl relative overflow-hidden">
                    <div className="relative z-10">
                      <h3 className="font-bold text-[var(--proof-primary)] mb-2 flex items-center gap-2">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                        Realms Governance
                      </h3>
                      <p className="text-sm text-gray-600 mb-6 max-w-lg leading-relaxed">
                        This dispute is subject to decentralized voting. PROOF token holders will determine the outcome. 
                        Funds are released automatically by smart contract upon resolution.
                      </p>
                      <div className="flex gap-4 text-sm font-medium">
                        <div className="flex-1 bg-white p-4 rounded-xl border border-gray-200 text-center shadow-sm">
                          <span className="block text-gray-400 text-[10px] uppercase font-bold tracking-wider mb-1">Time Remaining</span>
                          <span className="text-xl font-black text-gray-900 font-mono">47:12:05</span>
                        </div>
                        <div className="flex-1 bg-white p-4 rounded-xl border border-gray-200 text-center shadow-sm">
                          <span className="block text-gray-400 text-[10px] uppercase font-bold tracking-wider mb-1">Quorum Reached</span>
                          <div className="flex items-center justify-center gap-2">
                            <span className="text-xl font-black text-gray-900 font-mono">12%</span>
                            <span className="text-gray-400 text-xs font-mono">/ 30%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <button className="group p-6 rounded-2xl border-2 border-transparent bg-green-50 text-green-700 hover:border-green-500 hover:bg-green-100 transition-all font-bold text-left relative overflow-hidden">
                      <div className="relative z-10">
                        <span className="block text-xs uppercase tracking-wider opacity-70 mb-1">Vote Option A</span>
                        <span className="text-lg">Release to Seller</span>
                      </div>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:translate-x-0 translate-x-4">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                      </div>
                    </button>
                    <button className="group p-6 rounded-2xl border-2 border-transparent bg-red-50 text-red-700 hover:border-red-500 hover:bg-red-100 transition-all font-bold text-left relative overflow-hidden">
                      <div className="relative z-10">
                        <span className="block text-xs uppercase tracking-wider opacity-70 mb-1">Vote Option B</span>
                        <span className="text-lg">Refund Buyer</span>
                      </div>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:translate-x-0 translate-x-4">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                      </div>
                    </button>
                  </div>
                  
                  <div className="pt-6 border-t border-gray-100">
                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Live Vote Feed</h4>
                    <div className="bg-gray-900 rounded-xl p-4 font-mono text-xs text-gray-400 h-32 overflow-hidden relative">
                      <div className="space-y-2">
                        <p><span className="text-green-400">●</span> System initialized voting session #88219</p>
                        <p><span className="text-blue-400">→</span> Waiting for votes...</p>
                        <div className="animate-pulse">_</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-[2rem] border border-gray-200 shadow-sm sticky top-24">
            <h3 className="font-bold text-gray-900 mb-6 text-lg">Contract Details</h3>
            <div className="space-y-6 text-sm">
              <div>
                <span className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Buyer</span>
                <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg font-mono text-gray-700">
                  <div className="w-4 h-4 rounded-full bg-gradient-to-br from-blue-400 to-blue-600"></div>
                  0x71...9A2
                </div>
              </div>
              
              <div>
                <span className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Seller</span>
                <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg font-mono text-gray-700">
                  <div className="w-4 h-4 rounded-full bg-gradient-to-br from-purple-400 to-purple-600"></div>
                  0x3B...1C4
                </div>
              </div>

              <div>
                <span className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Contract ID</span>
                <p className="font-mono text-[var(--proof-primary)] font-bold">#88219-XJ9</p>
              </div>

              <div className="pt-4 border-t border-gray-100">
                <Button variant="outline" className="w-full h-12 rounded-xl font-bold border-gray-200 hover:bg-gray-50 hover:text-gray-900">
                  View on Solana Explorer
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
