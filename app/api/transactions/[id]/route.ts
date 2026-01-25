import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { getSessionWallet } from '@/lib/auth/session'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const supabase = createAdminClient()
    const sessionWallet = await getSessionWallet()
    if (!sessionWallet) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await params
    const { data, error } = await supabase
      .from('transactions')
      .select('*, disputes(*), evidence(*)')
      .eq('id', id)
      .single()

    if (error || !data) {
      return NextResponse.json({ error: 'Transaction not found' }, { status: 404 })
    }

    if (![data.buyer_wallet, data.seller_wallet].includes(sessionWallet)) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    return NextResponse.json({ transaction: data })
  } catch (error) {
    console.error('Transaction GET error:', error)
    return NextResponse.json({ error: 'Failed to fetch transaction' }, { status: 500 })
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const supabase = createAdminClient()
    const sessionWallet = await getSessionWallet()
    if (!sessionWallet) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await params
    const body = await request.json()
    const status = body?.status as string | undefined

    if (!status || !['released', 'refunded'].includes(status)) {
      return NextResponse.json({ error: 'Invalid status update' }, { status: 400 })
    }

    const { data: transaction } = await supabase
      .from('transactions')
      .select('id, buyer_wallet, seller_wallet')
      .eq('id', id)
      .single()

    if (!transaction) {
      return NextResponse.json({ error: 'Transaction not found' }, { status: 404 })
    }

    if (status === 'released' && transaction.seller_wallet !== sessionWallet) {
      return NextResponse.json({ error: 'Only seller can release' }, { status: 403 })
    }
    if (status === 'refunded' && transaction.buyer_wallet !== sessionWallet) {
      return NextResponse.json({ error: 'Only buyer can refund' }, { status: 403 })
    }

    const { data, error } = await supabase
      .from('transactions')
      .update({
        escrow_status: status,
        released_at: status === 'released' ? new Date().toISOString() : null,
      })
      .eq('id', id)
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: 'Failed to update transaction' }, { status: 500 })
    }

    return NextResponse.json({ transaction: data })
  } catch (error) {
    console.error('Transaction PATCH error:', error)
    return NextResponse.json({ error: 'Failed to update transaction' }, { status: 500 })
  }
}
