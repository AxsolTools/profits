import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ address: string }> }
) {
  try {
    const supabase = createAdminClient()
    const { address } = await params

    const { data: transactions, error: txError } = await supabase
      .from('transactions')
      .select('id, amount, escrow_status, created_at, buyer_wallet, seller_wallet, category, title')
      .or(`buyer_wallet.eq.${address},seller_wallet.eq.${address}`)
      .order('created_at', { ascending: false })

    if (txError) {
      return NextResponse.json({ error: 'Failed to fetch transactions' }, { status: 500 })
    }

    const totalTx = transactions?.length || 0
    const totalVolume = (transactions || []).reduce((sum, tx) => sum + Number(tx.amount || 0), 0)
    const successfulTx = (transactions || []).filter((tx) => tx.escrow_status === 'released').length

    const { data: disputes } = await supabase
      .from('disputes')
      .select('id, transaction_id')
      .in('transaction_id', (transactions || []).map((tx) => tx.id))

    const disputeCount = disputes?.length || 0
    const disputeRate = totalTx ? (disputeCount / totalTx) * 100 : 0

    return NextResponse.json({
      profile: {
        walletAddress: address,
        totalVolume,
        successfulTx,
        disputeRate,
      },
      history: transactions || [],
    })
  } catch (error) {
    console.error('Profile GET error:', error)
    return NextResponse.json({ error: 'Failed to fetch profile' }, { status: 500 })
  }
}
