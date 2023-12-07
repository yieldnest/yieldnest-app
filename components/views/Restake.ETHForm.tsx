
import { useState, useCallback, useEffect, useMemo } from 'react'
import { useWeb3 } from '@/contexts/useWeb3'
import { useBalance } from 'wagmi'
import { handleInputChangeEventValue } from '@/lib/helpers'
import { toNormalizedBN } from '@/lib/format.bigNumber'
import { formatAmount } from '@/lib/format.number'
import { ImageWithFallback } from '@/components/common/ImageWithFallback'

import { cn } from '@/lib/cn'
import { ArrowDown } from 'lucide-react'

import type { TNormalizedBN } from '@/lib/format.bigNumber'
import type { TTokenInfo } from '@/types/index'
import type { ChangeEvent, ReactElement } from 'react'


const RestakeETHForm = ({ token, amount, onUpdateAmount, isDisabled}: {
  token: TTokenInfo,
	amount: TNormalizedBN,
	onUpdateAmount: (amount: TNormalizedBN) => void,
	isDisabled: boolean
}): ReactElement => {
  // ! Hooks
  const { isActive, address } = useWeb3()
  const { data: balanceETH, isError, isLoading } = useBalance({
    address: address,
  })

  // ! State
  const [ balance, setBalance ] = useState(balanceETH ? toNormalizedBN(balanceETH.value) : toNormalizedBN(0))

  const balanceOf = useMemo((): TNormalizedBN => {
    return toNormalizedBN((balance?.raw || 0) || 0)
  }, [balance])

  const onChangeAmount = useCallback((e: ChangeEvent<HTMLInputElement>): void => {
    const element = document.getElementById('amountToSend') as HTMLInputElement
    const newAmount = handleInputChangeEventValue(e, token?.decimals || 18)
    console.log('newAmount', newAmount)
    if (!isActive) {
      return onUpdateAmount(newAmount)
    }
    if (newAmount.raw > balance?.raw) {
      if (element?.value) {
        element.value = formatAmount(balance?.normalized, 0, 18)
      }
      return onUpdateAmount(toNormalizedBN(balance?.raw || 0))
    }
    onUpdateAmount(newAmount)
  }, [isActive, onUpdateAmount, token?.decimals])

  useEffect(() => {
    console.log('token -->', token)
    console.log('balanceETH -->', balanceETH)
    console.log('balance -->', balance)
  }, [token, balanceETH])

  return (
    <section className='w-full'>
      <form className={cn('flex w-full flex-col gap-4 rounded-md p-4 bg-background')}>
        <div className='flex justify-between items-center'>
          <input 
            className={'w-full pl-2 overflow-x-scroll border-none bg-background px-0 outline-none text-xl'}
            type={'number'}
            inputMode={'numeric'}
            min={0}
            maxLength={20}
            step={1 / 10 ** (token?.decimals || 18)}
            max={balanceOf?.normalized || 0}
            placeholder={'0.000000'}
            value={amount?.normalized || ''}
            onChange={onChangeAmount}
          />
          <div className={'flex items-center justify-between border border-border rounded-lg gap-2 p-2'}>
            <p className='pr-2'>
              {token.symbol}
            </p>
            <div className='h-6 w-6 flex items-center justify-center'>
              <ImageWithFallback
                alt={token.name}
                unoptimized
                src={token.logoURI}
                width={24}
                height={24} />
            </div>
          </div>
        </div>
        
        <div className='flex justify-between items-center'>
          <p
            suppressHydrationWarning
            className={'pl-2 pt-1 text-xs text-foreground'}>
            {`You have ${formatAmount(balance?.normalized || 0, 2, 6)} ${token.symbol}`}
          </p>
          <button
            type={'button'}
            tabIndex={-1}
            onClick={(): void => onUpdateAmount(balanceOf)}
            className={cn(`px-2 py-1 text-sm rounded-md border border-border transition-colors text-secondary 
            hover:bg-background`, isDisabled ? 'opacity-0 pointer-events-none' : '')}>
            {'Max'}
          </button>
        </div>
      </form>
      <div className='flex justify-center items center'>
        <ArrowDown className='h-12 w-12 text-accent' />
      </div>
      {/* Output section */}
      <div className={cn('flex w-full flex-col gap-4 rounded-md p-4 bg-background')}>
        <div className='flex justify-between items-center'>
          <div>
            <p className='w-full pl-2 overflow-x-scroll border-none bg-background px-0 outline-none text-xl'>
              0.00
            </p>
          </div>
          <div className={'flex items-center justify-between border border-border rounded-lg gap-2 p-2'}>
            <p className='pr-2'>
              ynETH
              {/* {token.symbol} */}
            </p>
            <div className='h-6 w-6 flex items-center justify-center'>
              {/* <ImageWithFallback
                alt={token.name}
                unoptimized
                src={token.logoURI}
                width={24}
                height={24} /> */}
            </div>
          </div>
        </div>
        <div>
          <p
            suppressHydrationWarning
            className={'pl-2 pt-1 text-xs text-foreground'}>
              Receive 0.00 ynETH
            {/* {`Receive ${formatAmount(balanceOf?.normalized || 0, 2, 6)} ${token.symbol}`} */}
          </p>
        </div>
      </div>
    </section>
  )
}

export default RestakeETHForm
