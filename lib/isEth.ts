import { toAddress } from '@/lib/address'
import { ETH_TOKEN_ADDRESS } from './constants'

import type { TAddress } from '@/types/index'

/**
 * This function checks if the provided address matches the Ethereum token address.
 * @param {string | null | TAddress} address - The address to check.
 * @returns {boolean} - Returns true if the address matches the Ethereum token address, 
 * false otherwise.
 */

export function isEth(address?: string | null | TAddress): boolean {
  return toAddress(address) === toAddress(ETH_TOKEN_ADDRESS)
}
