import { NextRequest, NextResponse } from 'next/server'
import { readNonce, clearNonce } from '@/lib/auth/nonce'
import { buildAuthMessage, verifySolanaSignature } from '@/lib/auth/solana'
import { createSessionToken, setSessionCookie } from '@/lib/auth/session'
import { getOrCreateProfileId } from '@/lib/auth/profile'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const walletAddress = body?.walletAddress as string | undefined
    const signature = body?.signature as string | undefined

    if (!walletAddress || !signature) {
      return NextResponse.json({ error: 'Wallet address and signature are required' }, { status: 400 })
    }

    const nonce = await readNonce()
    if (!nonce) {
      return NextResponse.json({ error: 'Auth nonce expired' }, { status: 401 })
    }

    const message = buildAuthMessage(nonce)
    const isValid = verifySolanaSignature({ message, signature, walletAddress })
    if (!isValid) {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 })
    }

    await clearNonce()
    await getOrCreateProfileId(walletAddress)

    const token = await createSessionToken(walletAddress)
    await setSessionCookie(token)

    return NextResponse.json({ walletAddress })
  } catch (error) {
    console.error('Wallet auth error:', error)
    return NextResponse.json({ error: 'Failed to authenticate wallet' }, { status: 500 })
  }
}
