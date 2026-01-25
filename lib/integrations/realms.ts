type RealmsProposalPayload = {
  disputeId: string
  transactionId: string
  reason: string
  buyerWallet: string
  sellerWallet: string
  amount: number
  currency: string
}

type RealmsProposalResponse = {
  id: string
  status?: string
}

type RealmsVotePayload = {
  proposalId: string
  walletAddress: string
  vote: 'buyer' | 'seller'
  tokenAmount: number
}

function getRealmsConfig() {
  const baseUrl = process.env.REALMS_API_URL
  const apiKey = process.env.REALMS_API_KEY
  if (!baseUrl || !apiKey) {
    throw new Error('Realms API configuration is missing')
  }
  return { baseUrl, apiKey }
}

export async function createRealmsProposal(payload: RealmsProposalPayload) {
  const { baseUrl, apiKey } = getRealmsConfig()
  const response = await fetch(`${baseUrl.replace(/\/$/, '')}/proposals`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })

  if (!response.ok) {
    const errorBody = await response.text()
    throw new Error(`Realms proposal failed: ${errorBody || response.statusText}`)
  }

  const data = (await response.json()) as RealmsProposalResponse
  if (!data?.id) {
    throw new Error('Realms proposal response missing id')
  }

  return data
}

export async function recordRealmsVote(payload: RealmsVotePayload) {
  const { baseUrl, apiKey } = getRealmsConfig()
  const response = await fetch(`${baseUrl.replace(/\/$/, '')}/votes`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })

  if (!response.ok) {
    const errorBody = await response.text()
    throw new Error(`Realms vote failed: ${errorBody || response.statusText}`)
  }

  return response.json()
}
