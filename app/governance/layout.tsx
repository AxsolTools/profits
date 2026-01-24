import { Header } from '@/components/header'
import { Footer } from '@/components/footer'

export default function GovernanceLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-28 px-4 sm:px-6 pb-12">
        <div className="max-w-7xl mx-auto w-full">
          {children}
        </div>
      </main>
      <Footer />
    </div>
  )
}
