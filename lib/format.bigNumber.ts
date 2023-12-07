import { formatUnits } from 'viem'

export type TNumberish = bigint | number | string | `${number}` //wagmi weird type
export type	TNormalizedBN = {
	raw: bigint,
	normalized: number | string,
}

/**
 * toBigInt converts the input amount to a BigInt.
 * If the amount is not provided, it defaults to 0.
 * @param {TNumberish} amount - The amount to be converted to BigInt.
 * @returns {bigint} - The converted BigInt value of the input amount.
 */
export const toBigInt = (amount?: TNumberish): bigint => {
  return BigInt(amount || 0)
}

/**
 * toNormalizedValue converts the input value to a normalized number.
 * It converts the value to a number with a default of 18 decimals or a specified decimal amount.
 * @param {bigint} value - The value to be converted to a normalized number.
 * @param {number} decimals - The number of decimals to be used in the conversion.
 * @returns {number} - The converted normalized number of the input value.
 */
export const toNormalizedValue = (value: bigint, decimals?: number): number => {
  return Number(formatUnits(value, decimals ?? 18))
}

/**
 * toNormalizedBN converts the input value to a normalized big number.
 * It uses the toBigInt function to convert the value to a BigInt and the formatUnits function 
 * converts the value to a number with a default of 18 decimals or a specified decimal amount.
 * @param {TNumberish} value - The value to be converted to a normalized big number.
 * @param {number} decimals - The number of decimals to be used in the conversion.
 * @returns {TNormalizedBN} - The converted normalized big number of the input value.
 */
export const toNormalizedBN = (value: TNumberish, decimals?: number): TNormalizedBN => ({
  raw: toBigInt(value),
  normalized: formatUnits(toBigInt(value), decimals ?? 18)
})

export { toNormalizedValue as formatToNormalizedValue }
export { toNormalizedBN as formatToNormalizedBN }
