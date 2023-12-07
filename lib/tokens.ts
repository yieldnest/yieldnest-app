import { toAddress } from '@/lib/address'

import type { TTokenInfo } from '@/types/index'

export const ETH_TOKEN: TTokenInfo = {
  address: toAddress('0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee'),
  chainId: 1,
  name: 'Ether',
  symbol: 'ETH',
  decimals: 18,
  logoURI: `https://assets.smold.app/api/token/1/0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee/logo-128.png`
}

// Goerli testnet tokens

export const STETH_TOKEN: TTokenInfo ={
  chainId: 5,
  address: toAddress('0x1643E812aE58766192Cf7D2Cf9567dF2C37e9B7F'),
  name: 'Liquid staked Ether 2.0',
  symbol: 'stETH',
  decimals: 18,
  logoURI: 'https://assets.smold.app/api/token/1/0xae7ab96520DE3A18E5e111B5EaAb095312D7fE84/logo-128.png'
}

export const RETH_TOKEN: TTokenInfo ={
  chainId: 5,
  address: toAddress('0x178E141a0E3b34152f73Ff610437A7bf9B83267A'),
  name: 'Rocket Pool ETH',
  symbol: 'rETH',
  decimals: 18,
  logoURI: 'https://assets.smold.app/api/token/1/0xae78736Cd615f374D3085123A210448E74Fc6393/logo-128.png'
}
