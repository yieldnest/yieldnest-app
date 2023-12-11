import type { Metadata } from 'next'
import { Nunito } from 'next/font/google'
import './globals.css'

import YieldNestProvider from '@/components/common/YieldNestProvider'

const nunito = Nunito({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'YieldNest',
  description: 'The native liquid restaking protocol. Maximizing Ethereum yield.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={nunito.className}>
        <YieldNestProvider>
          {children}
        </YieldNestProvider>
      </body>
    </html>
  )
}
