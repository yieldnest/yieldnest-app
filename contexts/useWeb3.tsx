import	React, {createContext, useCallback, useContext, useMemo, useState} from 'react'
import assert from 'assert'
import { useAccount, useConnect, useDisconnect, useEnsName, 
  useNetwork, usePublicClient, useSwitchNetwork, useWalletClient, WagmiConfig } from 'wagmi'
import { useConnectModal, RainbowKitProvider } from '@rainbow-me/rainbowkit'
import { useIsMounted, useUpdateEffect}  from '@react-hookz/web'

import { toAddress } from '@/lib/address'
import { getConfig, getSupportedProviders } from '@/lib/wagmi/config'
import { configureChains } from '@/lib/wagmi/configChains'
import { useToast } from '@/components/ui/use-toast'
import { useAccountModal } from '@rainbow-me/rainbowkit'

import type { ReactElement } from 'react'
import type { FallbackTransport } from 'viem'
import type { Config, PublicClient, WebSocketPublicClient, Chain } from 'wagmi'
import type { TWeb3Context } from '@/types/contexts'

// defaultState is used to initialize the state of the Web3Context. 
// It contains default values for various properties related to the Web3 context.
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

// Web3ContextAppWrapper provides hooks and state for connecting to a wallet, 
// switching networks, and handling account information.
const Web3Context = createContext<TWeb3Context>(defaultState)
export const Web3ContextAppWrapper = ({children}: {children: ReactElement}): ReactElement => {
  const { address, isConnecting, isConnected, isDisconnected, connector } = useAccount()
  const { connectors } = useConnect()
  const { disconnect } = useDisconnect()
  const { switchNetwork } = useSwitchNetwork()
  const { data: ensName } = useEnsName({ address: address, chainId: 1 })
  const { data: walletClient } = useWalletClient()
  const { chain } = useNetwork()
  const [ currentChainID, setCurrentChainID ] = useState(chain?.id)
  const publicClient = usePublicClient()
  const isMounted = useIsMounted()
  const { openConnectModal } = useConnectModal()
  const { openAccountModal } = useAccountModal()

  // Toast hook
  const { toast } = useToast()

  // Ensures that the Web3Context is mounted before setting the current chain ID.
  const supportedChainsID = useMemo((): number[] => {
    // Checks if the injected connector is available.
    const injectedConnector = connectors.find((e): boolean => (e.id).toLocaleLowerCase() === 'injected')
    assert(injectedConnector, 'No injected connector found')
    // Filters the injected connector to remove the testnet and keep the specific chains. 
    // Currently only Goerli is supported so there is only 1 chain.
    const chainsForInjected = injectedConnector.chains
    const noTestnet = chainsForInjected.filter(({id}): boolean => id !== 1337)
    return noTestnet.map((network: Chain): number => network.id)
  }, [connectors])

  // When chain updates, update the current chain ID.
  // This is necessary to ensure that the currentChainID state is updated whenever the chain changes.
  useUpdateEffect((): void => {
    setCurrentChainID(chain?.id)
  }, [chain])

  // onConnect is a function that opens the login modal when user pressed connect button.
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

  // onSwitchChain is a function that changes the current blockchain network ID
  const	onSwitchChain = useCallback((newChainID: number): void => {
    // Sets the current chain ID within the Web3Context.
    setCurrentChainID(newChainID)
    if (isConnected) {
      if (!switchNetwork) {
        console.error(new Error('Switch network function is not defined'))
      }
      // Switches the network to the new chain ID. Prompted to accept change in wallet.
      switchNetwork?.(newChainID)
    }
  }, [switchNetwork, isConnected])

  // Opens the account modal so a user can disconnect wallet or copy wallet address when a user is already connected.
  // TODO update the account modal display more account information later on. 
  const openLoginModal = useCallback(async (): Promise<void> => {
    if (openAccountModal) {
      openAccountModal?.()
    } else {
      toast({variant: 'destructive', description: 'Impossible to open login modal'})
    }
  }, [openAccountModal])

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
