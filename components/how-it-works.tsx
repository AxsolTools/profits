export function HowItWorks() {
  return (
    <section id="how-it-works" className="relative px-6 py-32 overflow-hidden" aria-labelledby="how-it-works-title">
      {/* Section header */}
      <div className="mx-auto max-w-7xl">
        <div className="mb-20 text-center">
          <h2 id="how-it-works-title" className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl lg:text-5xl">
            The Flow
          </h2>
          <p className="mx-auto max-w-xl text-lg text-gray-500">
            Crypto in. Verified fiat out. Public proof always.
          </p>
        </div>

        {/* Horizontal Flow - Desktop */}
        <div className="hidden lg:block">
          <div className="relative">
            {/* Connection line */}
            <div className="absolute top-1/2 left-0 right-0 h-px -translate-y-1/2" aria-hidden="true">
              <div className="h-full w-full bg-gradient-to-r from-transparent via-[#1DA1F2]/50 to-transparent" />
            </div>
            
            {/* Flow nodes */}
            <div className="relative grid grid-cols-4 gap-8">
              
              {/* Node 1 - Connect */}
              <div className="relative">
                <div className="flex flex-col items-center">
                  {/* Icon container */}
                  <div className="relative z-10 mb-6">
                    <div className="flex h-24 w-24 items-center justify-center rounded-full bg-white ring-4 ring-[#1DA1F2]/30">
                      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-[#1DA1F2] to-[#0d8ecf]">
                        <svg className="h-8 w-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9"/>
                        </svg>
                      </div>
                    </div>
                    {/* Pulse ring */}
                    <div className="absolute inset-0 animate-ping rounded-full bg-[#1DA1F2]/20" style={{ animationDuration: '2s' }} />
                  </div>
                  
                  <h4 className="mb-2 text-lg font-semibold text-gray-900">Connect Wallet</h4>
                  <p className="text-center text-sm text-gray-500">
                    Link any major wallet. Phantom, MetaMask, Coinbase—all supported.
                  </p>
                </div>
              </div>
              
              {/* Node 2 - Select */}
              <div className="relative">
                <div className="flex flex-col items-center">
                  <div className="relative z-10 mb-6">
                    <div className="flex h-24 w-24 items-center justify-center rounded-full bg-white ring-4 ring-[#22c55e]/30">
                      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-[#22c55e] to-[#16a34a]">
                        <svg className="h-8 w-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                        </svg>
                      </div>
                    </div>
                  </div>
                  
                  <h4 className="mb-2 text-lg font-semibold text-gray-900">Select Creator</h4>
                  <p className="text-center text-sm text-gray-500">
                    Paste any GoFundMe, Patreon, or creator link. Processed automatically.
                  </p>
                </div>
              </div>
              
              {/* Node 3 - Pledge */}
              <div className="relative">
                <div className="flex flex-col items-center">
                  <div className="relative z-10 mb-6">
                    <div className="flex h-24 w-24 items-center justify-center rounded-full bg-white ring-4 ring-[#f59e0b]/30">
                      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-[#f59e0b] to-[#d97706]">
                        <svg className="h-8 w-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                        </svg>
                      </div>
                    </div>
                  </div>
                  
                  <h4 className="mb-2 text-lg font-semibold text-gray-900">Pledge Crypto</h4>
                  <p className="text-center text-sm text-gray-500">
                    Send ETH, SOL, USDC. Delivered instantly.
                  </p>
                </div>
              </div>
              
              {/* Node 4 - Verify */}
              <div className="relative">
                <div className="flex flex-col items-center">
                  <div className="relative z-10 mb-6">
                    <div className="flex h-24 w-24 items-center justify-center rounded-full bg-white ring-4 ring-[#1DA1F2]/30">
                      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-[#1DA1F2] to-[#0d8ecf]">
                        <svg className="h-8 w-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                        </svg>
                      </div>
                    </div>
                    {/* Success indicator */}
                    <div className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-[#22c55e]">
                      <svg className="h-4 w-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                        <path d="M5 13l4 4L19 7"/>
                      </svg>
                    </div>
                  </div>
                  
                  <h4 className="mb-2 text-lg font-semibold text-gray-900">Public Proof</h4>
                  <p className="text-center text-sm text-gray-500">
                    Auto-posted to X with on-chain verification. Transparent forever.
                  </p>
                </div>
              </div>
              
            </div>
          </div>
        </div>

        {/* Mobile/Tablet Flow */}
        <div className="lg:hidden">
          <div className="relative space-y-6">
            {[
              { icon: 'wallet', color: '#1DA1F2', title: 'Connect Wallet', desc: 'Link any major wallet' },
              { icon: 'user', color: '#22c55e', title: 'Select Creator', desc: 'Paste any creator link' },
              { icon: 'dollar', color: '#f59e0b', title: 'Pledge Crypto', desc: 'Send and convert instantly' },
              { icon: 'check', color: '#1DA1F2', title: 'Public Proof', desc: 'Verified on X forever' },
            ].map((step, i) => (
              <div key={i} className="flex items-center gap-6">
                <div 
                  className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl"
                  style={{ backgroundColor: `${step.color}20` }}
                >
                  <div 
                    className="flex h-10 w-10 items-center justify-center rounded-xl"
                    style={{ backgroundColor: step.color }}
                  >
                    <svg className="h-5 w-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      {step.icon === 'wallet' && <path d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3"/>}
                      {step.icon === 'user' && <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>}
                      {step.icon === 'dollar' && <path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8V7m0 10v1"/>}
                      {step.icon === 'check' && <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>}
                    </svg>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">{step.title}</h4>
                  <p className="text-sm text-gray-500">{step.desc}</p>
                </div>
                {i < 3 && (
                  <div className="absolute left-8 ml-px h-6 w-px bg-gradient-to-b from-white/20 to-transparent" style={{ top: `${(i + 1) * 88 + 64}px` }} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom tagline */}
        <div className="mt-20 text-center">
          <p className="text-lg text-gray-400">
            Paste a link. Automatically verified.
          </p>
        </div>
      </div>
    </section>
  )
}
