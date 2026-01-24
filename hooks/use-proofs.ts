import { useEffect, useState } from 'react'
import { api } from '@/lib/api'
import type { GetProofsQuery } from '@/lib/validations/proof'

export function useProofs(query?: Partial<GetProofsQuery>) {
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    async function fetchProofs() {
      try {
        setLoading(true)
        const result = await api.proofs.list(query)
        setData(result)
      } catch (err) {
        setError(err as Error)
      } finally {
        setLoading(false)
      }
    }

    fetchProofs()
  }, [query?.page, query?.limit, query?.status, query?.platform, query?.featured])

  return { data, loading, error, refetch: () => fetchProofs() }
}

export function useProofStats() {
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    async function fetchStats() {
      try {
        setLoading(true)
        const result = await api.proofs.stats()
        setData(result)
      } catch (err) {
        setError(err as Error)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  return { data, loading, error }
}
