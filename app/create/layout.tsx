import { Header } from '@/components/header'
import { Footer } from '@/components/footer'

export default function CreateLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 pt-24 px-6 pb-12">
        <div className="max-w-3xl mx-auto">
          {children}
        </div>
      </main>
      <Footer />
    </div>
  )
}
