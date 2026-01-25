import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { headers } from 'next/headers'
import { createHmac, timingSafeEqual } from 'crypto'

export async function POST(request: NextRequest) {
  try {
    const headersList = await headers()
    const signature = headersList.get('x-streamflow-signature')
    const body = await request.text()

    const secret = process.env.STREAMFLOW_WEBHOOK_SECRET
    if (!signature || !secret) {
      return NextResponse.json({ error: 'Invalid webhook signature' }, { status: 401 })
    }

    const expected = createHmac('sha256', secret).update(body).digest('hex')
    const signatureBuffer = Buffer.from(signature, 'hex')
    const expectedBuffer = Buffer.from(expected, 'hex')

    if (
      signatureBuffer.length !== expectedBuffer.length ||
      !timingSafeEqual(signatureBuffer, expectedBuffer)
    ) {
      return NextResponse.json({ error: 'Invalid webhook signature' }, { status: 401 })
    }

    const payload = JSON.parse(body)
    const supabase = createAdminClient()

    // Handle escrow status updates
    if (payload.event === 'escrow.released') {
      await supabase
        .from('transactions')
        .update({
          escrow_status: 'released',
          released_at: new Date().toISOString(),
        })
        .eq('streamflow_id', payload.data.escrowId)
    } else if (payload.event === 'escrow.refunded') {
      await supabase
        .from('transactions')
        .update({
          escrow_status: 'refunded',
        })
        .eq('streamflow_id', payload.data.escrowId)
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    )
  }
}
