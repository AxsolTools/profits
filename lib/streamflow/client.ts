import { StreamflowSolana } from '@streamflow/stream'

export function getStreamflowClient() {
  return new StreamflowSolana.SolanaStreamClient(
    process.env.NEXT_PUBLIC_SOLANA_RPC_URL || 'https://api.mainnet-beta.solana.com'
  )
}
