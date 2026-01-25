import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const supabase = createAdminClient()
    const { id } = await params

    const { data, error } = await supabase
      .from('disputes')
      .select('*, transactions(*, evidence(*)), votes(*)')
      .eq('id', id)
      .single()

    if (error || !data) {
      return NextResponse.json({ error: 'Dispute not found' }, { status: 404 })
    }

    const evidence = data?.transactions?.evidence || []
    return NextResponse.json({ dispute: { ...data, evidence } })
  } catch (error) {
    console.error('Dispute GET error:', error)
    return NextResponse.json({ error: 'Failed to fetch dispute' }, { status: 500 })
  }
}
