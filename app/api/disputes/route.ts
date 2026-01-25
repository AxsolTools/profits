import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { createDisputeSchema } from '@/lib/validations/dispute'
import { getSessionWallet } from '@/lib/auth/session'
import { getOrCreateProfileId } from '@/lib/auth/profile'
import { createRealmsProposal } from '@/lib/integrations/realms'

export async function POST(request: NextRequest) {
  try {
    const supabase = createAdminClient()
    const body = await request.json()
    
    const validatedData = createDisputeSchema.parse(body)
    const sessionWallet = await getSessionWallet()
    if (!sessionWallet) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const profileId = await getOrCreateProfileId(sessionWallet)

    // Verify transaction exists
    const { data: transaction } = await supabase
      .from('transactions')
      .select('id, buyer_wallet, seller_wallet, amount, currency')
      .eq('id', validatedData.transactionId)
      .single()

    if (!transaction) {
      return NextResponse.json(
        { error: 'Transaction not found' },
        { status: 404 }
      )
    }
    if (![transaction.buyer_wallet, transaction.seller_wallet].includes(sessionWallet)) {
      return NextResponse.json({ error: 'Not authorized for this transaction' }, { status: 403 })
    }

    const { data: createdDispute, error: disputeError } = await supabase
      .from('disputes')
      .insert({
        transaction_id: validatedData.transactionId,
        opened_by: profileId,
        reason: validatedData.reason,
        status: 'open',
      })
      .select()
      .single()

    if (disputeError || !createdDispute) {
      console.error('Error creating dispute:', disputeError)
      return NextResponse.json({ error: 'Failed to create dispute' }, { status: 500 })
    }

    const realmsProposal = await createRealmsProposal({
      disputeId: createdDispute.id,
      transactionId: validatedData.transactionId,
      reason: validatedData.reason,
      buyerWallet: transaction.buyer_wallet,
      sellerWallet: transaction.seller_wallet,
      amount: Number(transaction.amount),
      currency: transaction.currency,
    })

    const { data, error } = await supabase
      .from('disputes')
      .update({
        status: 'voting',
        realms_proposal_id: realmsProposal.id,
      })
      .eq('id', createdDispute.id)
      .select()
      .single()

    if (error) {
      console.error('Error creating dispute:', error)
      return NextResponse.json(
        { error: 'Failed to create dispute' },
        { status: 500 }
      )
    }

    return NextResponse.json({ dispute: data }, { status: 201 })
  } catch (error) {
    console.error('Disputes POST error:', error)
    return NextResponse.json(
      { error: 'Invalid request data' },
      { status: 400 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const supabase = createAdminClient()
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const limit = Number(searchParams.get('limit') || 20)

    let query = supabase
      .from('disputes')
      .select('*, transactions(amount, currency, buyer_wallet, seller_wallet, title, category), votes(vote, token_amount)')
      .order('created_at', { ascending: false })
      .limit(limit)

    if (status) {
      query = query.eq('status', status)
    }

    const { data, error } = await query
    if (error) {
      console.error('Disputes GET error:', error)
      return NextResponse.json({ error: 'Failed to fetch disputes' }, { status: 500 })
    }

    const disputes = (data || []).map((dispute: any) => {
      const votes = dispute.votes || []
      const totals = votes.reduce(
        (acc: { buyer: number; seller: number }, vote: any) => {
          if (vote.vote === 'buyer') acc.buyer += Number(vote.token_amount || 0)
          if (vote.vote === 'seller') acc.seller += Number(vote.token_amount || 0)
          return acc
        },
        { buyer: 0, seller: 0 }
      )

      return {
        ...dispute,
        votes_for_buyer: totals.buyer,
        votes_for_seller: totals.seller,
      }
    })

    return NextResponse.json({ disputes })
  } catch (error) {
    console.error('Disputes GET error:', error)
    return NextResponse.json({ error: 'Failed to fetch disputes' }, { status: 500 })
  }
}
