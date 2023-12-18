import { useState } from 'react'
import ViewUnstakeToken from './Unstake.Token'

import type { TTokenInfoArray } from '@/types/index'

/**
 * ViewRestake is a high level form component that allows users to restake their tokens.
 * It supports restaking of ETH tokens with support for other tokens coming soon.
 */
const ViewUnstake = ({ tokens }: { tokens: TTokenInfoArray }) => {

  return (
    <section className='w-full'>
      <div className='my-6'>
        <div className='mx-auto w-5/6'>
          <div className='flex w-full flex-col'>
            <div className='flex flex-row items-center justify-between'>
              <h2 className='text-xl font-bold'>
                {`Unstake ${tokens[0].symbol}`}
              </h2>
            </div>
            <ViewUnstakeToken tokens={tokens} />
          </div>
        </div>
      </div>
    </section>
  )
}

export default ViewUnstake
