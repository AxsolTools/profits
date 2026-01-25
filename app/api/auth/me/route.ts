import { NextResponse } from 'next/server'
import { getSessionWallet } from '@/lib/auth/session'

export async function GET() {
  const wallet = await getSessionWallet()
  if (!wallet) {
    return NextResponse.json({ wallet: null }, { status: 200 })
  }
  return NextResponse.json({ wallet })
}
