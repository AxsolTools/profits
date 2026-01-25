import { z } from 'zod'

export const createTransactionSchema = z.object({
  buyerWallet: z.string().min(1, 'Buyer wallet is required'),
  sellerWallet: z.string().min(1, 'Seller wallet is required'),
  amount: z.number().positive('Amount must be positive'),
  currency: z.string().default('USDC'),
  proofId: z.string().uuid().optional(),
  category: z.string().min(1, 'Category is required'),
  title: z.string().min(1, 'Title is required'),
  metadata: z.record(z.any()).optional(),
})

export type CreateTransactionInput = z.infer<typeof createTransactionSchema>
