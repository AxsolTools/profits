'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { PlatformTicker } from './platform-ticker'
import proofsLogo from '../Proofslogotransparent.png'

const rotatingWords = [
  'The Value Of Assets',
  'Ownership',
  'Spending',
  'Payroll',
  'Subscriptions',
  'Tokenization',
]

export function Hero() {
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [animationState, setAnimationState] = useState<'enter' | 'exit'>('enter')
  const [isVisible, setIsVisible] = useState(true); // Declare isVisible variable

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationState('exit')
      
      setTimeout(() => {
        setCurrentWordIndex((prev) => (prev + 1) % rotatingWords.length)
        setAnimationState('enter')
      }, 200)
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 pt-24 pb-12">
      {/* Gradient overlay */}
      <div 
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background: 'radial-gradient(ellipse 80% 50% at 50% 30%, rgba(29, 161, 242, 0.12) 0%, transparent 60%)',
        }}
        aria-hidden="true"
      />
      
      {/* Main content */}
      <div className="relative z-10 mx-auto max-w-5xl text-center">
        {/* Verification badge - no border */}
        <div className="mb-8 flex justify-center" style={{ perspective: '1000px' }}>
          <Image
            src={proofsLogo}
            alt="Payment Proofs Verification Badge"
            width={120}
            height={120}
            className="h-28 w-28 drop-shadow-[0_0_30px_rgba(29,161,242,0.4)] sm:h-32 sm:w-32 animate-spin-y"
            priority
          />
        </div>
        
        {/* Main headline with rotating text */}
        <h1 className="mb-6 flex flex-col items-center justify-center gap-2 py-1 text-4xl font-bold leading-[1.15] tracking-tight text-gray-900 sm:flex-row sm:gap-3 sm:text-5xl md:text-6xl lg:text-7xl">
          <span className="font-[family-name:var(--font-montserrat)]" style={{ fontWeight: 900, letterSpacing: '-0.02em' }}>PROOF:</span>
          <span 
            className="block min-w-0 py-1 leading-[1.15] bg-gradient-to-r from-[#1DA1F2] to-[#4ECDC4] bg-clip-text text-3xl font-bold text-transparent sm:min-w-[450px] sm:text-4xl md:text-5xl lg:text-6xl"
            style={{ 
              transform: animationState === 'enter' ? 'scale(1) translateZ(0)' : 'scale(0.5) translateZ(-100px)',
              opacity: animationState === 'enter' ? 1 : 0,
              filter: animationState === 'enter' ? 'blur(0px)' : 'blur(10px)',
              transition: animationState === 'enter' 
                ? 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)' 
                : 'all 0.2s cubic-bezier(0.6, -0.28, 0.735, 0.045)',
              transformStyle: 'preserve-3d',
              perspective: '1000px',
            }}
          >
            {rotatingWords[currentWordIndex]}
          </span>
        </h1>
        
        {/* Subheadline */}
        <p className="mx-auto mb-10 max-w-2xl text-balance text-lg text-gray-600 sm:text-xl">
          Where assets and spends, become $PROOF'd.
        </p>
        
        {/* CTA Buttons */}
        <div className="mb-16 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="#buy"
            className="group flex h-14 items-center gap-3 rounded-full bg-[#1DA1F2] px-10 text-lg font-semibold text-white transition-all hover:bg-[#1a8cd8] hover:shadow-xl hover:shadow-[#1DA1F2]/30"
          >
            Buy $PROOF
            <svg 
              className="h-5 w-5 transition-transform group-hover:translate-x-1" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
          
          <Link
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-14 items-center gap-3 rounded-full border border-transparent bg-white px-10 text-lg font-medium text-gray-900 shadow-none transition-colors hover:bg-gray-50"
          >
            Follow on X
          </Link>
        </div>
      </div>
      
      {/* Platform ticker at bottom of hero */}
      <div className="relative z-10 w-full">
        <p className="mb-4 text-center text-sm font-medium uppercase tracking-wider text-gray-400">
          Supported Platforms
        </p>
        <PlatformTicker />
      </div>
    </section>
  )
}
