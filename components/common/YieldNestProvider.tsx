'use client'
import { ReactNode } from 'react'

import AppWrapper from '@/components/common/AppWrapper'
import { RootContext } from '@/contexts/RootContext'
import { Toaster } from '@/components/ui/toaster'

import { goerli } from 'wagmi/chains'

/**
 * YieldNestProvider is a component that wraps the application with necessary context providers.
 * It also includes the main application wrapper.
 */
const YieldNestProvider = ({ children }: {children: ReactNode }) => {

  return (
    <RootContext supportedChains={[ goerli ]}>
      <AppWrapper>
        <main className='grow'>
          {children}
        </main>
        <Toaster />
      </AppWrapper>
    </RootContext>
  )
}
export default YieldNestProvider
