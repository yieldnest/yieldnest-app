'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect, useMemo } from 'react'
import { cn } from '@/lib/cn'

import MobileMenu from './MobileMenu'
import NavLinks from './NavLinks'
import ynIcon from '@/public/yn-icon.svg'
import ynLogoDark from '@/public/yieldnest-dark.svg'
import { Wallet } from 'lucide-react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'


import assert from 'assert'
import { useChainModal } from '@rainbow-me/rainbowkit'
import { useConnect, useNetwork, useAccount } from 'wagmi'
import { useIsMounted } from '@react-hookz/web'
import { truncateHex } from '@/lib/address'
import { useWeb3 } from '@/contexts/useWeb3'


import type { ReactElement } from 'react'
import type { Chain } from 'wagmi'
type TNetwork = {value: number, label: string}

/**
 * NetworkButton is a component that displays the current network label.
 * It also triggers a tooltip on hover, and the tooltip content changes based on the chain.
 */
function NetworkButton({label, onClick, chain}: {
	label: string,
  chain?: number,
	onClick?: () => void,
}): ReactElement {

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger
          onClick={onClick}
          suppressHydrationWarning
          className={'mr-4 flex-row items-center border-0 p-0 text-sm cursor-pointer'}>
          <div suppressHydrationWarning className={'relative flex flex-row items-center'}>
            {label}
          </div>
        </TooltipTrigger>
        {chain === Number(process.env.NEXT_PUBLIC_DEFAULT_CHAIN_ID) &&
          <TooltipContent>
            <p>Only Goerli is supported.</p>
          </TooltipContent>
        }
      </Tooltip>
    </TooltipProvider>
  )
}

/**
 * NetworkSelector is a component that allows the user to switch between different blockchain networks.
 */
export function NetworkSelector({networks}: {networks: number[]}): ReactElement {
  const { onSwitchChain } = useWeb3()
  const { connectors } = useConnect()
  const { isConnected } = useAccount()
  const { chain } = useNetwork()
  const isMounted = useIsMounted()

  const supportedNetworks = useMemo((): TNetwork[] => {
    const injectedConnector = connectors.find((e): boolean => (e.id).toLocaleLowerCase() === 'injected')
    assert(injectedConnector, 'No injected connector found')
    const chainsForInjected = injectedConnector.chains

    return (
      chainsForInjected
        .filter(({id}): boolean => id !== 1337 && ((networks.length > 0 && networks.includes(id)) || true))
        .map((network: Chain): TNetwork => (
          {value: network.id, label: network.name}
        ))
    )
  }, [connectors, networks])

  return (
    <div>
      {!isMounted() || !isConnected ? 
        <div></div>
        :
        chain?.id === supportedNetworks[0]?.value ?
          <NetworkButton
            label={supportedNetworks[0]?.label}
            chain={chain?.id}
          />
          :
          <NetworkButton
            label={'Switch to Goerli'}
            chain={chain?.id}
            onClick={(): void => onSwitchChain(supportedNetworks[0].value)} />
      }
    </div>
  )
}

/**
 * WalletSelector is a component that allows the user to select and manage their blockchain wallet.
 * It provides functionalities such as displaying the wallet identity, 
 * and handling the connection and disconnection of the wallet.
 */
function	WalletSelector(): ReactElement {
  // const { openChainModal } = useChainModal()
  const { isActive, address, ens, lensProtocolHandle, openLoginModal, onConnect } = useWeb3()
  const [ walletIdentity, set_walletIdentity ] = useState<string | undefined>(undefined)

  useEffect((): void => {
    if (!isActive && address) {
      set_walletIdentity('Invalid Network')
    } else if (ens) {
      set_walletIdentity(ens)
    } else if (lensProtocolHandle) {
      set_walletIdentity(lensProtocolHandle)
    } else if (address) {
      set_walletIdentity(truncateHex(address, 4))
    } else {
      set_walletIdentity(undefined)
    }
  }, [ens, lensProtocolHandle, address, isActive])

  return (
    <div
      onClick={(): void => {
        if (isActive) {
          openLoginModal()
        } else if (!isActive && address) {
          // openChainModal?.() Not currently supported
        } else {
          onConnect()
        }
      }}>
      <p suppressHydrationWarning className={'!text-xs md:!text-sm'}>
        {walletIdentity ? 
          <span>
            <span className={`relative flex h-8 px-4 cursor-pointer items-center justify-center border 
            border-border rounded-lg bg-background transition-all hover:bg-card`}>
              {walletIdentity}
            </span>
          </span>
          : (
            <span>
              <span className={`relative flex h-8 px-4 cursor-pointer items-center justify-center border 
              border-border rounded-lg bg-background transition-all hover:bg-card`}>
                <Wallet className={'h-4 w-4 mr-2'} /> {'Connect'}
              </span>
            </span>
          )}
      </p>
    </div>
  )
}

/**
 * Header is a functional component that returns a header element.
 * The header contains a mobile menu, logo, navigation links, network selector, and wallet selector.
 * It also listens for a scroll event and changes its style based on the scroll position.
 */
const Header = () => {

  const [isScrolled, setIsScrolled] = useState(false)

  // handleScroll function listens for a scroll event and changes the isScrolled state based on the scroll position.
  // The isScrolled state is used to change the style of the header when the user scrolls.
  // Header style updates with a border bottom and some opacity.
  useEffect(() => {
    const handleScroll = () => {
      // Adjust the value '50' based on when you want the navbar to change its style
      if (window.scrollY > 50) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }
    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const classes =cn(
    'fixed top-0 w-full z-[100]',
    'px-6 lg:px-10 py-3 flex items-center justify-between',
    {
      'bg-background/90 backdrop-blur-sm border-b-2 border-muted/20': isScrolled,
      'bg-background dark:bg-background': !isScrolled,
    }
  )

  return (
    <header className={classes}>
      {/* Mobile menu container set to hide on screens wider than 1024px */}
      <section className='flex justify-between'>
        <div className='flex gap-4 lg:hidden'>
          <MobileMenu />
          <Link href='/'>
            <Image alt='logo' className='block lg:hidden h-8 w-auto' src={ynIcon} />
          </Link>
        </div>
        <div className='hidden lg:flex lg:gap-6 lg:items-center'>
          <Link href='/'>
            <Image alt='logo' className='hidden lg:block h-8 w-auto' src={ynLogoDark} />
          </Link>
          <NavLinks />
        </div>
      </section>
      <div className='flex gap-4 items-center justify-between'>
        <NetworkSelector networks={[]} />
        <WalletSelector />
      </div>
    </header>
  )
} 

export default Header
