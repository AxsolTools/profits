'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import proofsLogo from '../Proofslogotransparent.png'
import { Button } from '@/components/ui/button'
import { WalletButton } from '@/components/wallet-button'

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      <div className="absolute inset-0 bg-white/70 backdrop-blur-xl border-b border-gray-200/50" />
      
      <div className="relative mx-auto flex h-24 w-full max-w-[1920px] items-center justify-between px-8 md:px-12">
        {/* Left: Logo */}
        <div className="flex-1 flex justify-start">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative h-10 w-10 transition-transform duration-500 group-hover:rotate-180">
              <Image
                src={proofsLogo}
                alt="PROOF"
                fill
                className="object-contain"
              />
            </div>
            <span className="text-2xl font-black tracking-tight text-gray-900 font-[family-name:var(--font-montserrat)]">
              PROOF
            </span>
          </Link>
        </div>

        {/* Center: Navigation Pill - Absolute Center */}
        <div className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <nav className="flex items-center gap-1 bg-gray-100/80 p-1.5 rounded-full border border-gray-200/50 backdrop-blur-md shadow-sm">
            <Link href="/dashboard">
              <Button variant="ghost" className="rounded-full px-6 h-11 text-gray-600 font-bold hover:text-gray-900 hover:bg-white hover:shadow-sm transition-all text-base">
                Dashboard
              </Button>
            </Link>
            <Link href="/governance">
              <Button variant="ghost" className="rounded-full px-6 h-11 text-gray-600 font-bold hover:text-gray-900 hover:bg-white hover:shadow-sm transition-all text-base">
                Governance
              </Button>
            </Link>
            <Link href="/developers">
              <Button variant="ghost" className="rounded-full px-6 h-11 text-gray-600 font-bold hover:text-gray-900 hover:bg-white hover:shadow-sm transition-all text-base">
                Developers
              </Button>
            </Link>
          </nav>
        </div>

        {/* Right: Actions */}
        <div className="flex-1 flex justify-end items-center gap-6">
          <Link href="https://docs.gotproof.xyz" target="_blank" className="hidden xl:block text-base font-bold text-gray-500 hover:text-gray-900 transition-colors">
            Docs
          </Link>
          
          <WalletButton />
          <Link href="/create">
            <Button className="h-12 px-8 rounded-full bg-gray-900 hover:bg-black text-white text-base font-bold shadow-lg shadow-gray-200 hover:shadow-xl transition-all hover:scale-105 active:scale-95 flex items-center gap-2">
              Launch App
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </Button>
          </Link>
        </div>
      </div>
    </header>
  )
}
