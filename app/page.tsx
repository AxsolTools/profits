import { Header } from '@/components/header'
import { Hero } from '@/components/hero'
import { ProofTiers } from '@/components/proof-tiers'
import { Stats } from '@/components/stats'
import { Features } from '@/components/features'
import { HowItWorks } from '@/components/how-it-works'
import { ProofExamples } from '@/components/proof-examples'
import { TweetCarousel } from '@/components/tweet-carousel'
import { LiveProofsFeed } from '@/components/live-proofs-feed'
import { CTASection } from '@/components/cta-section'
import { Footer } from '@/components/footer'

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-background">
      <Header />
      <Hero />
      <ProofTiers />
      <Stats />
      <ProofExamples />
      <TweetCarousel />
      <LiveProofsFeed />
      <Features />
      <HowItWorks />
      <CTASection />
      <Footer />
    </main>
  )
}
