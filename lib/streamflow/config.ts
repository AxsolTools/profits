import BN from 'bn.js'
import { getBN } from '@streamflow/stream'

const DEFAULT_USDC_MINT = 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v'
const DEFAULT_USDT_MINT = 'Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB'
const DEFAULT_WSOL_MINT = 'So11111111111111111111111111111111111111112'

const inspectionPresets: Record<string, number> = {
  '24h': 24 * 60 * 60,
  '48h': 48 * 60 * 60,
  '72h': 72 * 60 * 60,
  '7d': 7 * 24 * 60 * 60,
}

export function parseInspectionPeriod(value?: string) {
  if (!value) return inspectionPresets['24h']
  return inspectionPresets[value] || inspectionPresets['24h']
}

export function getCurrencyConfig(currency: string) {
  const usdcMint = process.env.NEXT_PUBLIC_USDC_MINT || DEFAULT_USDC_MINT
  const usdtMint = process.env.NEXT_PUBLIC_USDT_MINT || DEFAULT_USDT_MINT
  const wsolMint = process.env.NEXT_PUBLIC_WSOL_MINT || DEFAULT_WSOL_MINT

  if (currency === 'USDC') {
    return {
      mint: usdcMint,
      decimals: Number(process.env.NEXT_PUBLIC_USDC_DECIMALS || 6),
      isNative: false,
    }
  }
  if (currency === 'USDT') {
    return {
      mint: usdtMint,
      decimals: Number(process.env.NEXT_PUBLIC_USDT_DECIMALS || 6),
      isNative: false,
    }
  }
  if (currency === 'SOL') {
    return { mint: wsolMint, decimals: 9, isNative: true }
  }

  throw new Error('Unsupported currency.')
}

export function getStreamflowAmounts(amount: number, decimals: number) {
  const totalAmount = getBN(amount, decimals)
  const minimalUnit = new BN(1)
  const cliffAmount = totalAmount.lte(minimalUnit) ? totalAmount : totalAmount.subn(1)
  const amountPerPeriod = totalAmount.lte(minimalUnit) ? new BN(0) : minimalUnit

  return { totalAmount, cliffAmount, amountPerPeriod }
}
