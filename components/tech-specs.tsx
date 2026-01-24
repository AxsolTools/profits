'use client'

import { useReducedMotion } from '@/hooks/use-reduced-motion'

export function TechSpecs() {
  return (
    <section className="py-24 bg-gray-900 text-white overflow-hidden relative">
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <div className="inline-block px-4 py-1 rounded-full bg-blue-900/50 border border-blue-800 text-blue-400 font-mono text-xs mb-6">
            ARCHITECTURE_V1.0
          </div>
          <h2 className="text-3xl md:text-5xl font-black font-[family-name:var(--font-montserrat)] tracking-tight mb-4">
            Protocol Stack
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Composability first. Built on Solana's most robust primitives.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Card 1: Streamflow */}
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 p-8 rounded-3xl relative overflow-hidden group hover:border-blue-500/50 transition-colors">
            <div className="absolute top-0 right-0 p-6 opacity-20 group-hover:opacity-100 transition-opacity">
              <svg className="w-16 h-16 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
            </div>
            
            <h3 className="text-2xl font-bold mb-4 font-mono">Streamflow</h3>
            <ul className="space-y-4 text-gray-400">
              <li className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                <span>Non-custodial Program</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                <span>Time-lock Vesting</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                <span>Multi-sig Support</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                <span>Cancel/Withdraw Safety</span>
              </li>
            </ul>
          </div>

          {/* Card 2: Realms */}
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 p-8 rounded-3xl relative overflow-hidden group hover:border-purple-500/50 transition-colors">
            <div className="absolute top-0 right-0 p-6 opacity-20 group-hover:opacity-100 transition-opacity">
              <svg className="w-16 h-16 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" /></svg>
            </div>
            
            <h3 className="text-2xl font-bold mb-4 font-mono">Realms</h3>
            <ul className="space-y-4 text-gray-400">
              <li className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 bg-purple-500 rounded-full" />
                <span>SPL Governance</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 bg-purple-500 rounded-full" />
                <span>Proposal Lifecycle</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 bg-purple-500 rounded-full" />
                <span>Vote Weight Calculation</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 bg-purple-500 rounded-full" />
                <span>Instruction Execution</span>
              </li>
            </ul>
          </div>

          {/* Card 3: Supabase/Postgres */}
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 p-8 rounded-3xl relative overflow-hidden group hover:border-green-500/50 transition-colors">
            <div className="absolute top-0 right-0 p-6 opacity-20 group-hover:opacity-100 transition-opacity">
              <svg className="w-16 h-16 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" /></svg>
            </div>
            
            <h3 className="text-2xl font-bold mb-4 font-mono">Data Layer</h3>
            <ul className="space-y-4 text-gray-400">
              <li className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                <span>Real-time Subscriptions</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                <span>Encrypted Evidence</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                <span>Edge Functions</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                <span>High-Performance Indexing</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
