'use client'

import { Web3ContextApp } from './useWeb3'

import type { ReactElement } from 'react'
import type { Chain } from 'viem'


/**
 * RootContext is a context that provides access to to all contexts within the app.
 * More contexts can be added here as needed.
 */

function RootContext({children, supportedChains}: {
	children: ReactElement
	supportedChains: Chain[]
}): ReactElement {
  return (
    <Web3ContextApp supportedChains={supportedChains}>
      {children}
    </Web3ContextApp>
  )
}

export { RootContext }
