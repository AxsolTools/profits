import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { createVerificationRequestSchema } from '@/lib/validations/verification-request'

export async function POST(request: NextRequest) {
  try {
    const supabase = createAdminClient()
    const body = await request.json()
    
    const validatedData = createVerificationRequestSchema.parse(body)

    const { data, error } = await supabase
      .from('verification_requests')
      .insert({
        token_holdings: validatedData.tokenHoldings,
        telegram_username: validatedData.telegramUsername,
        service: validatedData.service,
        description: validatedData.description,
        status: 'pending',
      })
      .select()
      .single()

    if (error) {
      console.error('Error creating verification request:', error)
      return NextResponse.json(
        { error: 'Failed to submit verification request' },
        { status: 500 }
      )
    }

    return NextResponse.json({ request: data }, { status: 201 })
  } catch (error) {
    console.error('Verification request POST error:', error)
    return NextResponse.json(
      { error: 'Invalid request data' },
      { status: 400 }
    )
  }
}
