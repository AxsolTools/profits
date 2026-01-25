import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { createTransactionSchema } from '@/lib/validations/transaction'
import { getSessionWallet } from '@/lib/auth/session'
import { getOrCreateProfileId } from '@/lib/auth/profile'

export async function POST(request: NextRequest) {
  try {
    const supabase = createAdminClient()
    const body = await request.json()
    
    const validatedData = createTransactionSchema.parse(body)
    const sessionWallet = await getSessionWallet()
    if (!sessionWallet) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    if (validatedData.buyerWallet !== sessionWallet) {
      return NextResponse.json({ error: 'Buyer wallet mismatch' }, { status: 403 })
    }

    await getOrCreateProfileId(sessionWallet)


    const { data, error } = await supabase
      .from('transactions')
      .insert({
        buyer_wallet: validatedData.buyerWallet,
        seller_wallet: validatedData.sellerWallet,
        amount: validatedData.amount,
        currency: validatedData.currency,
        proof_id: validatedData.proofId || null,
        category: validatedData.category,
        title: validatedData.title,
        metadata: validatedData.metadata || null,
        escrow_status: 'locked',
        streamflow_id: validatedData.streamflowId,
      })
      .select()
      .single()

    if (error) {
      console.error('Error creating transaction:', error)
      return NextResponse.json(
        { error: 'Failed to create transaction' },
        { status: 500 }
      )
    }

    return NextResponse.json({ transaction: data }, { status: 201 })
  } catch (error) {
    console.error('Transactions POST error:', error)
    return NextResponse.json(
      { error: 'Invalid request data' },
      { status: 400 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const supabase = createAdminClient()
    const sessionWallet = await getSessionWallet()
    if (!sessionWallet) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const limit = Number(searchParams.get('limit') || 20)

    let query = supabase
      .from('transactions')
      .select('*, disputes(id, status, resolution)')
      .or(`buyer_wallet.eq.${sessionWallet},seller_wallet.eq.${sessionWallet}`)
      .order('created_at', { ascending: false })
      .limit(limit)

    if (status) {
      query = query.eq('escrow_status', status)
    }

    const { data, error } = await query

    if (error) {
      console.error('Transactions GET error:', error)
      return NextResponse.json({ error: 'Failed to fetch transactions' }, { status: 500 })
    }

    return NextResponse.json({ transactions: data })
  } catch (error) {
    console.error('Transactions GET error:', error)
    return NextResponse.json({ error: 'Failed to fetch transactions' }, { status: 500 })
  }
}
