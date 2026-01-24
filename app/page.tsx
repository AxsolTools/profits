import { Header } from '@/components/header'
import { Hero } from '@/components/hero'
import { HowItWorks } from '@/components/how-it-works'
import { UseCaseMatrix } from '@/components/use-case-matrix'
import { UserRoleTabs } from '@/components/user-role-tabs'
import { ProtocolEconomy } from '@/components/protocol-economy'
import { TechSpecs } from '@/components/tech-specs'
import { CTASection } from '@/components/cta-section'
import { Footer } from '@/components/footer'

export default function Home() {
  return (
    <>
      <Header />
      <main className="relative min-h-screen overflow-hidden bg-background">
        <Hero />
        <UserRoleTabs />
        <HowItWorks />
        <TechSpecs />
        <UseCaseMatrix />
        <ProtocolEconomy />
        <CTASection />
      </main>
      <Footer />
    </>
  )
}
