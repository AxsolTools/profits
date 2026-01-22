import Link from 'next/link'
import Image from 'next/image'
import proofsLogo from '../Proofslogotransparent.png'

export function Footer() {
  return (
    <footer className="relative border-t border-gray-200 px-6 py-12">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
          {/* Logo and tagline */}
          <div className="flex items-center gap-3">
            <Image
              src={proofsLogo}
              alt="Payment Proofs"
              width={40}
              height={40}
              className="h-10 w-10"
            />
            <div>
              <span className="text-lg font-bold text-gray-900">$PROOF</span>
              <p className="text-sm text-gray-500">Verify Projects Spend, On-Chain</p>
            </div>
          </div>
          
          {/* Links */}
          <div className="flex items-center gap-8">
            <Link href="https://docs.gotproof.xyz" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-600 transition-colors hover:text-gray-900">
              Docs
            </Link>
            <a href="mailto:Support@Gotproof.xyz" className="text-sm text-gray-600 transition-colors hover:text-gray-900">
              Support
            </a>
            <Link href="#features" className="text-sm text-gray-600 transition-colors hover:text-gray-900">
              Features
            </Link>
            <Link href="#how-it-works" className="text-sm text-gray-600 transition-colors hover:text-gray-900">
              How It Works
            </Link>
            <Link 
              href="https://twitter.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-600 transition-colors hover:text-gray-900"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden="true">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </Link>
          </div>
        </div>
        
        {/* Bottom bar */}
        <div className="mt-8 border-t border-gray-100 pt-8 text-center">
          <p className="text-sm text-gray-400">
            Payment Proofs - For the other 98% of creators
          </p>
        </div>
      </div>
    </footer>
  )
}
