import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { createTransactionSchema } from '@/lib/validations/transaction'

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    const body = await request.json()
    
    const validatedData = createTransactionSchema.parse(body)

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // TODO: Integrate with Streamflow API to create escrow
    // const streamflowResponse = await createStreamflowEscrow(validatedData)

    const { data, error } = await supabase
      .from('transactions')
      .insert({
        buyer_wallet: validatedData.buyerWallet,
        seller_wallet: validatedData.sellerWallet,
        amount: validatedData.amount,
        currency: validatedData.currency,
        proof_id: validatedData.proofId || null,
        escrow_status: 'locked',
        streamflow_id: null, // Will be updated when Streamflow integration is complete
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
