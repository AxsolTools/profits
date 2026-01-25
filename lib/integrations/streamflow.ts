type StreamflowEscrowPayload = {
  buyerWallet: string
  sellerWallet: string
  amount: number
  currency: string
  metadata?: Record<string, unknown>
}

type StreamflowEscrowResponse = {
  id: string
  status?: string
}

function getStreamflowConfig() {
  const baseUrl = process.env.STREAMFLOW_API_URL
  const apiKey = process.env.STREAMFLOW_API_KEY
  if (!baseUrl || !apiKey) {
    throw new Error('Streamflow API configuration is missing')
  }
  return { baseUrl, apiKey }
}

export async function createStreamflowEscrow(payload: StreamflowEscrowPayload) {
  const { baseUrl, apiKey } = getStreamflowConfig()
  const response = await fetch(`${baseUrl.replace(/\/$/, '')}/escrows`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })

  if (!response.ok) {
    const errorBody = await response.text()
    throw new Error(`Streamflow escrow failed: ${errorBody || response.statusText}`)
  }

  const data = (await response.json()) as StreamflowEscrowResponse
  if (!data?.id) {
    throw new Error('Streamflow escrow response missing id')
  }

  return data
}
