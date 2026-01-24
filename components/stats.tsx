'use client'

import { useProofStats } from '@/hooks/use-proofs'

export function Stats() {
  const { data, loading } = useProofStats()

  const stats = [
    { value: "$600 TRILLION", label: "In global assets yet to be tokenized and $PROOF'd" },
    { value: "$60 TRILLION", label: "In annual payroll yet to be brought on chain and $PROOF'd" },
    { value: "$62 TRILLION", label: "In yearly merchant processing yet to be on chain and $PROOF'd" },
    { value: "100% Backed", label: "By $PROOF Protocol" },
  ]

  return (
    <section className="relative px-6 py-16">
      <div className="mx-auto max-w-6xl">
        <div className="overflow-hidden rounded-3xl border border-gray-200 bg-gradient-to-br from-[var(--proof-primary)]/5 via-white to-[var(--proof-accent)]/5 p-1 shadow-lg">
          <div className="rounded-[22px] bg-white px-8 py-12">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="mb-2 text-4xl font-bold leading-tight text-gray-900 sm:text-5xl">
                    {loading && index === 0 ? '...' : stat.value}
                  </div>
                  <div className="mx-auto max-w-[18rem] text-sm font-medium leading-snug uppercase tracking-wider text-gray-500">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
