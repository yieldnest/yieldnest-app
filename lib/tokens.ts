import { toAddress } from '@/lib/address'
import type { TTokenInfo } from '@/types/index'
import { erc20ABI } from '@wagmi/core'

export const ETH_TOKEN: TTokenInfo = {
  address: toAddress('0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee'),
  chainId: 1,
  name: 'Ether',
  symbol: 'ETH',
  decimals: 18,
  logoURI: `https://assets.smold.app/api/token/1/0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee/logo-128.png`,
}

// Goerli testnet tokens

export const STETH_TOKEN: TTokenInfo ={
  chainId: 5,
  address: toAddress('0x1643E812aE58766192Cf7D2Cf9567dF2C37e9B7F'),
  name: 'Liquid staked Ether 2.0',
  symbol: 'stETH',
  decimals: 18,
  logoURI: 'https://assets.smold.app/api/token/1/0xae7ab96520DE3A18E5e111B5EaAb095312D7fE84/logo-128.png',
  abi: erc20ABI
}

export const YNETH_TOKEN: TTokenInfo ={
  chainId: 5,
  address: toAddress('0x096bcB45b3BB89b33d0DDCf92508Fe54f9b25Af1'),
  name: 'YieldNest ETH',
  symbol: 'ynETH',
  decimals: 18,
  logoURI: '/yn-token-icon.svg',
  abi: erc20ABI
}
