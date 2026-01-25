import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { createHmac, timingSafeEqual } from 'crypto'

function normalizeResolution(value?: string | null) {
  if (!value) return null
  const normalized = value.toLowerCase()
  if (normalized.includes('buyer') || normalized.includes('refund')) return 'buyer'
  if (normalized.includes('seller') || normalized.includes('release')) return 'seller'
  return null
}

export async function POST(request: NextRequest) {
  try {
    const secret = process.env.REALMS_WEBHOOK_SECRET
    const signature = request.headers.get('x-realms-signature')
    const body = await request.text()

    if (!secret || !signature) {
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
    const proposalId = payload?.proposalId || payload?.proposal_id
    const status = String(payload?.status || '')
    const resolution =
      normalizeResolution(payload?.resolution) ||
      normalizeResolution(payload?.result) ||
      normalizeResolution(payload?.winner)

    if (!proposalId || !resolution) {
      return NextResponse.json({ error: 'Missing proposal or resolution' }, { status: 400 })
    }

    const supabase = createAdminClient()
    const { data, error } = await supabase
      .from('disputes')
      .update({
        status: 'resolved',
        resolution,
        resolved_at: new Date().toISOString(),
      })
      .eq('realms_proposal_id', proposalId)
      .select()
      .single()

    if (error) {
      console.error('Realms webhook update error:', error)
      return NextResponse.json({ error: 'Failed to update dispute' }, { status: 500 })
    }

    return NextResponse.json({ dispute: data, status })
  } catch (error) {
    console.error('Realms webhook error:', error)
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 })
  }
}
