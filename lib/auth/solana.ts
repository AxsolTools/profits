import bs58 from 'bs58'
import nacl from 'tweetnacl'
import { PublicKey } from '@solana/web3.js'

export function buildAuthMessage(nonce: string) {
  return `Proof Authentication\nNonce: ${nonce}`
}

export function verifySolanaSignature({
  message,
  signature,
  walletAddress,
}: {
  message: string
  signature: string
  walletAddress: string
}) {
  const publicKey = new PublicKey(walletAddress)
  const messageBytes = new TextEncoder().encode(message)
  const signatureBytes = bs58.decode(signature)
  return nacl.sign.detached.verify(messageBytes, signatureBytes, publicKey.toBytes())
}
