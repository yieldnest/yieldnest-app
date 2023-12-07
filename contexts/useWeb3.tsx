import	React, {createContext, useCallback, useContext, useMemo, useState} from 'react'
import assert from 'assert'
import { useAccount, useConnect, useDisconnect, useEnsName, 
  useNetwork, usePublicClient, useSwitchNetwork, useWalletClient, WagmiConfig } from 'wagmi'
import { useConnectModal, RainbowKitProvider } from '@rainbow-me/rainbowkit'
import { useIsMounted, useMountEffect, useUpdateEffect}  from '@react-hookz/web'

import { toAddress } from '@/lib/address'
import { getConfig, getSupportedProviders } from '@/lib/wagmi/config'
import { configureChains } from '@/lib/wagmi/configChains'
import { useToast } from '@/components/ui/use-toast'

import type { ReactElement } from 'react'
import type { FallbackTransport } from 'viem'
import type { Config, PublicClient, WebSocketPublicClient, Chain } from 'wagmi'
import type { TWeb3Context } from '@/types/contexts'

const defaultState = {
  address: undefined,
  ens: undefined,
  lensProtocolHandle: undefined,
  chainID: Number(process.env.NEXT_PUBLIC_DEFAULT_CHAIN_ID),
  isDisconnected: false,
  isActive: false,
  isConnecting: false,
  isWalletSafe: false,
  isWalletLedger: false,
  hasProvider: false,
  provider: undefined,
  currentPartner: undefined,
  walletType: 'NONE',
  onConnect: async (): Promise<void> => undefined,
  onSwitchChain: (): void => undefined,
  openLoginModal: (): void => undefined,
  onDesactivate: (): void => undefined
}

const Web3Context = createContext<TWeb3Context>(defaultState)
export const Web3ContextAppWrapper = ({children}: {children: ReactElement}): ReactElement => {
  const {address, isConnecting, isConnected, isDisconnected, connector} = useAccount()
  const {connectors, connectAsync} = useConnect()
  const {disconnect} = useDisconnect()
  const {switchNetwork} = useSwitchNetwork()
  const {data: ensName} = useEnsName({address: address, chainId: 1})
  const {data: walletClient} = useWalletClient()
  const {chain} = useNetwork()
  const [currentChainID, set_currentChainID] = useState(chain?.id)
  const publicClient = usePublicClient()
  const isMounted = useIsMounted()
  const { openConnectModal } = useConnectModal()

  // Toast hook
  const { toast } = useToast()

  const supportedChainsID = useMemo((): number[] => {
    const injectedConnector = connectors.find((e): boolean => (e.id).toLocaleLowerCase() === 'injected')
    assert(injectedConnector, 'No injected connector found')
    const chainsForInjected = injectedConnector.chains
    const noTestnet = chainsForInjected.filter(({id}): boolean => id !== 1337)
    return noTestnet.map((network: Chain): number => network.id)
  }, [connectors])

  useUpdateEffect((): void => {
    set_currentChainID(chain?.id)
  }, [chain])


  const onConnect = useCallback(async (): Promise<void> => {

    if (openConnectModal) {
      openConnectModal()
    } else {
      toast({variant: 'destructive', description: 'Impossible to open login modal'})
    }
  }, [openConnectModal])

  const onDesactivate = useCallback((): void => {
    disconnect()
  }, [disconnect])

  const	onSwitchChain = useCallback((newChainID: number): void => {
    set_currentChainID(newChainID)
    if (isConnected) {
      if (!switchNetwork) {
        console.error(new Error('Switch network function is not defined'))
      }
      switchNetwork?.(newChainID)
    }
  }, [switchNetwork, isConnected])

  const openLoginModal = useCallback(async (): Promise<void> => {

    if (openConnectModal) {
      openConnectModal()
    } else {
      toast({variant: 'destructive', description: 'Impossible to open login modal'})
    }
  }, [openConnectModal])

  const contextValue = {
    address: address ? toAddress(address) : undefined,
    isConnecting,
    isDisconnected,
    ens: ensName || '',
    isActive: isConnected && [...supportedChainsID].includes(chain?.id || -1) && isMounted(),
    isWalletSafe: connector?.id === 'safe' || (connector as any)?._wallets?.[0]?.id === 'safe',
    lensProtocolHandle: '',
    hasProvider: !!(walletClient || publicClient),
    provider: connector,
    chainID: isConnected ? 
      Number(chain?.id || process.env.NEXT_PUBLIC_DEFAULT_CHAIN_ID) 
      : 
      Number(currentChainID || process.env.NEXT_PUBLIC_DEFAULT_CHAIN_ID),
    onConnect,
    onSwitchChain,
    openLoginModal,
    onDesactivate: onDesactivate,
  }

  return (
    <Web3Context.Provider value={contextValue}>
      {children}
    </Web3Context.Provider>
  )
}

export const Web3ContextApp = ({children, supportedChains}: {
	children: ReactElement,
	supportedChains: Chain[],
}): ReactElement => {

  const config = useMemo((): Config<PublicClient<FallbackTransport>, WebSocketPublicClient<FallbackTransport>> => {
    const {chains, publicClient, webSocketPublicClient} = configureChains(
      supportedChains,
      getSupportedProviders()
    )
    return getConfig({chains, publicClient, webSocketPublicClient})
  }, [supportedChains])

  return (
    <WagmiConfig config={config}>
      <RainbowKitProvider chains={supportedChains}>
        <Web3ContextAppWrapper>
          {children}
        </Web3ContextAppWrapper>
      </RainbowKitProvider>
    </WagmiConfig>
  )
}

export const useWeb3 = (): TWeb3Context => useContext(Web3Context)
