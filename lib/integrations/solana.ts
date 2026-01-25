import { Connection, PublicKey } from '@solana/web3.js'

function getRpcEndpoint() {
  return process.env.NEXT_PUBLIC_SOLANA_RPC_URL || 'https://api.mainnet-beta.solana.com'
}

export async function getTokenBalance(walletAddress: string, mintAddress: string) {
  const connection = new Connection(getRpcEndpoint())
  const owner = new PublicKey(walletAddress)
  const mint = new PublicKey(mintAddress)

  const accounts = await connection.getParsedTokenAccountsByOwner(owner, { mint })
  return accounts.value.reduce((total, account) => {
    const amount = account.account.data.parsed.info.tokenAmount.uiAmount || 0
    return total + amount
  }, 0)
}
