'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Player } from '@remotion/player'
import { FluidLedger } from './animations/fluid-ledger'

export function Hero() {
  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center overflow-hidden px-6 pt-32 pb-20 bg-white">
      {/* Remotion Background Layer */}
      <div className="absolute inset-0 z-0 opacity-60">
        <Player
          component={FluidLedger}
          durationInFrames={300}
          fps={30}
          compositionWidth={1920}
          compositionHeight={1080}
          style={{
            width: '100%',
            height: '100%',
            position: 'absolute',
            top: 0,
            left: 0,
          }}
          controls={false}
          loop
          autoPlay
        />
      </div>
      
      {/* Content Layer - Z-index 10 ensures clicks work */}
      <div className="relative z-10 max-w-5xl mx-auto text-center space-y-12">
        {/* Headline */}
        <h1 className="text-5xl sm:text-7xl md:text-8xl font-black text-gray-900 tracking-tight leading-[0.9] font-[family-name:var(--font-montserrat)] animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100">
          Trustless <br />
          <span className="bg-gradient-to-r from-[var(--proof-primary)] to-[var(--proof-accent)] bg-clip-text text-transparent">
            Escrow Protocol
          </span>
        </h1>

        {/* Subheadline */}
        <p className="max-w-2xl mx-auto text-xl sm:text-2xl text-gray-600 leading-relaxed font-medium animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
          Secure non-custodial payments for any transaction. 
          Verified on-chain, governed by token holders, and fully decentralized.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300">
          <Link href="/create" className="w-full sm:w-auto">
            <Button className="w-full sm:w-auto h-16 px-10 rounded-full bg-[var(--proof-primary)] hover:bg-[var(--proof-primary-hover)] text-white text-lg font-bold shadow-xl shadow-[var(--proof-primary)]/20 transition-all hover:scale-105">
              Create Escrow
            </Button>
          </Link>
          <Link href="/dashboard" className="w-full sm:w-auto">
            <Button variant="outline" className="w-full sm:w-auto h-16 px-10 rounded-full border-2 border-gray-200 bg-white/50 hover:bg-white text-gray-900 text-lg font-bold hover:border-[var(--proof-primary)]/30 transition-all shadow-sm backdrop-blur-sm">
              View Dashboard
            </Button>
          </Link>
        </div>

        {/* Stats Grid - Light Mode Glass */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-16 border-t border-gray-200/50 mt-16 animate-in fade-in duration-1000 delay-500 relative">
          <div className="p-4 rounded-2xl bg-white/40 backdrop-blur-md border border-white/50 shadow-sm">
            <p className="text-3xl font-black text-gray-900">$2.4M+</p>
            <p className="text-sm font-bold text-gray-500 uppercase tracking-wider mt-1">Volume Secured</p>
          </div>
          <div className="p-4 rounded-2xl bg-white/40 backdrop-blur-md border border-white/50 shadow-sm">
            <p className="text-3xl font-black text-gray-900">12k+</p>
            <p className="text-sm font-bold text-gray-500 uppercase tracking-wider mt-1">Transactions</p>
          </div>
          <div className="p-4 rounded-2xl bg-white/40 backdrop-blur-md border border-white/50 shadow-sm">
            <p className="text-3xl font-black text-gray-900">0%</p>
            <p className="text-sm font-bold text-gray-500 uppercase tracking-wider mt-1">Custodial Risk</p>
          </div>
          <div className="p-4 rounded-2xl bg-white/40 backdrop-blur-md border border-white/50 shadow-sm">
            <p className="text-3xl font-black text-gray-900">&lt; 1s</p>
            <p className="text-sm font-bold text-gray-500 uppercase tracking-wider mt-1">Settlement</p>
          </div>
        </div>
      </div>
    </section>
  )
}
