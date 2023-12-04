import { createConfig, createStorage } from 'wagmi'
import { alchemyProvider } from 'wagmi/providers/alchemy'
import { infuraProvider } from 'wagmi/providers/infura'
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc'
import { publicProvider } from 'wagmi/providers/public'
import { connectorsForWallets,getDefaultWallets } from '@rainbow-me/rainbowkit'
import { safeWallet } from '@rainbow-me/rainbowkit/wallets'
import { noopStorage } from '@wagmi/core'

import { getNetwork } from '@/lib/wagmi/utils'

import type { FallbackTransport } from 'viem'
import type { Chain, ChainProviderFn, Config, PublicClient, WebSocketPublicClient } from 'wagmi'

export function getSupportedProviders<TChain extends Chain = Chain>(): ChainProviderFn<TChain>[] {
	const supportedProviders = [
		jsonRpcProvider({
			rpc: (chain): {http: string} => {
				if (!getNetwork(chain.id)) {
					return {http: ''};
				}
				return ({http: getNetwork(chain.id).defaultRPC});
			}
		}),
		publicProvider()
	];

	if (process.env.NEXT_PUBLIC_ALCHEMY_KEY) {
		supportedProviders.push(alchemyProvider({apiKey: process.env.NEXT_PUBLIC_ALCHEMY_KEY || ''}));
	}
	if (process.env.NEXT_PUBLIC_INFURA_PROJECT_ID) {
		supportedProviders.push(infuraProvider({apiKey: process.env.NEXT_PUBLIC_INFURA_PROJECT_ID || ''}));
	}
	return supportedProviders as unknown as ChainProviderFn<TChain>[];
}

export function getConfig({chains, publicClient, webSocketPublicClient}: {
	chains: Chain[]
	publicClient: ({chainId}: { chainId?: number | undefined; }) => PublicClient<FallbackTransport>
	webSocketPublicClient: ({chainId}: { chainId?: number | undefined; }) => WebSocketPublicClient<FallbackTransport> | undefined
}): Config<PublicClient<FallbackTransport>, WebSocketPublicClient<FallbackTransport>> {
	const {wallets: rainbowWallets} = getDefaultWallets({
		appName:(process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_NAME as string) || '',
		projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID as string,
		chains
	});
	const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID as string;
	const rainbowConnector = connectorsForWallets([
		...rainbowWallets,
		{
			groupName: 'Others',
			wallets: [
				safeWallet({chains}),
			]
		}
	]);

	const config = createConfig({
		storage: createStorage({
			storage: (typeof window !== 'undefined' && window.sessionStorage)
				? window.sessionStorage
				: noopStorage
		}),
		autoConnect: true,
		publicClient,
		webSocketPublicClient,
		connectors: [
			...rainbowConnector(),
		]
	});

	return config;
}
