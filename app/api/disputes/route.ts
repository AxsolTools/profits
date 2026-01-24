import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { createDisputeSchema } from '@/lib/validations/dispute'

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    const body = await request.json()
    
    const validatedData = createDisputeSchema.parse(body)

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Verify transaction exists
    const { data: transaction } = await supabase
      .from('transactions')
      .select('id')
      .eq('id', validatedData.transactionId)
      .single()

    if (!transaction) {
      return NextResponse.json(
        { error: 'Transaction not found' },
        { status: 404 }
      )
    }

    // TODO: Create Realms governance proposal
    // const realmsProposal = await createRealmsProposal(validatedData)

    const { data, error } = await supabase
      .from('disputes')
      .insert({
        transaction_id: validatedData.transactionId,
        opened_by: user.id,
        reason: validatedData.reason,
        status: 'open',
        realms_proposal_id: null, // Will be updated when Realms integration is complete
      })
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
