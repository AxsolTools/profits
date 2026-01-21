'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { VerificationModal } from './verification-modal'
import proofsLogo from '../Proofslogotransparent.png'

export function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  
  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 px-6 py-4">
        <nav className="flex w-full items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div style={{ perspective: '500px' }}>
              <Image
                src={proofsLogo}
                alt="Payment Proofs Logo"
                width={48}
                height={48}
                className="h-12 w-12 animate-spin-y"
                priority
              />
            </div>
            <span className="text-xl font-bold tracking-tight text-gray-900">
              $PROOF
            </span>
          </Link>
          
          <div className="flex items-center gap-3">
            {/* Start Verifying Button */}
            <button
              onClick={() => setIsModalOpen(true)}
              className="hidden sm:flex h-10 items-center gap-2 rounded-full bg-[#1DA1F2] px-5 text-sm font-semibold text-white transition-all hover:bg-[#1a8cd8] hover:shadow-lg hover:shadow-[#1DA1F2]/25"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
              <span>Start Verifying</span>
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
            
            {/* X/Twitter Link */}
            <Link
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 bg-white text-gray-700 shadow-sm transition-all hover:border-gray-400 hover:bg-gray-50"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </Link>
            
            {/* Buy $PROOF */}
            <Link
              href="#buy"
              className="flex h-10 items-center gap-2 rounded-full border border-[#1DA1F2] bg-transparent px-5 text-sm font-semibold text-[#1DA1F2] transition-all hover:bg-[#1DA1F2]/10"
            >
              Buy $PROOF
            </Link>
          </div>
        </nav>
      </header>
      
      <VerificationModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </>
  )
}
