import { z } from 'zod'

export const createProofSchema = z.object({
  recipient: z.string().min(1, 'Recipient is required'),
  amount: z.number().positive('Amount must be positive'),
  currency: z.string().default('USD'),
  platformId: z.string().uuid('Invalid platform ID'),
  campaignName: z.string().min(1, 'Campaign name is required'),
  txHash: z.string().min(1, 'Transaction hash is required'),
  blockNumber: z.string().min(1, 'Block number is required'),
  chain: z.string().default('Solana'),
  metadata: z.record(z.any()).optional(),
})

export const getProofsSchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(20),
  status: z.enum(['verified', 'pending', 'disputed']).optional(),
  platform: z.string().optional(),
  featured: z.coerce.boolean().optional(),
})

export type CreateProofInput = z.infer<typeof createProofSchema>
export type GetProofsQuery = z.infer<typeof getProofsSchema>
