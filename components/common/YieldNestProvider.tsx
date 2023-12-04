'use client'
import { ReactNode } from 'react'

import AppWrapper from '@/components/common/AppWrapper'
import { RootContext } from '@/contexts/RootContext'


import { mainnet, goerli } from 'wagmi/chains'


const YieldNestProvider = ({ children }: {children: ReactNode }) => {

  return (
    <RootContext supportedChains={[ goerli ]}>
      <AppWrapper>
        <main className='grow'>
          {children}
        </main>
      </AppWrapper>
    </RootContext>
  )
}
export default YieldNestProvider
