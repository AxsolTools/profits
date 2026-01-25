import { SolanaStreamClient } from '@streamflow/stream'

export function getStreamflowClient() {
  return new SolanaStreamClient(
    process.env.NEXT_PUBLIC_SOLANA_RPC_URL || 'https://api.mainnet-beta.solana.com'
  )
}
