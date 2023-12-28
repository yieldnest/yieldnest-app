'use client'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import ViewRestake from '@/components/views/Restake'
import ViewClaim from '@/components/views/Claim'
import ViewWithdraw from '@/components/views/Withdraw'
import PoolOverview from '@/components/views/PoolOverview'
import PoolDetails from '@/components/views/PoolDetails'
import { YNETH_TOKEN, ETH_TOKEN } from '@/lib/tokens'
import type { ReactElement } from 'react'

/**
 * This file loads the individual restaking pool page giving users the ability 
 * to see the following information or function:
 * Pool overview, Pool details, Restake, Unstake, Claim. 
 */
export default function PoolHome() {

  const tabs = [
    {value: 0, label: 'Restake', slug: 'restake'},
    {value: 1, label: 'Withdraw', slug: 'withdraw'},
    // {value: 2, label: 'Claim', slug: 'claim'},
  ]

  const [currentTab, setCurrentTab] = useState<typeof tabs[0]>(tabs[0])

  /**
   * renderTab function returns the corresponding view based on the currentTab value.
   */
  function renderTab(): ReactElement {
    switch (currentTab.value) {
    case 0:
      return <ViewRestake type={'ETH'}  />
    case 1:
      return <ViewWithdraw tokens={[YNETH_TOKEN]} />
    // case 2:
    // ? Disabled for now, may not be needed. Protocol design choice to be made later.
    //   return <ViewClaim tokens={[YNETH_TOKEN]} />
    default:
      return <ViewRestake type={'ETH'} />
    }
  }

  // useEffect(() => {
  //   console.log('currentTab', currentTab)
  // },[currentTab])

  return (
    <main className="flex flex-col h-full w-full items-center justify-between mt-14">
      <PoolOverview
        token={[YNETH_TOKEN, ETH_TOKEN]}
      />
      <div className='flex flex-col gap-8 px-4 my-12 w-full md:max-w-5xl md:px-8 lg:w-5/6 lg:max-w-4xl'>
        <div className="mx-auto flex w-full flex-col items-center justify-center bg-card rounded-xl sm:max-w-lg">
          <nav className='flex items-center my-4 bg-background rounded-lg md:text-lg'>
            {tabs.map((tab): ReactElement => {
              return (
                <button
                  key={tab.value}
                  onClick={(): void => {
                    setCurrentTab(tab)
                  }}>
                  <p
                    title={tab.label}
                    aria-selected={currentTab.value === tab.value}
                    className={`px-8 py-2 aria-selected:border-2 aria-selected:border-border aria-selected:rounded-lg 
                    aria-selected:px-8 aria-selected:py-2`}>
                    {tab.label}
                  </p>
                </button>
              )
            })}
          </nav>
          {renderTab()}
        </div>
        <PoolDetails
          token={[YNETH_TOKEN, ETH_TOKEN]}
        />
      </div>
    </main>
  )
}
