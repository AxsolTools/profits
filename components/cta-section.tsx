import Link from 'next/link'
import Image from 'next/image'
import proofsLogo from '../Proofslogotransparent.png'

export function CTASection() {
  return (
    <section id="buy" className="relative px-6 py-24">
      <div className="mx-auto max-w-4xl">
        <div className="relative overflow-hidden rounded-3xl border border-gray-200 bg-gradient-to-br from-[var(--proof-primary)]/10 via-white to-[var(--proof-accent)]/10 p-8 text-center lg:p-16 shadow-lg">
          {/* Background glow */}
          <div 
            className="pointer-events-none absolute inset-0"
            style={{
              background: 'radial-gradient(circle at 50% 30%, var(--proof-primary-glow) 0%, transparent 50%)',
            }}
            aria-hidden="true"
          />
          
          <div className="relative z-10">
            {/* Logo */}
            <div className="mb-8 flex justify-center">
              <Image
                src={proofsLogo}
                alt="Payment Proofs"
                width={80}
                height={80}
                className="h-20 w-20"
              />
            </div>
            
            <h2 className="mb-4 text-balance text-3xl font-bold text-gray-900 sm:text-4xl lg:text-5xl">
              Launch a Trustless Escrow
            </h2>
            <p className="mx-auto mb-10 max-w-xl text-pretty text-lg text-gray-600">
              Secure funds on-chain, resolve disputes through governance, and settle instantly.
            </p>
            
            {/* CTA buttons */}
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/create"
                className="group flex h-14 items-center gap-3 rounded-full bg-[var(--proof-primary)] px-10 text-lg font-semibold text-white transition-all hover:bg-[var(--proof-primary-hover)] hover:shadow-xl hover:shadow-[var(--proof-primary)]/30"
              >
                Create Escrow
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
                className="flex h-14 items-center gap-3 rounded-full border border-gray-300 bg-white px-10 text-lg font-medium text-gray-900 shadow-sm transition-all hover:border-gray-400 hover:bg-gray-50"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden="true">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
                Follow Updates
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
