import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { voteSchema } from '@/lib/validations/dispute'

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    const body = await request.json()
    
    const validatedData = voteSchema.parse(body)

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Verify dispute exists and is in voting status
    const { data: dispute } = await supabase
      .from('disputes')
      .select('id, status')
      .eq('id', validatedData.disputeId)
      .single()

    if (!dispute || dispute.status !== 'voting') {
      return NextResponse.json(
        { error: 'Dispute not available for voting' },
        { status: 400 }
      )
    }

    // Check if user already voted
    const { data: existingVote } = await supabase
      .from('votes')
      .select('id')
      .eq('dispute_id', validatedData.disputeId)
      .eq('voter_wallet', validatedData.voterWallet)
      .single()

    if (existingVote) {
      return NextResponse.json(
        { error: 'Already voted on this dispute' },
        { status: 400 }
      )
    }

    // TODO: Verify token holdings with Realms/Solana
    // const hasTokens = await verifyTokenHoldings(validatedData.voterWallet, validatedData.tokenAmount)

    const { data, error } = await supabase
      .from('votes')
      .insert({
        dispute_id: validatedData.disputeId,
        voter_wallet: validatedData.voterWallet,
        vote: validatedData.vote,
        token_amount: validatedData.tokenAmount,
      })
      .select()
      .single()

    if (error) {
      console.error('Error recording vote:', error)
      return NextResponse.json(
        { error: 'Failed to record vote' },
        { status: 500 }
      )
    }

    return NextResponse.json({ vote: data }, { status: 201 })
  } catch (error) {
    console.error('Votes POST error:', error)
    return NextResponse.json(
      { error: 'Invalid request data' },
      { status: 400 }
    )
  }
}
