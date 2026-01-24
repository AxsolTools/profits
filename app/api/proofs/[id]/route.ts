import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const supabase = await createClient()
    const { id } = await params

    const { data, error } = await supabase
      .from('proofs')
      .select(`
        *,
        platform:platforms(name, slug, icon_url),
        sender:profiles!sender_id(username, wallet_address, avatar_url)
      `)
      .eq('id', id)
      .single()

    if (error) {
      console.error('Error fetching proof:', error)
      return NextResponse.json(
        { error: 'Proof not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ proof: data })
  } catch (error) {
    console.error('Proof GET error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch proof' },
      { status: 500 }
    )
  }
}
