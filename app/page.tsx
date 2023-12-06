'use client'
import { useState, useEffect } from 'react'
import ViewRestake from '@/components/views/Restake'
import ViewUnstake from '@/components/views/Unstake'
import ViewClaim from '@/components/views/Claim'

import type { ReactElement } from 'react'

export default function Home() {

  const tabs = [
    {value: 0, label: 'Restake', slug: 'restake'},
    {value: 1, label: 'Unstake', slug: 'unstake'},
    {value: 2, label: 'Claim', slug: 'claim'},
  ]

  const [currentTab, set_currentTab] = useState<typeof tabs[0]>(tabs[0])


  function renderTab(): ReactElement {
		switch (currentTab.value) {
			case 0:
				return <ViewRestake type={'ETH'}  />
			case 1:
				return <ViewUnstake />
			case 2:
				return <ViewClaim />
			default:
				return <ViewRestake type={'ETH'} />
		}
	}

  // useEffect(() => {
  //   console.log('currentTab', currentTab)
  // },[currentTab])

  return (
    <main className="flex flex-col h-full items-center justify-between mt-14">
      <div>
        <h1>Welcome to YieldNest!</h1>
      </div>
      <div className="mx-auto my-12 flex w-full flex-col items-center justify-center bg-card rounded-xl sm:max-w-md">
          <nav className={'flex items-center gap-4 my-4 bg-background rounded-lg md:text-lg'}>
            {tabs.map((tab): ReactElement => {
              return (
                <button
                  key={tab.value}
                  onClick={(): void => {
                    set_currentTab(tab)
                  }}>
                  <p
                    title={tab.label}
                    aria-selected={currentTab.value === tab.value}
                    className={'px-3 py-1 aria-selected:border-2 aria-selected:border-border aria-selected:rounded-lg aria-selected:px-3 aria-selected:py-1'}>
                    {tab.label}
                  </p>
                </button>
              )
							})}
						</nav>
          {renderTab()}
        </div>
    </main>
  )
}
