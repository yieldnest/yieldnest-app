
import { useEffect } from 'react'
import { usePoolData } from '@/hooks/usePoolData'
import { formatAmount } from '@/lib/format.number'
import { useFetch } from '@/hooks/useFetch'
import { useWeb3 } from '@/contexts/useWeb3'
import useTVL  from '@/hooks/useTVL'
import { Skeleton } from '@/components/ui/skeleton'

import type { TTokenInfo } from '@/types/index'

type PoolOverviewProps = {
  token: TTokenInfo
}

const PoolOverview = (props: PoolOverviewProps) => {
  const { isActive } = useWeb3()
  const { poolData } = usePoolData(props.token)
  const { TVL, TAL } = useTVL()

  // Fetches the price of ETH from the Curve API.
  // Temporary until we have an ynETH price.
  const {data: prices} = useFetch<any>({
    endpoint: 'https://api.curve.fi/api/getETHprice',
  })

  useEffect(() => {
    // console.log('prices --->', !prices ? 'Loading' : prices?.data?.price)
    // console.log('TVL --->', !TAL ? 'Loading' : TAL)
    // if (poolData.symbol) {
    //   console.log('poolData on pool overivew', poolData)
    // }
  }, [poolData, ])

  return (
    <section className='flex justify-between items-center mt-6 w-full px-4 md:w-full md:px-8 lg:w-5/6'>
      <div>
        <div className='my-4'>
          <h1 className='text-6xl font-semibold'>
            {poolData.symbol ? poolData.symbol : <Skeleton className="h-10 w-[200px] rounded-xl" />}
          </h1>
        </div>
        <div className='flex gap-6 items-start'>
          <div>
            <h2 className='mb-2'>your ynETH</h2>
            {Number(poolData.userBalance.normalized) ?
              <>
                <p className='text-3xl font-semibold'>{formatAmount(poolData.userBalance.normalized, 2, 6)}</p>
                <p className='text-foreground/60'>$
                  {formatAmount(Number(poolData.userBalance.normalized) * Number(prices?.data?.price), 2, 4)}</p>
              </>
              :
              '--'}
            
          </div>
          <div >
            <h2 className='mb-2'>APY</h2>
            {
              Number(poolData.userBalance.normalized) > 0 ?
                <p className='text-3xl font-semibold'>12.4%</p>
                :
                '--'
            }
          </div>
        </div>
      </div>
      <div className='text-right'>
        <div className='mb-2'>
          <h2 className='mb-1'>Total ETH Staked</h2>
          {TVL && TAL ?
            <>
              <p className='text-xl font-semibold'>{formatAmount(TAL.normalized, 2, 6)}</p>
              <p className='text-foreground/60'>${formatAmount(TVL)}</p>
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
