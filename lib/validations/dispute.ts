import { z } from 'zod'

export const createDisputeSchema = z.object({
  transactionId: z.string().uuid('Invalid transaction ID'),
  reason: z.string().min(10, 'Reason must be at least 10 characters'),
})

export const voteSchema = z.object({
  disputeId: z.string().uuid('Invalid dispute ID'),
  vote: z.enum(['buyer', 'seller']),
  voterWallet: z.string().min(1, 'Voter wallet is required'),
  tokenAmount: z.number().positive('Token amount must be positive'),
})

export type CreateDisputeInput = z.infer<typeof createDisputeSchema>
export type VoteInput = z.infer<typeof voteSchema>
