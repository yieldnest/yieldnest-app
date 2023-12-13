
import { goerli } from '@wagmi/core/chains'

import type { Chain } from 'viem'
import type { TAddress } from '@/types/index'

export type TChainContract = {
	address: TAddress
	blockCreated?: number
}

/* ******************************************************************************
** Extended Chain type is used to add additional properties to the basic wagmi Chain type.
** For Yearn's use case, we need to add:
** - the default RPC and block explorer URLs for each chain.
** - the address of the partner contract for each chain.
** - the wrapped token data for each chain.
**************************************************************************************************/
export type TExtendedChain = Chain & {
	defaultRPC: string
	defaultBlockExplorer: string
}

const wagmiChains = [ goerli ]

const isChain = (chain: any) => {
  return chain.id !== undefined
}

/**
 * `indexedWagmiChains` is an object that maps chain IDs to their corresponding extended chain data.
 * It filters out any invalid chains from the `wagmiChains` array and adds additional properties to each valid chain.
 */
export const indexedWagmiChains = 
Object.values(wagmiChains).filter(isChain).reduce((acc: {[key: number]: TExtendedChain}, 
  chain: Chain): {[key: number]: TExtendedChain} => {
  let extendedChain = chain as TExtendedChain

  extendedChain.contracts = {
    ...extendedChain.contracts,
  }
  extendedChain.defaultRPC = process.env.JSON_RPC_URL?.[extendedChain.id] 
  || extendedChain?.rpcUrls?.public?.http?.[0] || ''
  extendedChain.defaultBlockExplorer = extendedChain.blockExplorers?.etherscan?.url 
  || extendedChain.blockExplorers?.default.url || 'https://etherscan.io'
  acc[extendedChain.id] = extendedChain
  return acc
}, {})

/**
 * This function takes a chain ID as input and returns the corresponding extended chain data.
 * If the chain ID is not supported, it logs a message to the console.
 */
export function getNetwork(chainID: number): TExtendedChain {
  if (!indexedWagmiChains[chainID]) {
    console.log(`Chain ${chainID} is not supported`)
  }
  return indexedWagmiChains[chainID]
}
