'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'

const proofExamples = [
  {
    id: 1,
    title: "Miami Beachfront Trust",
    value: "$25M",
    description: "Richard's private beach house trust for family and friends worth 25m",
    image: "/images/miami-beachfront.jpg",
    icon: "home",
  },
  {
    id: 2,
    title: "Satoshi Nakamoto's Will",
    value: "1,500 BTC",
    description: "Left behind 1500 BTC for wallets 0x7a9...0x3f2...",
    image: "/images/satoshi-will.jpg",
    icon: "scroll",
  },
  {
    id: 3,
    title: "OpenSea Employee Payroll",
    value: "$1.2M/mo",
    description: "Payroll Processing for 340 employees, 1.2m/mo",
    image: "/images/opensea-payroll.jpg",
    icon: "users",
  },
  {
    id: 4,
    title: "Pudgy Penguins Treasury",
    value: "$104M",
    description: "$104M in assets collected by Luca Netz held and $PROOF'd",
    image: "/images/pudgy-treasury.jpg",
    icon: "vault",
  },
]

function ProofIcon({ type }: { type: string }) {
  switch (type) {
    case 'home':
      return (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2L2 12h3v8h6v-6h2v6h6v-8h3L12 2z"/>
        </svg>
      )
    case 'scroll':
      return (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
        </svg>
      )
    case 'users':
      return (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
        </svg>
      )
    case 'vault':
      return (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V6h16v12zM12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zm0 8c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z"/>
        </svg>
      )
    default:
      return null
  }
}

export function ProofExamples() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const scrollRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 340
      const newScrollLeft = direction === 'left' 
        ? scrollRef.current.scrollLeft - scrollAmount 
        : scrollRef.current.scrollLeft + scrollAmount
      scrollRef.current.scrollTo({ left: newScrollLeft, behavior: 'smooth' })
    }
  }

  return (
    <section className="py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="relative mb-8 flex items-center">
          <h2 className="w-full text-center text-3xl font-bold text-gray-900 md:text-4xl">
            <span className="text-gray-900">Get </span>
            <span className="text-[#1DA1F2]">PROOF`D</span>
          </h2>
          
          {/* Navigation arrows */}
          <div className="absolute right-0 hidden items-center gap-3 md:flex">
            <button
              onClick={() => scroll('left')}
              className="w-12 h-12 rounded-full bg-white border border-transparent shadow-none flex items-center justify-center text-gray-600 hover:text-gray-900 hover:bg-white/90 transition-colors"
              aria-label="Scroll left"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={() => scroll('right')}
              className="w-12 h-12 rounded-full bg-white border border-transparent shadow-none flex items-center justify-center text-gray-600 hover:text-gray-900 hover:bg-white/90 transition-colors"
              aria-label="Scroll right"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Cards carousel */}
      <div className="relative">
        {/* Gradient overlays */}
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-transparent to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-transparent to-transparent z-10 pointer-events-none" />
        
        <div 
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto scrollbar-hide pb-4 px-6 justify-start snap-x snap-mandatory scroll-px-6 md:justify-center md:snap-none"
        >
          {proofExamples.map((proof) => (
            <div
              key={proof.id}
              className="flex-shrink-0 w-[260px] sm:w-[300px] md:w-[340px] snap-center group cursor-pointer"
            >
              <div className="relative h-[420px] rounded-3xl overflow-hidden bg-white border border-transparent shadow-none transition-all duration-300 hover:scale-[1.02]">
                {/* Background image */}
                <Image
                  src={proof.image || "/placeholder.svg"}
                  alt={proof.title}
                  fill
                  className="object-cover"
                />
                
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                
                {/* Icon badge */}
                <div className="absolute top-4 left-4 w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white">
                  <ProofIcon type={proof.icon} />
                </div>
                
                {/* Verified badge */}
                <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-[#00c853] rounded-full px-3 py-1.5 shadow-lg">
                  <div className="w-2 h-2 rounded-full bg-white" />
                  <span className="text-white text-xs font-semibold">PROOF'd</span>
                </div>
                
                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  {/* Value badge */}
                  <div className="inline-flex items-center gap-2 bg-[#1DA1F2]/20 backdrop-blur-md rounded-full px-3 py-1 mb-3">
                    <span className="text-[#1DA1F2] text-sm font-bold">{proof.value}</span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-2">
                    {proof.title}
                  </h3>
                  <p className="text-white/70 text-sm leading-relaxed mb-4">
                    {proof.description}
                  </p>
                  
                  {/* View proof link */}
                  <div className="flex items-center gap-2 text-[#1DA1F2] text-sm font-medium group-hover:gap-3 transition-all">
                    <span>View on-chain proof</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Mobile navigation dots */}
      <div className="flex justify-center gap-2 mt-6 md:hidden">
        {proofExamples.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentIndex ? 'w-6 bg-[#1DA1F2]' : 'bg-gray-300'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  )
}
