import {
  GoFundMeIcon,
  PatreonIcon,
  TwitchIcon,
  YouTubeIcon,
  TwitterXIcon,
  PayPalIcon,
  CashAppIcon,
  VenmoIcon,
} from './brand-icons';
import Image from 'next/image';
import proofsLogo from '../Proofslogotransparent.png';

export function Features() {
  return (
    <section id="features" className="relative px-6 py-32 overflow-hidden">
      {/* Ambient glow */}
      <div 
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] opacity-30"
        style={{
          background: 'conic-gradient(from 180deg at 50% 50%, rgba(29, 161, 242, 0.15) 0deg, transparent 60deg, rgba(29, 161, 242, 0.1) 120deg, transparent 180deg, rgba(29, 161, 242, 0.15) 240deg, transparent 300deg, rgba(29, 161, 242, 0.1) 360deg)',
          filter: 'blur(60px)',
        }}
        aria-hidden="true"
      />
      
      <div className="relative mx-auto w-full max-w-[1600px]">
        {/* Bento Layout */}
        <div className="grid grid-cols-12 gap-4 lg:gap-6">
          
          {/* Large Hero Card - On-Chain Verification */}
          <div className="col-span-12 lg:col-span-7 relative group">
            <div className="relative h-full min-h-[400px] overflow-hidden rounded-3xl bg-white border border-transparent shadow-none p-8 lg:p-12">
              {/* Animated mesh background */}
              <div className="absolute inset-0 opacity-40" aria-hidden="true">
                <svg className="h-full w-full" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice">
                  <defs>
                    <pattern id="verification-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(29, 161, 242, 0.15)" strokeWidth="1"/>
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#verification-grid)"/>
                </svg>
              </div>
              
              {/* Content */}
              <div className="relative z-10 flex h-full flex-col justify-between">
                <div>
                  <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-[#1DA1F2]/10 px-4 py-2 text-[#1DA1F2]">
                    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none">
                      <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M12 3l9 4.5v9L12 21l-9-4.5v-9L12 3z" stroke="currentColor" strokeWidth="2" fill="none"/>
                    </svg>
                    <span className="text-sm font-semibold tracking-wide">CORE TECHNOLOGY</span>
                  </div>
                  <h3 className="mb-4 text-3xl font-bold text-gray-900 lg:text-4xl">
                    On-Chain Verification
                  </h3>
                  <p className="max-w-md text-lg text-gray-600 leading-relaxed">
                    Every donation is permanently recorded and publicly verifiable. Transparent receipts that last forever.
                  </p>
                </div>
                
                {/* Visual element - verification badge stack */}
                <div className="mt-8 flex items-end gap-4">
                  <div className="flex -space-x-3">
                    {[...Array(4)].map((_, i) => (
                      <div 
                        key={i}
                        className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-transparent shadow-none bg-gradient-to-br from-[#1DA1F2] to-[#0d8ecf]"
                        style={{ zIndex: 4 - i, opacity: 1 - i * 0.2 }}
                      >
                        <svg className="h-6 w-6 text-white" viewBox="0 0 24 24" fill="none">
                          <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                    ))}
                  </div>
                  <span className="text-sm text-gray-400">Every transaction verified</span>
                </div>
              </div>
              
              {/* Decorative corner accent */}
              <div className="absolute right-0 top-0 h-32 w-32 rounded-bl-[100px] bg-[#1DA1F2]/10" aria-hidden="true" />
            </div>
          </div>
          
          {/* Tall Card - Real Fiat Spending */}
          <div className="col-span-12 sm:col-span-6 lg:col-span-5 relative group">
            <div className="relative h-full min-h-[400px] overflow-hidden rounded-3xl bg-white border border-transparent shadow-none p-8">
              <div className="flex h-full flex-col">
                <div className="mb-auto">
                  <h3 className="mb-3 text-2xl font-bold text-gray-900">Real Fiat Spending</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Your crypto converts to real dollars. Creators get paid through platforms they already use and trust.
                  </p>
                </div>
                
                {/* Currency conversion visualization */}
                <div className="mt-8 space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#9945FF]/20">
                      <svg className="h-8 w-8" viewBox="0 0 397.7 311.7" fill="none">
                        <linearGradient id="solGrad1" x1="360.88" y1="351.46" x2="141.21" y2="-69.29" gradientUnits="userSpaceOnUse">
                          <stop offset="0" stopColor="#00FFA3"/>
                          <stop offset="1" stopColor="#DC1FFF"/>
                        </linearGradient>
                        <path fill="url(#solGrad1)" d="M64.6,237.9c2.4-2.4,5.7-3.8,9.2-3.8h317.4c5.8,0,8.7,7,4.6,11.1l-62.7,62.7c-2.4,2.4-5.7,3.8-9.2,3.8H6.5c-5.8,0-8.7-7-4.6-11.1L64.6,237.9z"/>
                        <path fill="url(#solGrad1)" d="M64.6,3.8C67.1,1.4,70.4,0,73.8,0h317.4c5.8,0,8.7,7,4.6,11.1l-62.7,62.7c-2.4,2.4-5.7,3.8-9.2,3.8H6.5c-5.8,0-8.7-7-4.6-11.1L64.6,3.8z"/>
                        <path fill="url(#solGrad1)" d="M333.1,120.1c-2.4-2.4-5.7-3.8-9.2-3.8H6.5c-5.8,0-8.7,7-4.6,11.1l62.7,62.7c2.4,2.4,5.7,3.8,9.2,3.8h317.4c5.8,0,8.7-7,4.6-11.1L333.1,120.1z"/>
                      </svg>
                    </div>
                    <div className="h-px flex-1 bg-gradient-to-r from-[#14F195]/50 via-white/20 to-[#22c55e]/50" />
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#22c55e]/20">
                      <span className="text-2xl font-bold text-[#22c55e]">$</span>
                    </div>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[#627EEA]">ETH, SOL, USDC</span>
                    <span className="text-[#22c55e]">USD, EUR, GBP</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Wide Card - Public X Verification */}
          <div className="col-span-12 sm:col-span-6 lg:col-span-5 relative group">
            <div className="relative h-full min-h-[280px] overflow-hidden rounded-3xl bg-white border border-transparent shadow-none p-8">
              <h3 className="mb-3 text-2xl font-bold text-gray-900">Public X Verification</h3>
              <p className="mb-6 max-w-sm text-gray-600 leading-relaxed">
                Every donation is automatically posted to X for everyone to see. Real receipts, not promises.
              </p>
              
              {/* Mock tweet - matches carousel toast style */}
              <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4">
                <div className="flex items-start gap-3">
                  <Image
                    src={proofsLogo}
                    alt="Payment Proofs"
                    width={40}
                    height={40}
                    className="h-10 w-10 rounded-full"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-gray-900 text-sm">New asset $PROOF'd</span>
                      <svg className="h-4 w-4 text-[#1DA1F2] flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M8.52 3.59a5.5 5.5 0 016.96 0l.8.65a3.5 3.5 0 002.2.78h1.03a5.5 5.5 0 014.92 4.92v1.03a3.5 3.5 0 00.78 2.2l.65.8a5.5 5.5 0 010 6.96l-.65.8a3.5 3.5 0 00-.78 2.2v1.03a5.5 5.5 0 01-4.92 4.92h-1.03a3.5 3.5 0 00-2.2.78l-.8.65a5.5 5.5 0 01-6.96 0l-.8-.65a3.5 3.5 0 00-2.2-.78H4.49a5.5 5.5 0 01-4.92-4.92v-1.03a3.5 3.5 0 00-.78-2.2l-.65-.8a5.5 5.5 0 010-6.96l.65-.8a3.5 3.5 0 00.78-2.2V4.49A5.5 5.5 0 014.49-.43h1.03a3.5 3.5 0 002.2-.78l.8-.65z"/>
                        <path d="M10 14l2 2 4-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                      </svg>
                    </div>
                    <p className="text-gray-500 text-xs">@paymentproofs</p>
                    <p className="mt-2 text-gray-900 text-sm">
                      <span className="text-[#1DA1F2]">@mcuban</span> just tokenized The Mavericks for <span className="text-[#22c55e] font-semibold">$129M</span> in <span className="text-[#1DA1F2]">$NBAsol</span> to 430 members
                    </p>
                    <div className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-[#1DA1F2]/10 px-2 py-1">
                      <svg className="h-3 w-3 text-[#1DA1F2]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <span className="text-[#1DA1F2] text-xs font-medium">Verified</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Medium Card - 100+ Platforms */}
          <div className="col-span-12 lg:col-span-4 relative group">
            <div className="relative h-full min-h-[280px] overflow-hidden rounded-3xl bg-white border border-transparent shadow-none p-8">
              <h3 className="mb-3 text-2xl font-bold text-gray-900">100+ Platforms</h3>
              <p className="mb-6 text-gray-600 leading-relaxed">
                GoFundMe, Patreon, Twitch, YouTube, X Subscriptions—wherever creators receive support.
              </p>
              
              {/* Platform logos cluster */}
              <div className="flex flex-wrap gap-2">
                <GoFundMeIcon className="h-10 w-10" />
                <PatreonIcon className="h-10 w-10" />
                <TwitchIcon className="h-10 w-10" />
                <YouTubeIcon className="h-10 w-10" />
                <TwitterXIcon className="h-10 w-10" />
                <PayPalIcon className="h-10 w-10" />
                <CashAppIcon className="h-10 w-10" />
                <VenmoIcon className="h-10 w-10" />
                <div className="flex h-10 items-center rounded-xl bg-white/5 px-4 text-sm text-gray-400">
                  +92 more
                </div>
              </div>
            </div>
          </div>
          
          {/* Small Card - CAPEX Tracking */}
          <div className="col-span-12 sm:col-span-6 lg:col-span-3 relative group">
            <div className="relative h-full min-h-[280px] overflow-hidden rounded-3xl bg-white border border-transparent shadow-none p-8">
              <h3 className="mb-3 text-xl font-bold text-gray-900">CAPEX Tracking</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Track how projects spend funds. Full transparency on capital expenditures.
              </p>
              
              {/* Mini chart visualization */}
              <div className="mt-6 flex items-end gap-1.5 h-20">
                {[40, 65, 45, 80, 55, 90, 70].map((h, i) => (
                  <div 
                    key={i}
                    className="flex-1 rounded-t bg-gradient-to-t from-[#1DA1F2]/50 to-[#1DA1F2]"
                    style={{ height: `${h}%` }}
                  />
                ))}
              </div>
            </div>
          </div>
          
          {/* Wide Bottom Card - Creator-First Design */}
          <div className="col-span-12 relative group">
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#1DA1F2]/10 via-[#bfdbfe]/40 to-[#1DA1F2]/10 border border-transparent shadow-none p-8 lg:p-12">
              <div className="flex flex-col items-center text-center lg:flex-row lg:justify-between lg:text-left">
                <div className="max-w-xl">
                  <h3 className="mb-3 text-2xl font-bold text-gray-900 lg:text-3xl">Built for the 98%</h3>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    Most creators don't use crypto. We bridge that gap with familiar payment flows. No wallets required for recipients.
                  </p>
                </div>
                <div className="mt-8 flex items-center gap-8 lg:mt-0">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-[#1DA1F2]">98%</div>
                    <div className="text-sm text-gray-400">Non-crypto creators</div>
                  </div>
                  <div className="h-16 w-px bg-gray-200" />
                  <div className="text-center">
                    <div className="text-4xl font-bold text-gray-900">1M+</div>
                    <div className="text-sm text-gray-400">Potential users</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  )
}
