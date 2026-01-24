'use client'

import { useReducedMotion } from '@/hooks/use-reduced-motion'

const categories = [
  {
    title: 'E-Commerce',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
    ),
    items: ['Physical Goods', 'Digital Assets', 'P2P Marketplaces', 'Cross-border Trade']
  },
  {
    title: 'Services & Freelance',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
    ),
    items: ['Development', 'Consulting', 'Marketing', 'Creative Work']
  },
  {
    title: 'Real Estate',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
    ),
    items: ['Security Deposits', 'Earnest Money', 'Vacation Rentals', 'Property Sales']
  },
  {
    title: 'B2B & Enterprise',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
    ),
    items: ['Vendor Payments', 'Supply Chain', 'Milestones', 'Partnerships']
  },
  {
    title: 'Gaming',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" /></svg>
    ),
    items: ['Item Trading', 'Account Sales', 'Prize Pools', 'Wagering']
  },
  {
    title: 'Legal',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" /></svg>
    ),
    items: ['Settlements', 'Loan Agreements', 'IP Licensing', 'M&A Holds']
  },
  {
    title: 'Automotive',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" /></svg>
    ),
    items: ['Vehicle Purchase', 'Parts Trading', 'Deposits', 'Imports']
  },
  {
    title: 'Digital Assets',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>
    ),
    items: ['Domains', 'Social Accounts', 'SaaS Transfers', 'Content Rights']
  }
]

export function UseCaseMatrix() {
  const prefersReducedMotion = useReducedMotion()

  return (
    <section className="py-24 bg-gray-50 border-y border-gray-200" id="use-cases">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-black text-gray-900 font-[family-name:var(--font-montserrat)] tracking-tight mb-4">
            Built for Every Economy
          </h2>
          <p className="text-xl text-gray-600">
            From digital goods to real estate, the PROOF protocol secures value across all industries.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat, i) => (
            <div 
              key={cat.title}
              className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow group"
            >
              <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center text-gray-900 group-hover:bg-[var(--proof-primary)] group-hover:text-white transition-colors mb-6">
                {cat.icon}
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-4">{cat.title}</h3>
              <ul className="space-y-2">
                {cat.items.map((item) => (
                  <li key={item} className="flex items-center text-sm text-gray-600">
                    <span className="w-1.5 h-1.5 bg-[var(--proof-primary)]/40 rounded-full mr-2"></span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
