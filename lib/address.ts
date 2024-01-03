import assert from 'assert'
import { getAddress, isAddress, zeroAddress as wZeroAddress } from 'viem'
import { isEth } from '@/lib/isEth'
import { ZERO_ADDRESS } from '@/lib/constants'

import type { TAddress, TAddressLike, TAddressYN } from '@/types/index'

export const zeroAddress = wZeroAddress as TAddress

/**
 * isTAddress checks if the provided address is a valid Ethereum address.
 * It uses a regular expression to check if the address starts with '0x' followed by an even number of 
 * hexadecimal characters.
 * @param {string | null} address - The address to be checked.
 * @returns {boolean} - Returns true if the address is valid, false otherwise.
 */

export function isTAddress(address?: string | null): address is TAddress {
  const regex = /^0x([0-9a-f][0-9a-f])*$/i
  return !!address && regex.test(address)
}

/**
 * checksumAddress checks if the provided address is a valid Ethereum address.
 * It uses the isAddress function to check if the address is valid.
 * If the address is valid, it converts the address to a checksummed address using the getAddress function.
 * It then checks if the checksummed address is a valid TAddress using the isTAddress function.
 * If the checksummed address is a valid TAddress, it returns the checksummed address as TAddressYN.
 * If the address is not valid or an error occurs, it returns the zero address as TAddressYN.
 * @param {string | null | undefined} address - The address to be checked.
 * @returns {TAddressYN} - Returns the checksummed address if it is valid, zero address otherwise.
 */

function checksumAddress(address?: string | null | undefined): TAddressYN {
  if (address && isAddress(address)) {
    const checksummedAddress = getAddress(address)
    if (isTAddress(checksummedAddress)) {
      return checksummedAddress as TAddressYN
    }
  } 
  return zeroAddress as TAddressYN
}

/**
 * toAddress converts an address-like value to a valid Ethereum address.
 * If the input is null, it returns the zero address.
 * Otherwise, it uses checksumAddress and getAddress to validate and convert the input.
 * @param {TAddressLike | null} address - The address-like value to be converted.
 * @returns {TAddress} - Returns the converted Ethereum address or zero address.
 */
export function toAddress(address?: TAddressLike | null): TAddress {
  if (!address) {
    return wZeroAddress
  }
  return getAddress(checksumAddress(address)?.valueOf())
}

/**
 * truncateHex truncates a hexadecimal string. ex. 0x4321...1234
 * It takes an address and a size as input. If the address is defined, it slices the address from the start to the size
 * and from the end to the size, and returns the truncated address. 
 * If the address is not defined, it returns a zero address.
 * @param {string | undefined} address - The hexadecimal string to be truncated.
 * @param {number} size - The size to which the hexadecimal string should be truncated.
 * @returns {string} - The truncated hexadecimal string.
 */
export function truncateHex(address: string | undefined, size: number): string {
  if (address !== undefined) {
    if (size === 0) {
      return address
    }
    return `${address.slice(0, size)}...${address.slice(-size)}`
  }
  if (size === 0) {
    return zeroAddress
  }
  return '0x000...0000'
}

/**
 * isZeroAddress checks if the provided address is the zero address.
 * @param {string | undefined} address - The address to be checked.
 * @returns {boolean} - Returns true if the address is the zero address, false otherwise.
 */
export function isZeroAddress(address?: string): boolean {
  return toAddress(address) === toAddress(zeroAddress)
}

/**
 * Asserts that the provided address is valid and not empty, and performs
 * additional checks for specific address conditions.
 */
export function assertAddress(addr: string | TAddress | undefined, name?: string): asserts addr is TAddress {
  assert(addr, `${name || 'Address'} is not set`)
  assert(isTAddress(addr), `${name || 'Address'} provided is invalid`)
  assert(toAddress(addr) !== ZERO_ADDRESS, `${name || 'Address'} is 0x0`)
  assert(!isEth(addr), `${name || 'Address'} is 0xE`)
}
