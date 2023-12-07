'use client'

import { Web3ContextApp } from './useWeb3'

import type { ReactElement } from 'react'
import type { Chain } from 'viem'

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
