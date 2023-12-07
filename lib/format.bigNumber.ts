import { formatUnits } from 'viem'

export type TNumberish = bigint | number | string | `${number}` //wagmi weird type
export type	TNormalizedBN = {
	raw: bigint,
	normalized: number | string,
}

export const toBigInt = (amount?: TNumberish): bigint => {
  return BigInt(amount || 0)
}

export const toNormalizedValue = (value: bigint, decimals?: number): number => {
  return Number(formatUnits(value, decimals ?? 18))
}

export const toNormalizedBN = (value: TNumberish, decimals?: number): TNormalizedBN => ({
  raw: toBigInt(value),
  normalized: formatUnits(toBigInt(value), decimals ?? 18)
})

export { toNormalizedValue as formatToNormalizedValue }
export { toNormalizedBN as formatToNormalizedBN }
