import { createAdminClient } from '@/lib/supabase/admin'

function walletToEmail(walletAddress: string) {
  return `${walletAddress.toLowerCase()}@wallet.proof`
}

async function findUserIdByEmail(email: string) {
  const supabase = createAdminClient()
  const { data, error } = await supabase.auth.admin.listUsers({
    page: 1,
    perPage: 1000,
  })
  if (error) {
    throw error
  }
  const match = data?.users?.find((user) => user.email?.toLowerCase() === email.toLowerCase())
  return match?.id || null
}

export async function getOrCreateProfileId(walletAddress: string) {
  const supabase = createAdminClient()
  const { data: existing, error: existingError } = await supabase
    .from('profiles')
    .select('id')
    .eq('wallet_address', walletAddress)
    .maybeSingle()

  if (existing && existing.id) {
    return existing.id
  }

  if (existingError) {
    throw existingError
  }

  const email = walletToEmail(walletAddress)
  const { data: userData, error: userError } = await supabase.auth.admin.createUser({
    email,
    email_confirm: true,
    user_metadata: {
      wallet_address: walletAddress,
    },
  })

  let userId = userData?.user?.id
  if (userError || !userId) {
    userId = await findUserIdByEmail(email)
    if (!userId) {
      throw userError || new Error('Failed to create or locate user')
    }
  }

  const { error: profileError } = await supabase
    .from('profiles')
    .upsert({
      id: userId,
      wallet_address: walletAddress,
    })

  if (profileError) {
    throw profileError
  }

  return userId
}
