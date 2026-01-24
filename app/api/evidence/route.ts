import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    const formData = await request.formData()
    
    const transactionId = formData.get('transactionId') as string
    const description = formData.get('description') as string
    const file = formData.get('file') as File

    if (!transactionId || !file) {
      return NextResponse.json(
        { error: 'Transaction ID and file are required' },
        { status: 400 }
      )
    }

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Upload file to Supabase Storage
    const fileName = `${transactionId}/${Date.now()}-${file.name}`
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('evidence')
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: false,
      })

    if (uploadError) {
      console.error('Error uploading file:', uploadError)
      return NextResponse.json(
        { error: 'Failed to upload file' },
        { status: 500 }
      )
    }

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('evidence')
      .getPublicUrl(uploadData.path)

    // Create evidence record
    const { data, error } = await supabase
      .from('evidence')
      .insert({
        transaction_id: transactionId,
        uploaded_by: user.id,
        file_url: publicUrl,
        file_type: file.type,
        description: description || null,
      })
      .select()
      .single()

    if (error) {
      console.error('Error creating evidence record:', error)
      return NextResponse.json(
        { error: 'Failed to create evidence record' },
        { status: 500 }
      )
    }

    return NextResponse.json({ evidence: data }, { status: 201 })
  } catch (error) {
    console.error('Evidence POST error:', error)
    return NextResponse.json(
      { error: 'Invalid request data' },
      { status: 400 }
    )
  }
}
