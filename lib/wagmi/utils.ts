import assert from 'assert'
import { createPublicClient, http } from 'viem'
import { goerli } from '@wagmi/core/chains'

import { toAddress } from '@/lib/address'
import { isEth } from '@/lib/isEth'
import { isTAddress } from '@/lib/address'
import { ZERO_ADDRESS } from '../constants'


import type { Chain, PublicClient } from 'viem'
import type { TAddress } from '@/types/index'

export type TChainContract = {
	address: TAddress
	blockCreated?: number
}

/* 🔵 - YieldNest ******************************************************************************
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
	return chain.id !== undefined;
};

export const indexedWagmiChains = Object.values(wagmiChains).filter(isChain).reduce((acc: {[key: number]: TExtendedChain}, chain: Chain): {[key: number]: TExtendedChain} => {
	let extendedChain = chain as TExtendedChain;

	extendedChain.contracts = {
		...extendedChain.contracts,
	};
	extendedChain.defaultRPC = process.env.JSON_RPC_URL?.[extendedChain.id] || extendedChain?.rpcUrls?.public?.http?.[0] || '';
	extendedChain.defaultBlockExplorer = extendedChain.blockExplorers?.etherscan?.url || extendedChain.blockExplorers?.default.url || 'https://etherscan.io';
	acc[extendedChain.id] = extendedChain;
	return acc;
}, {});

export function getNetwork(chainID: number): TExtendedChain {
	if (!indexedWagmiChains[chainID]) {
    console.log(`Chain ${chainID} is not supported`)
	}
	return indexedWagmiChains[chainID];
}


// export function assertAddress(addr: string | TAddress | undefined, name?: string): asserts addr is TAddress {
// 	assert(addr, `${name || 'Address'} is not set`);
// 	assert(isTAddress(addr), `${name || 'Address'} provided is invalid`);
// 	assert(toAddress(addr) !== ZERO_ADDRESS, `${name || 'Address'} is 0x0`);
// 	assert(!isEth(addr), `${name || 'Address'} is 0xE`);
// }
