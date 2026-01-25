'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Player } from '@remotion/player'
import { DeveloperAPI } from './animations/developer-api'
import { VotingROI } from './animations/voting-roi'
import { BuyerProtection } from './animations/buyer-protection'
import { SellerGuarantees } from './animations/seller-guarantees'

type Role = 'buyers' | 'sellers' | 'voters' | 'developers'

const content = {
  buyers: {
    title: 'Secure Your Capital',
    desc: 'Never worry about non-delivery again. Funds are locked on-chain and only released when you are satisfied.',
    component: BuyerProtection,
    durationInFrames: 120,
    features: [
      {
        title: 'Non-Custodial Lock',
        desc: 'We never touch your funds. They are secured in a smart contract that only you and the seller can control.',
        icon: (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
        )
      },
      {
        title: 'Dispute Protection',
        desc: 'If something goes wrong, open a dispute. The decentralized PROOF court will review evidence and resolve fairly.',
        icon: (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
        )
      },
      {
        title: 'Reputation System',
        desc: 'See a sellers transaction history and dispute rate before you commit to a purchase.',
        icon: (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" /></svg>
        )
      }
    ]
  },
  sellers: {
    title: 'Guaranteed Payments',
    desc: 'Proof of funds is visible before you start working. Deliver with confidence knowing the money is already there.',
    component: SellerGuarantees,
    durationInFrames: 150,
    features: [
      {
        title: 'Verified Solvency',
        desc: 'Buyer funds are locked upfront. No more "check is in the mail" excuses.',
        icon: (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        )
      },
      {
        title: 'Evidence Vault',
        desc: 'Upload tracking numbers, design files, or photos directly to the secure evidence vault.',
        icon: (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
        )
      },
      {
        title: 'Instant Release',
        desc: 'As soon as the buyer confirms (or the dispute resolves), funds are streamed to your wallet instantly.',
        icon: (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
        )
      }
    ]
  },
  voters: {
    title: 'Govern & Earn',
    desc: 'Participate in the decentralized court. Your judgment keeps the platform honest and earns you yield.',
    component: VotingROI,
    durationInFrames: 120,
    features: [
      {
        title: '10% Yield',
        desc: 'Earn a share of the 10% fee from every dispute you correctly judge.',
        icon: (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        )
      },
      {
        title: 'Weighted Voting',
        desc: 'Your vote strength is determined by your $PROOF token holdings. More skin in the game = more power.',
        icon: (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" /></svg>
        )
      },
      {
        title: 'Sybil Resistance',
        desc: 'Advanced anti-collusion mechanics ensure fair outcomes and protect the protocol.',
        icon: (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
        )
      }
    ]
  },
  developers: {
    title: 'Build on PROOF',
    desc: 'Integrate trustless escrow into your own dApp, marketplace, or agency with our Enterprise API.',
    component: DeveloperAPI,
    durationInFrames: 120,
    features: [
      {
        title: 'Escrow API',
        desc: 'Programmatically create, fund, and release escrows from your own backend.',
        icon: (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
        )
      },
      {
        title: 'Webhooks',
        desc: 'Receive real-time events for dispute updates, fund releases, and voting outcomes.',
        icon: (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
        )
      },
      {
        title: 'Merchant SDK',
        desc: 'Drop-in React components for checkout flows and dispute management.',
        icon: (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
        )
      }
    ]
  }
}

export function UserRoleTabs() {
  const [activeTab, setActiveTab] = useState<Role>('buyers')
  const ActiveComponent = content[activeTab].component

  return (
    <section className="py-24 bg-gray-50/50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black text-gray-900 font-[family-name:var(--font-montserrat)] tracking-tight mb-4">
            Ecosystem Participants
          </h2>
          <p className="text-xl text-gray-600">
            A balanced protocol rewarding all stakeholders.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-12 bg-white p-2 rounded-full shadow-sm border border-gray-100 w-fit mx-auto">
          {(Object.keys(content) as Role[]).map((role) => (
            <button
              key={role}
              onClick={() => setActiveTab(role)}
              className={`px-6 py-3 rounded-full text-sm font-bold uppercase tracking-wider transition-all duration-300 ${
                activeTab === role
                  ? 'bg-[var(--proof-primary)] text-white shadow-lg shadow-[var(--proof-primary)]/25 scale-105'
                  : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              For {role.charAt(0).toUpperCase() + role.slice(1)}
            </button>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8 animate-in fade-in slide-in-from-left-4 duration-500 key={activeTab}">
            <h3 className="text-4xl font-bold text-gray-900">
              {content[activeTab].title}
            </h3>
            <p className="text-xl text-gray-600 leading-relaxed">
              {content[activeTab].desc}
            </p>
            
            <div className="grid gap-6">
              {content[activeTab].features.map((feature) => (
                <div key={feature.title} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:border-[var(--proof-primary)]/30 transition-colors">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[var(--proof-primary)]/10 text-[var(--proof-primary)] flex items-center justify-center shrink-0">
                      {feature.icon}
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 text-lg mb-2">{feature.title}</h4>
                      <p className="text-gray-600 text-sm leading-relaxed">{feature.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <Button
              asChild
              className="h-14 px-8 rounded-full bg-gray-900 text-white font-bold text-lg hover:bg-gray-800 transition-colors"
            >
              <Link href={activeTab === 'developers' ? 'https://docs.gotproof.xyz' : '/create'}>
                {activeTab === 'developers' ? 'Read API Docs' : 'Get Started'}
              </Link>
            </Button>
          </div>

          <div className="relative aspect-square lg:aspect-auto lg:h-[600px] bg-[#0B1120] rounded-[2.5rem] overflow-hidden shadow-2xl">
             <Player
               component={ActiveComponent}
               durationInFrames={content[activeTab].durationInFrames}
               fps={30}
               compositionWidth={600}
               compositionHeight={600}
               style={{
                 width: '100%',
                 height: '100%',
               }}
               controls={false}
               loop
               autoPlay
             />
          </div>
        </div>
      </div>
    </section>
  )
}
