

import { useState, useCallback, useEffect } from 'react'
import { useWeb3 } from '@/contexts/useWeb3'
import { useBalance } from 'wagmi'
import { handleInputChangeEventValue } from '@/lib/helpers'
import { toNormalizedBN } from '@/lib/format.bigNumber'
import { formatAmount } from '@/lib/format.number'
import { ImageWithFallback } from '@/components/common/ImageWithFallback'
import { useDebouncedState } from '@react-hookz/web'
import { cn } from '@/lib/cn'
import { ArrowDown } from 'lucide-react'
import type { TNormalizedBN } from '@/lib/format.bigNumber'
import type { TTokenInfoArray } from '@/types/index'
import type { ChangeEvent, ReactElement } from 'react'


/**
 * WithdrawForm is a form component that allows users to withdraw their tokens.
 * It supports withdrawing of ETH tokens with support for other tokens coming soon.
 */
const WithdrawForm = ({ tokens, amount, onUpdateAmount, isDisabled}: {
  tokens: TTokenInfoArray,
	amount: TNormalizedBN,
	onUpdateAmount: (amount: TNormalizedBN) => void,
	isDisabled: boolean
}): ReactElement => {

  // ! State
  // balance is used to set a the user's token balance to a standard format, which is used to display in the form.
  const [ balance, setBalance ] = useState<[TNormalizedBN, TNormalizedBN]>([toNormalizedBN(0), toNormalizedBN(0)])
  // delayedAmount is used to smooth out the ynETHestimator read contract call and display the output in the form.
  const [ delayedAmount, setDelayedAmount ] = useDebouncedState(toNormalizedBN(0), 500, 1000)

  // ! Hooks
  const { isActive, address } = useWeb3()
  const { data: balanceETH } = useBalance({
    address: address,
    watch: true
  })
  const { data: balanceToken } = useBalance({
    address: address,
    token: tokens[0].address,
    watch: true
  })

  // Updates the balance when the balanceETH or balanceYNETH changes.
  useEffect(() => {
    if (balanceETH) {
      setBalance((prevBalance) => [prevBalance[0], toNormalizedBN(balanceETH.value)])}
    if (balanceToken) {
      setBalance((prevBalance) => [toNormalizedBN(balanceToken.value), prevBalance[1]])
    }
  }, [balanceETH, balanceToken])

  // The onChangeAmount function handles the change of the input value for the amount to be restaked.
  // It ensures that the new amount does not exceed the user's balance.
  // If the user is not active, it simply updates the amount.
  // If the new amount is greater than the user's balance, it sets the input value to the user's 
  // balance and updates the amount to the user's balance.
  // Otherwise, it simply updates the amount to the new amount.
  // ! Later on, we will change this to allow the user to input balances greater than their own and display an error.
  const onChangeAmount = useCallback((e: ChangeEvent<HTMLInputElement>): void => {
    const element = document.getElementById('amountToSend') as HTMLInputElement
    const newAmount = handleInputChangeEventValue(e, tokens[0]?.decimals || 18)
    if (!isActive) {
      return onUpdateAmount(newAmount)
    }
    if (newAmount.raw > balance[0]?.raw) {
      if (element?.value) {
        element.value = formatAmount(balance[0]?.normalized, 0, 18)
      }
      return onUpdateAmount(toNormalizedBN(balance[0]?.raw || 0))
    }
    onUpdateAmount(newAmount)
  }, [isActive, onUpdateAmount, tokens[0]?.decimals])

  useEffect(() => {
    // delayedAmount is used to smooth out the ynETHestimator read contract call.
    setDelayedAmount(amount)
  }, [amount, balance])

  return (
    <section className='w-full'>
      <form className={cn('flex w-full flex-col gap-4 rounded-md p-4 bg-background')}>
        <div className='flex justify-between items-center'>
          <input 
            className='w-full pl-2 border-none bg-background px-0 outline-none text-xl'
            type={'number'}
            inputMode={'numeric'}
            min={0}
            maxLength={20}
            step={1 / 10 ** (tokens[0]?.decimals || 18)}
            max={balance[0]?.normalized || 0}
            placeholder={'0.000000'}
            value={amount?.normalized || ''}
            onChange={onChangeAmount}
            onWheel={(e) => (e.target as HTMLInputElement).blur()}
          />
          <div className='flex items-center justify-center w-full max-w-[110px]
            border border-border rounded-lg gap-2 p-2'>
            <p className='pr-2'>
              {tokens[0].symbol}
            </p>
            <div className='h-6 w-6 flex items-center justify-center'>
              <ImageWithFallback
                alt={tokens[0].name}
                unoptimized
                src={tokens[0].logoURI}
                width={24}
                height={24} />
            </div>
          </div>
        </div>
        
        <div className='flex justify-between items-center'>
          <p
            suppressHydrationWarning
            className='pl-2 pt-1 text-xs text-foreground'>
            {`You have ${formatAmount(balance[0].normalized || 0, 2, 6)} ${tokens[0].symbol}`}
          </p>
          <button
            type={'button'}
            tabIndex={-1}
            onClick={(): void => onUpdateAmount(balance[0])}
            className={cn(`px-2 py-1 text-sm rounded-md border border-border transition-colors text-secondary 
            hover:bg-background`, isDisabled ? 'opacity-0 pointer-events-none' : '')}>
            {'Max'}
          </button>
        </div>
      </form>
      <div className='flex justify-center items center relative py-2'>
        <ArrowDown className='absolute -top-2 h-8 w-8 bg-secondary/30 text-background rounded-md' />
      </div>
      {/* Output section */}
      <div className={cn('flex w-full flex-col gap-4 rounded-md p-4 bg-background')}>
        <div className='flex justify-between items-center'>
          <div>
            <p className='w-full pl-2 border-none bg-background text-muted px-0 outline-none text-xl'>
              {/* Placeholder to represent a 1:1 exchange rate. */}
              {amount?.normalized ?
                formatAmount(amount?.normalized, 2, 6) 
                : 
                '0.00'
              }
            </p>
          </div>
          <div className='flex items-center justify-center w-full max-w-[110px]
            border border-border rounded-lg gap-2 p-2'>
            <p className='pr-2'>
              {tokens[1].symbol}
            </p>
            <div className='h-6 w-6 flex items-center justify-center'>
              <ImageWithFallback
                alt={tokens[1].name}
                unoptimized
                src={tokens[1].logoURI}
                width={24}
                height={24} />
            </div>
          </div>
        </div>
        <div>
          <p
            suppressHydrationWarning
            className='pl-2 pt-1 text-xs text-foreground'>
            {`You have ${formatAmount(balance[1]?.normalized || 0, 2, 6)} ${tokens[1].symbol}`}
          </p>
        </div>
      </div>
    </section>
  )
}

export default WithdrawForm
