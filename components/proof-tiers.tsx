export function ProofTiers() {
  const tiers = [
    {
      tokens: '1M',
      features: ['Payroll', 'Subscription Manager', 'Spend Verification'],
    },
    {
      tokens: '5M',
      features: ['Enterprise Payroll', 'Virtual Visa Generation', 'Tokenization Project'],
    },
    {
      tokens: '10M',
      features: ['DAO Membership rights', '$PROOF dashboard', 'Founders guild'],
    }
  ]

  return (
    <section className="relative px-6 py-16">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-10 text-center">
          <h2 className="mb-3 text-2xl font-bold text-gray-900 sm:text-3xl">
            <span className="bg-gradient-to-r from-[#1DA1F2] to-[#4ECDC4] bg-clip-text text-transparent">$PROOF</span>
            {' '}- Payment Proofs.io
          </h2>
          <p className="mx-auto mb-6 max-w-2xl text-gray-500">
            We make on chain assets spendable. Payroll, Donations, Storage, RWA, Tokenization AAS (As-A-Service)
          </p>
          <a
            href="https://X.com/proofsolana"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block rounded-full border border-transparent bg-white px-6 py-2 text-sm font-medium text-gray-900 shadow-none transition-colors hover:bg-gray-50"
          >
            Updates
          </a>
        </div>

        {/* Tier Cards */}
        <div className="grid gap-5 md:grid-cols-3">
          {tiers.map((tier, index) => (
            <div 
              key={index}
              className="overflow-hidden rounded-2xl border border-transparent bg-white shadow-none"
            >
              {/* Token Amount */}
              <div className="border-b border-gray-100 px-6 py-5">
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold text-gray-900">{tier.tokens}</span>
                  <span className="text-sm text-gray-500">tokens</span>
                </div>
              </div>

              {/* Features List */}
              <div className="px-6 py-5">
                <ul className="space-y-3">
                  {tier.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-3">
                      <svg className="h-4 w-4 shrink-0 text-[#1DA1F2]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <span className="text-sm text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
