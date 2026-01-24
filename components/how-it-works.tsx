'use client'

import { useReducedMotion } from '@/hooks/use-reduced-motion'

export function HowItWorks() {
  const prefersReducedMotion = useReducedMotion()

  const steps = [
    {
      id: '01',
      title: 'Lock Funds',
      desc: 'Buyer deposits funds into a non-custodial Streamflow smart contract.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
      )
    },
    {
      id: '02',
      title: 'Submit Proof',
      desc: 'Seller uploads evidence (tracking, files) to the platform for verification.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
      )
    },
    {
      id: '03',
      title: 'Dispute & Vote',
      desc: 'If contested, $PROOF holders review evidence and vote via Realms DAO.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" /></svg>
      )
    },
    {
      id: '04',
      title: 'Execute',
      desc: 'Smart contract automatically releases funds based on the consensus outcome.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
      )
    }
  ]

  return (
    <section className="py-24 bg-white relative overflow-hidden" id="how-it-works">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black text-gray-900 font-[family-name:var(--font-montserrat)] tracking-tight mb-4">
            The Flow
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            A fully decentralized loop ensuring fair outcomes for every transaction.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
          {/* Connection Line */}
          <div className="hidden md:block absolute top-12 left-0 right-0 h-0.5 bg-gray-100 -z-10" />

          {steps.map((step, i) => (
            <div key={step.id} className="relative bg-white pt-8 group">
              <div className="w-16 h-16 rounded-2xl bg-white border-2 border-gray-100 flex items-center justify-center text-gray-900 shadow-lg mb-6 mx-auto group-hover:border-[var(--proof-primary)] group-hover:text-[var(--proof-primary)] transition-all z-10 relative">
                {step.icon}
                <div className="absolute -top-3 -right-3 bg-gray-900 text-white text-xs font-bold px-2 py-1 rounded-full border-2 border-white">
                  {step.id}
                </div>
              </div>
              
              <div className="text-center px-4">
                <h3 className="text-lg font-bold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
