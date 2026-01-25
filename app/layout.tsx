import type { Metadata } from 'next'
import { Inter, Montserrat } from 'next/font/google'
import '@solana/wallet-adapter-react-ui/styles.css'
import './globals.css'
import { GlobalBackground } from '@/components/global-background'
import { WalletAdapterProvider } from '@/components/wallet-provider'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const montserrat = Montserrat({ subsets: ['latin'], variable: '--font-montserrat' })

export const metadata: Metadata = {
  title: 'PROOF | Trustless Escrow Protocol',
  description: 'Secure non-custodial payments for any transaction. Verified on-chain.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${montserrat.variable} font-sans bg-white relative min-h-screen`}>
        <WalletAdapterProvider>
          <GlobalBackground />
          <div className="relative z-10">
            {children}
          </div>
        </WalletAdapterProvider>
      </body>
    </html>
  )
}
