import { NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { getRealmsProposal } from '@/lib/integrations/realms'

function normalizeResolution(value?: string | null) {
  if (!value) return null
  const normalized = value.toLowerCase()
  if (normalized.includes('buyer') || normalized.includes('refund')) return 'buyer'
  if (normalized.includes('seller') || normalized.includes('release')) return 'seller'
  return null
}

function inferResolutionFromVotes(proposal: any) {
  const buyerVotes = Number(proposal?.votes?.buyer || proposal?.votes?.refund || 0)
  const sellerVotes = Number(proposal?.votes?.seller || proposal?.votes?.release || 0)
  if (buyerVotes === sellerVotes) return null
  return buyerVotes > sellerVotes ? 'buyer' : 'seller'
}

function isProposalResolved(proposal: any) {
  const status = String(proposal?.status || '').toLowerCase()
  return ['resolved', 'executed', 'succeeded', 'completed', 'finalized'].includes(status)
}

export async function POST(request: Request) {
  const secret = process.env.REALMS_SYNC_SECRET
  if (secret) {
    const provided = request.headers.get('x-realms-sync-secret')
    if (provided !== secret) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
  }

  const supabase = createAdminClient()
  const { data: disputes, error } = await supabase
    .from('disputes')
    .select('id, realms_proposal_id, status')
    .eq('status', 'voting')
    .not('realms_proposal_id', 'is', null)

  if (error) {
    return NextResponse.json({ error: 'Failed to fetch disputes' }, { status: 500 })
  }

  const updates = []
  for (const dispute of disputes || []) {
    if (!dispute.realms_proposal_id) continue
    const proposal = await getRealmsProposal(dispute.realms_proposal_id)
    if (!isProposalResolved(proposal)) continue

    const resolution =
      normalizeResolution(proposal?.resolution) ||
      normalizeResolution(proposal?.result) ||
      normalizeResolution(proposal?.winner) ||
      inferResolutionFromVotes(proposal)

    if (!resolution) continue

    updates.push({
      id: dispute.id,
      status: 'resolved',
      resolution,
      resolved_at: new Date().toISOString(),
    })
  }

  if (updates.length === 0) {
    return NextResponse.json({ updated: 0 })
  }

  const { error: updateError } = await supabase
    .from('disputes')
    .upsert(updates)

  if (updateError) {
    return NextResponse.json({ error: 'Failed to update disputes' }, { status: 500 })
  }

  return NextResponse.json({ updated: updates.length })
}
