import { toAddress } from '@/lib/address'

// This file contains constants used throughout the application. 
// It includes addresses for various tokens and other numerical constants.

// Various tokens that are used in the app
export const ZERO_ADDRESS = toAddress('0x0000000000000000000000000000000000000000')
export const ETH_TOKEN_ADDRESS = toAddress('0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee')
export const WETH_TOKEN_ADDRESS = toAddress('0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2')


// Goerli testnet tokens
export const STETH_TOKEN_ADDRESS = toAddress('0x1643E812aE58766192Cf7D2Cf9567dF2C37e9B7F')
export const RETH_TOKEN_ADDRESS = toAddress('0x178E141a0E3b34152f73Ff610437A7bf9B83267A')

export const BIG_ZERO = 0n
export const MAX_UINT_256 = 0x7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffn
