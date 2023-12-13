
import { useEffect } from 'react'
import { usePoolData } from '@/hooks/usePoolData'
import { formatAmount } from '@/lib/format.number'

import { Skeleton } from '@/components/ui/skeleton'

import type { TTokenInfo } from '@/types/index'

type PoolOverviewProps = {
  token: TTokenInfo
}

const PoolOverview = (props: PoolOverviewProps) => {

  const { poolData, updatePoolData } = usePoolData(props.token)

  useEffect(() => {
    if (poolData.symbol) {
      console.log('poolData on pool overivew', poolData)
    }
  }, [poolData])

  return (
    <section className='flex justify-between items-center mt-6 w-full px-4 md:w-4/6 lg:w-1/2'>
      <div>
        <div className='my-4'>
          <h1 className='text-6xl font-semibold'>
            {poolData.symbol ? poolData.symbol : <Skeleton className="h-10 w-[200px] rounded-xl" />}
          </h1>
        </div>
        <div className='flex gap-6 items-start'>
          <div>
            <h2 className='mb-2'>your ynETH</h2>
            {Number(poolData.userBalance.normalized) > 0 ?
              <>
                <p className='text-3xl font-semibold'>{formatAmount(poolData.userBalance.normalized, 2, 6)}</p>
                <p className='text-foreground/60'>$22,454</p>
              </>
              :
              <Skeleton className="h-4 w-[75px]" />}
            
          </div>
          <div >
            <h2 className='mb-2'>APY</h2>
            {Number(poolData.userBalance.normalized) > 0 ?
              <p className='text-3xl font-semibold'>12.4%</p>
              :
              <Skeleton className="h-4 w-[75px]" />}
          </div>
        </div>
      </div>
      <div className='text-right'>
        <div className='mb-2'>
          <h2 className='mb-1'>Total Staked</h2>
          {Number(poolData.poolSupply.normalized) > 0 ?
            <>
              <p className='text-xl font-semibold'>{formatAmount(poolData.userBalance.normalized, 2, 6)}</p>
              <p className='text-foreground/60'>$5,234,098</p>
            </>
            :
            <Skeleton className="h-4 w-[75px]" />
          }
        </div>
        <div className='mb-2'>
          <h2 className='mb-1'>Validators</h2>
          {Number(poolData.poolSupply.normalized) > 0 ?
            <>
              <p className='text-xl font-semibold'>213</p>
            </>
            :
            <Skeleton className="h-4 w-[75px]" />
          }
        </div>
      </div>
    </section>
  )
}

export default PoolOverview
