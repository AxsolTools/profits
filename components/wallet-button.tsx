'use client'

import { useEffect, useMemo, useState } from 'react'
import bs58 from 'bs58'
import { useWallet } from '@solana/wallet-adapter-react'
import { useWalletModal } from '@solana/wallet-adapter-react-ui'
import { Button } from '@/components/ui/button'
import { buildAuthMessage } from '@/lib/auth/solana'

function formatWallet(wallet: string) {
  return `${wallet.slice(0, 4)}...${wallet.slice(-4)}`
}

export function WalletButton() {
  const { publicKey, connected, signMessage, disconnect } = useWallet()
  const { setVisible } = useWalletModal()
  const [sessionWallet, setSessionWallet] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const walletAddress = useMemo(() => publicKey?.toBase58() || null, [publicKey])

  const refreshSession = async () => {
    const response = await fetch('/api/auth/me')
    const data = await response.json()
    setSessionWallet(data.wallet)
  }

  useEffect(() => {
    refreshSession()
  }, [])

  useEffect(() => {
    if (!connected) {
      setSessionWallet(null)
    }
  }, [connected])

  const authenticate = async () => {
    if (!walletAddress || !signMessage) return
    setLoading(true)
    try {
      const nonceResponse = await fetch('/api/auth/nonce')
      const { nonce } = await nonceResponse.json()
      const message = buildAuthMessage(nonce)
      const signatureBytes = await signMessage(new TextEncoder().encode(message))
      const signature = bs58.encode(signatureBytes)

      const authResponse = await fetch('/api/auth/wallet', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ walletAddress, signature }),
      })

      if (!authResponse.ok) {
        throw new Error('Wallet authentication failed')
      }

      await refreshSession()
    } finally {
      setLoading(false)
    }
  }

  if (!connected) {
    return (
      <Button
        className="h-12 px-6 rounded-full bg-gray-900 hover:bg-black text-white text-base font-bold shadow-lg shadow-gray-200 hover:shadow-xl transition-all"
        onClick={() => setVisible(true)}
      >
        Connect Wallet
      </Button>
    )
  }

  if (walletAddress && sessionWallet !== walletAddress) {
    return (
      <Button
        className="h-12 px-6 rounded-full bg-[var(--proof-primary)] hover:bg-[var(--proof-primary-hover)] text-white text-base font-bold shadow-lg shadow-[var(--proof-primary)]/20 transition-all"
        onClick={authenticate}
        disabled={loading || !signMessage}
      >
        {loading ? 'Verifying...' : signMessage ? 'Verify Wallet' : 'Wallet Not Supported'}
      </Button>
    )
  }

  return (
    <Button
      variant="outline"
      className="h-12 px-6 rounded-full border-gray-200 bg-white/80 text-gray-900 text-base font-bold hover:bg-white"
      onClick={() => setVisible(true)}
      onContextMenu={(event) => {
        event.preventDefault()
        disconnect().catch(() => undefined)
      }}
    >
      {walletAddress ? formatWallet(walletAddress) : 'Wallet Connected'}
    </Button>
  )
}
