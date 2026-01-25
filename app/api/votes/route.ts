import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { voteSchema } from '@/lib/validations/dispute'
import { getSessionWallet } from '@/lib/auth/session'
import { getOrCreateProfileId } from '@/lib/auth/profile'
import { getTokenBalance } from '@/lib/integrations/solana'
import { recordRealmsVote } from '@/lib/integrations/realms'

export async function POST(request: NextRequest) {
  try {
    const supabase = createAdminClient()
    const body = await request.json()
    
    const validatedData = voteSchema.parse(body)
    const sessionWallet = await getSessionWallet()
    if (!sessionWallet) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    if (validatedData.voterWallet !== sessionWallet) {
      return NextResponse.json({ error: 'Voter wallet mismatch' }, { status: 403 })
    }

    await getOrCreateProfileId(sessionWallet)

    // Verify dispute exists and is in voting status
    const { data: dispute } = await supabase
      .from('disputes')
      .select('id, status, realms_proposal_id')
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

    const tokenMint = process.env.NEXT_PUBLIC_PROOF_TOKEN_MINT
    if (!tokenMint) {
      return NextResponse.json({ error: 'Token mint not configured' }, { status: 500 })
    }

    const balance = await getTokenBalance(sessionWallet, tokenMint)
    if (balance < validatedData.tokenAmount) {
      return NextResponse.json({ error: 'Insufficient voting power' }, { status: 403 })
    }

    if (!dispute.realms_proposal_id) {
      return NextResponse.json({ error: 'Dispute is missing governance proposal' }, { status: 409 })
    }

    await recordRealmsVote({
      proposalId: dispute.realms_proposal_id,
      walletAddress: sessionWallet,
      vote: validatedData.vote,
      tokenAmount: validatedData.tokenAmount,
    })

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
