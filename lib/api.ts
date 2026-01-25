import type { GetProofsQuery } from './validations/proof'

export class APIError extends Error {
  constructor(public status: number, message: string) {
    super(message)
    this.name = 'APIError'
  }
}

async function fetchAPI<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const response = await fetch(endpoint, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  })

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Request failed' }))
    throw new APIError(response.status, error.error || 'Request failed')
  }

  return response.json()
}

export const api = {
  proofs: {
    list: (query?: Partial<GetProofsQuery>) => {
      const params = new URLSearchParams()
      if (query?.page) params.set('page', query.page.toString())
      if (query?.limit) params.set('limit', query.limit.toString())
      if (query?.status) params.set('status', query.status)
      if (query?.platform) params.set('platform', query.platform)
      if (query?.featured !== undefined) params.set('featured', query.featured.toString())
      
      return fetchAPI<any>(`/api/proofs?${params.toString()}`)
    },
    get: (id: string) => fetchAPI<any>(`/api/proofs/${id}`),
    stats: () => fetchAPI<any>('/api/proofs/stats'),
  },
  transactions: {
    list: (query?: { status?: string; limit?: number }) => {
      const params = new URLSearchParams()
      if (query?.status) params.set('status', query.status)
      if (query?.limit) params.set('limit', query.limit.toString())
      return fetchAPI<any>(`/api/transactions?${params.toString()}`)
    },
    get: (id: string) => fetchAPI<any>(`/api/transactions/${id}`),
    create: (data: any) =>
      fetchAPI<any>('/api/transactions', {
        method: 'POST',
        body: JSON.stringify(data),
      }),
  },
  disputes: {
    list: (query?: { status?: string; limit?: number }) => {
      const params = new URLSearchParams()
      if (query?.status) params.set('status', query.status)
      if (query?.limit) params.set('limit', query.limit.toString())
      return fetchAPI<any>(`/api/disputes?${params.toString()}`)
    },
    get: (id: string) => fetchAPI<any>(`/api/disputes/${id}`),
    create: (data: any) =>
      fetchAPI<any>('/api/disputes', {
        method: 'POST',
        body: JSON.stringify(data),
      }),
  },
  votes: {
    create: (data: any) =>
      fetchAPI<any>('/api/votes', {
        method: 'POST',
        body: JSON.stringify(data),
      }),
  },
  profiles: {
    get: (address: string) => fetchAPI<any>(`/api/profiles/${address}`),
  },
  verificationRequests: {
    create: (data: any) =>
      fetchAPI<any>('/api/verification-requests', {
        method: 'POST',
        body: JSON.stringify(data),
      }),
  },
}
