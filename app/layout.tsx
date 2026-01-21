import React from "react"
import type { Metadata, Viewport } from 'next'
import { Inter, Montserrat } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter'
});

const montserrat = Montserrat({ 
  subsets: ["latin"],
  weight: ['900'],
  variable: '--font-montserrat'
});

export const metadata: Metadata = {
  title: '$PROOF - Payment Proofs | Verify Donations & Spend On-Chain',
  description: 'Verify donations, spend, and CAPEX for your favorite projects with Payment Proofs. For the 98% of creators who don\'t use crypto.',
  generator: 'Payment Proofs',
  icons: {
    icon: '/icon.png',
    apple: '/apple-icon.png',
  },
  openGraph: {
    title: '$PROOF - Payment Proofs',
    description: 'Verify Projects Spend, On-Chain',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '$PROOF - Payment Proofs',
    description: 'Verify Projects Spend, On-Chain',
  },
}

export const viewport: Viewport = {
  themeColor: '#0a0e1a',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${montserrat.variable} font-sans antialiased text-foreground bg-background`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
