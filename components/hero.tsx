'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { PlatformTicker } from './platform-ticker'
import { useReducedMotion } from '@/hooks/use-reduced-motion'
import proofsLogo from '../Proofslogotransparent.png'

const rotatingWords = [
  'Assets',
  'Ownership',
  'Spending',
  'Payroll',
  'Subscriptions',
  'Tokenization',
]

export function Hero() {
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [animationState, setAnimationState] = useState<'enter' | 'exit'>('enter')
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    if (prefersReducedMotion) return

    const interval = setInterval(() => {
      setAnimationState('exit')
      
      setTimeout(() => {
        setCurrentWordIndex((prev) => (prev + 1) % rotatingWords.length)
        setAnimationState('enter')
      }, 200)
    }, 2500) // Slower rotation for better readability

    return () => clearInterval(interval)
  }, [prefersReducedMotion])

  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 pt-24 pb-12">
      {/* Enhanced Gradient overlay */}
      <div 
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background: 'radial-gradient(ellipse 80% 50% at 50% 30%, var(--proof-primary-glow) 0%, transparent 60%)',
        }}
        aria-hidden="true"
      />
      
      {/* Main content */}
      <div className="relative z-10 mx-auto max-w-5xl text-center">
        {/* Verification badge - Enhanced with glassmorphism */}
        <div className="mb-12 flex justify-center" style={{ perspective: '1000px' }}>
          <div className="relative group cursor-pointer">
            <div className="absolute inset-0 bg-[var(--proof-primary)]/20 rounded-full blur-2xl group-hover:blur-3xl transition-all duration-700 opacity-50" />
            <Image
              src={proofsLogo}
              alt="Payment Proofs Verification Badge"
              width={140}
              height={140}
              className={`relative z-10 h-32 w-32 sm:h-40 sm:w-40 drop-shadow-2xl transition-transform duration-500 group-hover:scale-105 ${prefersReducedMotion ? '' : 'animate-spin-y'}`}
              priority
            />
          </div>
        </div>
        
        {/* Main headline with enhanced rotating text */}
        <h1 className="mb-8 flex flex-col items-center justify-center gap-2 py-1 text-5xl font-black leading-tight tracking-tight text-gray-900 sm:flex-row sm:gap-4 sm:text-6xl md:text-7xl lg:text-8xl font-[family-name:var(--font-montserrat)]">
          <span>PROOF:</span>
          <span 
            className="block min-w-0 py-1 bg-gradient-to-r from-[var(--proof-primary)] to-[var(--proof-accent)] bg-clip-text text-transparent"
            style={prefersReducedMotion ? undefined : { 
              transform: animationState === 'enter' ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.9)',
              opacity: animationState === 'enter' ? 1 : 0,
              filter: animationState === 'enter' ? 'blur(0px)' : 'blur(8px)',
              transition: 'all 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)',
            }}
          >
            {rotatingWords[currentWordIndex]}
          </span>
        </h1>
        
        {/* Subheadline - More direct value prop */}
        <p className="mx-auto mb-12 max-w-2xl text-xl text-gray-600 sm:text-2xl font-medium leading-relaxed">
          The decentralized standard for verifiable payments. <br className="hidden sm:block" />
          Escrow, dispute resolution, and on-chain proof for everyone.
        </p>
        
        {/* CTA Buttons - Upgraded to App triggers */}
        <div className="mb-20 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/create"
            className="group relative overflow-hidden flex h-16 items-center gap-3 rounded-full bg-[var(--proof-primary)] px-12 text-xl font-bold text-white transition-all hover:scale-105 shadow-xl shadow-[var(--proof-primary)]/30 hover:shadow-[var(--proof-primary)]/50"
          >
            <span className="relative z-10">Launch App</span>
            <svg 
              className="relative z-10 h-6 w-6 transition-transform group-hover:translate-x-1" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          </Link>
          
          <Link
            href="/dashboard"
            className="flex h-16 items-center gap-3 rounded-full border-2 border-gray-200 bg-white px-12 text-xl font-bold text-gray-900 transition-all hover:border-[var(--proof-primary)]/30 hover:bg-gray-50 hover:text-[var(--proof-primary)]"
          >
            View Dashboard
          </Link>
        </div>
      </div>
      
      {/* Platform ticker at bottom of hero */}
      <div className="relative z-10 w-full mt-auto">
        <p className="mb-6 text-center text-sm font-bold uppercase tracking-[0.2em] text-gray-400">
          Trusted across 100+ Platforms
        </p>
        <PlatformTicker />
      </div>
    </section>
  )
}
