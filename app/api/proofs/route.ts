import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { createProofSchema, getProofsSchema } from '@/lib/validations/proof'
import { getSessionWallet } from '@/lib/auth/session'
import { getOrCreateProfileId } from '@/lib/auth/profile'

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient()
    const { searchParams } = new URL(request.url)
    
    const query = getProofsSchema.parse({
      page: searchParams.get('page'),
      limit: searchParams.get('limit'),
      status: searchParams.get('status'),
      platform: searchParams.get('platform'),
      featured: searchParams.get('featured'),
    })

    const offset = (query.page - 1) * query.limit

    let dbQuery = supabase
      .from('proofs')
      .select(`
        *,
        platform:platforms(name, slug, icon_url),
        sender:profiles!sender_id(username, wallet_address, avatar_url)
      `, { count: 'exact' })
      .order('created_at', { ascending: false })
      .range(offset, offset + query.limit - 1)

    if (query.status) {
      dbQuery = dbQuery.eq('status', query.status)
    }

    if (query.platform) {
      dbQuery = dbQuery.eq('platforms.slug', query.platform)
    }

    if (query.featured !== undefined) {
      dbQuery = dbQuery.eq('featured', query.featured)
    }

    const { data, error, count } = await dbQuery

    if (error) {
      console.error('Error fetching proofs:', error)
      return NextResponse.json(
        { error: 'Failed to fetch proofs' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      proofs: data,
      pagination: {
        page: query.page,
        limit: query.limit,
        total: count || 0,
        totalPages: Math.ceil((count || 0) / query.limit),
      },
    })
  } catch (error) {
    console.error('Proofs GET error:', error)
    return NextResponse.json(
      { error: 'Invalid request parameters' },
      { status: 400 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = createAdminClient()
    const body = await request.json()
    
    const validatedData = createProofSchema.parse(body)

    const sessionWallet = await getSessionWallet()
    if (!sessionWallet) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    const profileId = await getOrCreateProfileId(sessionWallet)

    const { data, error } = await supabase
      .from('proofs')
      .insert({
        sender_id: profileId,
        recipient: validatedData.recipient,
        amount: validatedData.amount,
        currency: validatedData.currency,
        platform_id: validatedData.platformId,
        campaign_name: validatedData.campaignName,
        tx_hash: validatedData.txHash,
        block_number: validatedData.blockNumber,
        chain: validatedData.chain,
        status: 'pending',
        metadata: validatedData.metadata || null,
      })
      .select()
      .single()

    if (error) {
      console.error('Error creating proof:', error)
      return NextResponse.json(
        { error: 'Failed to create proof' },
        { status: 500 }
      )
    }

    return NextResponse.json({ proof: data }, { status: 201 })
  } catch (error) {
    console.error('Proofs POST error:', error)
    return NextResponse.json(
      { error: 'Invalid request data' },
      { status: 400 }
    )
  }
}
