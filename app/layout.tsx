import type { Metadata } from 'next'
import { Arimo } from 'next/font/google'
import './globals.css'

const arimo = Arimo({ subsets: ['latin'] })

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
      <body className={arimo.className}>{children}</body>
    </html>
  )
}
