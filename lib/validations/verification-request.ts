import { z } from 'zod'

export const createVerificationRequestSchema = z.object({
  tokenHoldings: z.string().min(1, 'Token holdings selection is required'),
  telegramUsername: z.string().min(1, 'Telegram username is required'),
  service: z.enum(['Payroll', 'Tokenization', 'Spending'], {
    required_error: 'Service selection is required',
  }),
  description: z.string().min(10, 'Description must be at least 10 characters'),
})

export type CreateVerificationRequestInput = z.infer<typeof createVerificationRequestSchema>
