import Link from 'next/link'
import { useEffect } from 'react'
import { usePoolData } from '@/hooks/usePoolData'
import { formatAmount } from '@/lib/format.number'
import { useFetch } from '@/hooks/useFetch'
import { useWeb3 } from '@/contexts/useWeb3'
import useTVL  from '@/hooks/useTVL'
import { ImageWithFallback } from '@/components/common/ImageWithFallback'
import { cn } from '@/lib/cn'
import { Skeleton } from '@/components/ui/skeleton'
import { Separator } from '@/components/ui/separator'

import { Info, ChevronLeft } from 'lucide-react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'

import type { ReactElement } from 'react'
import type { TTokenInfoArray } from '@/types/index'

type PoolOverviewProps = {
  token: TTokenInfoArray
}

const PoolOverview = (props: PoolOverviewProps) => {
  const { isActive } = useWeb3()
  const { poolData } = usePoolData(props.token[0])
  const { TVL, TAL } = useTVL()

  // Fetches the price of ETH from the Curve API.
  // Temporary until we have an ynETH price.
  const {data: prices} = useFetch<any>({
    endpoint: 'https://api.curve.fi/api/getETHprice',
  })

  useEffect(() => {
    // console.log('prices --->', !prices ? 'Loading' : prices?.data?.price)
    // console.log('props --->', props.token)
    // if (poolData.symbol) {
    //   console.log('poolData on pool overivew', poolData)
    // }
  }, [props ])

  return (
    <>
      <div className='flex ml-0 w-full mt-4 md:max-w-5xl md:px-8 lg:w-5/6 lg:max-w-4xl hover:text-muted'>
        <ChevronLeft />
        <Link href={'/'}>back</Link>
      </div>
      <section className='flex justify-between items-center 
        mt-2 w-full px-4 md:max-w-5xl md:px-8 lg:w-5/6 lg:max-w-4xl'>
        <div>
          <div className='my-4 flex gap-2 items-end'>
            <h1 className='text-6xl'>
              {poolData.symbol ? poolData.symbol : <Skeleton className="h-10 w-[200px] rounded-xl" />}
            </h1>
            <div className='flex'>
              {poolData.symbol && props.token.map((token, index): ReactElement => {
                const isLast = index === props.token.length - 1
                return (
                  <div key={index} className='h-6 w-6 relative mb-1'>
                    <ImageWithFallback
                      className={cn('absolute z-10', isLast ? ' -left-1 z-0' : '')}
                      alt={token.name}
                      unoptimized
                      src={token.logoURI}
                      width={24}
                      height={24} />
                  </div>
                )
              })}
            </div>
          </div>
          <div className='flex gap-4 sm:gap-8 flex-col sm:flex-row'>
            <div>
              <h2 className='mb-1 text-muted'>My ynETH</h2>
              {Number(poolData.userBalance.normalized) && isActive ?
                <>
                  <p className='text-xl'>{formatAmount(poolData.userBalance.normalized, 2, 6)}</p>
                  <p className='text-xl'>$
                    {formatAmount(Number(poolData.userBalance.normalized) * Number(prices?.data?.price), 2, 4)}</p>
                </>
                :
                '--'}
            
            </div>
            <div className=''>
              <h2 className='mb-1 text-muted'>My Restaking Points</h2>
              {
                Number(poolData.userBalance.normalized) > 0 ?
                  <div>
                    <p className='sm:text-xl'>
                      <span className='text-sm sm:text-base font-archivo'>EigenLayer: </span>coming soon</p>
                    <p className='sm:text-xl'>
                      <span className='text-sm sm:text-base font-archivo'>YieldNest: </span>coming soon</p>
                  </div>
                  :
                  '--'
              }
            </div>
          </div>
        </div>
        <div className='text-right '>
          <div className='mb-2'>
            <h2 className='mb-1 text-muted'>Total ETH Restaked</h2>
            {TVL && TAL ?
              <div className='flex gap-2 items-center justify-end h-full'>
                <p className='text-xl'>{formatAmount(TAL.normalized, 2, 6)}</p>
                <Separator orientation='vertical' className='h-[28px]'/>
                <p className='text-xl'>${formatAmount(TVL)}</p>
              </div>
              :
              <div className='flex justify-end'>
                <Skeleton className="h-4 w-[125px]" />
              </div>
            }
          </div>
          <div className='mb-2'>
            <div className='mb-1 flex items-center justify-end gap-1'>
              <h2 className='text-muted'>APR</h2>
              <TooltipProvider>
                <Tooltip >
                  <TooltipTrigger><Info className='h-3 w-3 cursor-pointer text-muted'/></TooltipTrigger>
                  <TooltipContent>
                    <p>Moving Average of APR for a 7 day period.</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            {Number(poolData.poolSupply.normalized) > 0 ?
              <>
                <p className='text-xl'>13.11%</p>
              </>
              :
              <div className='flex justify-end'>
                <Skeleton className="h-4 w-[75px]" />
              </div>
            }
          </div>
        </div>
      </section>
    </>
    
  )
}

export default PoolOverview
