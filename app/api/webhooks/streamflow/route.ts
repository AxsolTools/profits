import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { headers } from 'next/headers'

export async function POST(request: NextRequest) {
  try {
    const headersList = await headers()
    const signature = headersList.get('x-streamflow-signature')
    const body = await request.text()

    // TODO: Verify webhook signature
    const secret = process.env.WEBHOOK_SECRET
    if (!signature || !secret) {
      return NextResponse.json(
        { error: 'Invalid webhook signature' },
        { status: 401 }
      )
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
