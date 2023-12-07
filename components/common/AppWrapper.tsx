
import {ReactNode} from 'react'
import Header from '@/components/common/Header'
import Footer from '@/components/common/Footer'

import type { ReactElement } from 'react'

/**
 * AppWrapper is a component that wraps the main content of the application
 * with a common Header and Footer.
 */
function	AppWrapper({ children }: {children: ReactNode }): ReactElement {

  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  )
}

export default AppWrapper
