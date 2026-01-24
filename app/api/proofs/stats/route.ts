import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET() {
  try {
    const supabase = await createClient()

    // Get total verified proofs
    const { count: totalProofs } = await supabase
      .from('proofs')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'verified')

    // Get total verified amount
    const { data: amountData } = await supabase
      .from('proofs')
      .select('amount')
      .eq('status', 'verified')

    const totalAmount = amountData?.reduce((sum, proof) => sum + proof.amount, 0) || 0

    // Get platform count
    const { count: platformCount } = await supabase
      .from('platforms')
      .select('*', { count: 'exact', head: true })

    return NextResponse.json({
      totalProofs: totalProofs || 0,
      totalAmount,
      platformCount: platformCount || 0,
      onChainVerification: 100,
    })
  } catch (error) {
    console.error('Stats GET error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch stats' },
      { status: 500 }
    )
  }
}
