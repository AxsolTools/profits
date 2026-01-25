import { SignJWT, jwtVerify } from 'jose'
import { cookies } from 'next/headers'

const SESSION_COOKIE = 'proof_session'
const SESSION_TTL_SECONDS = 60 * 60 * 24 * 7

function getJwtSecret() {
  const secret = process.env.AUTH_JWT_SECRET
  if (!secret) {
    throw new Error('AUTH_JWT_SECRET is not set')
  }
  return new TextEncoder().encode(secret)
}

export async function createSessionToken(walletAddress: string) {
  const secret = getJwtSecret()
  return new SignJWT({ wallet: walletAddress })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_TTL_SECONDS}s`)
    .sign(secret)
}

export async function verifySessionToken(token: string) {
  const secret = getJwtSecret()
  const { payload } = await jwtVerify(token, secret)
  const wallet = payload.wallet
  if (typeof wallet !== 'string' || !wallet) {
    return null
  }
  return wallet
}

export async function getSessionWallet() {
  const cookieStore = await cookies()
  const token = cookieStore.get(SESSION_COOKIE)?.value
  if (!token) return null
  try {
    return await verifySessionToken(token)
  } catch {
    return null
  }
}

export async function setSessionCookie(token: string) {
  const cookieStore = await cookies()
  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    maxAge: SESSION_TTL_SECONDS,
    path: '/',
  })
}

export async function clearSessionCookie() {
  const cookieStore = await cookies()
  cookieStore.set(SESSION_COOKIE, '', {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 0,
    path: '/',
  })
}
