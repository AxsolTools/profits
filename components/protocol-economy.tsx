'use client'

import { Button } from '@/components/ui/button'
import { Player } from '@remotion/player'
import { VotingROI } from './animations/voting-roi'

export function ProtocolEconomy() {
  return (
    <section className="py-24 bg-white overflow-hidden" id="economy">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--proof-primary)]/10 text-[var(--proof-primary)] font-bold text-sm">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              Token Utility
            </div>
            
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 font-[family-name:var(--font-montserrat)] tracking-tight leading-tight">
              Governance is Yield. <br />
              <span className="text-[var(--proof-primary)]">Earn by Judging.</span>
            </h2>
            
            <p className="text-xl text-gray-600 leading-relaxed">
              $PROOF holders are the supreme court of the protocol. Stake your tokens to vote on disputes and earn 10% of the disputed value.
            </p>

            <div className="space-y-6">
              <div className="flex gap-4 items-start">
                <div className="w-12 h-12 rounded-xl bg-[var(--proof-primary)]/10 flex items-center justify-center shrink-0">
                  <span className="text-xl font-black text-[var(--proof-primary)]">1</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Weighted Voting Power</h3>
                  <p className="text-gray-600 mt-1">Your vote weight is proportional to your $PROOF holdings. Whale protection mechanisms apply decay to prevent dominance.</p>
                </div>
              </div>
              
              <div className="flex gap-4 items-start">
                <div className="w-12 h-12 rounded-xl bg-[var(--proof-primary)]/10 flex items-center justify-center shrink-0">
                  <span className="text-xl font-black text-[var(--proof-primary)]">2</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">10% Dispute Rewards</h3>
                  <p className="text-gray-600 mt-1">Voters who align with the majority consensus split a 10% fee from the disputed transaction value.</p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="w-12 h-12 rounded-xl bg-[var(--proof-primary)]/10 flex items-center justify-center shrink-0">
                  <span className="text-xl font-black text-[var(--proof-primary)]">3</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Deflationary Burn</h3>
                  <p className="text-gray-600 mt-1">A portion of platform fees are used to buy back and burn $PROOF, permanently reducing supply.</p>
                </div>
              </div>
            </div>

            <Button className="h-14 px-8 rounded-full bg-gray-900 text-white font-bold text-lg hover:bg-gray-800 transition-colors">
              Read Whitepaper
            </Button>
          </div>

          {/* Interactive Calculator Visualization */}
          <div className="bg-gray-900 rounded-[2.5rem] overflow-hidden shadow-2xl relative aspect-square">
            <Player
               component={VotingROI}
               durationInFrames={120}
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
