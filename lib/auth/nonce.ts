import { cookies } from 'next/headers'
import { randomBytes } from 'crypto'

const NONCE_COOKIE = 'proof_nonce'

export async function issueNonce() {
  const nonce = randomBytes(16).toString('hex')
  const cookieStore = await cookies()
  cookieStore.set(NONCE_COOKIE, nonce, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 5,
    path: '/',
  })
  return nonce
}

export async function readNonce() {
  const cookieStore = await cookies()
  return cookieStore.get(NONCE_COOKIE)?.value || null
}

export async function clearNonce() {
  const cookieStore = await cookies()
  cookieStore.set(NONCE_COOKIE, '', {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 0,
    path: '/',
  })
}
