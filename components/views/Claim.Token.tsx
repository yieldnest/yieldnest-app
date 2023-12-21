import { useState, useMemo } from 'react'
import { useWeb3 } from '@/contexts/useWeb3'
import { useBalance } from 'wagmi'
import { ButtonTx } from '@/components/ui/ButtonTx'
import { toNormalizedBN } from '@/lib/format.bigNumber'
import { ImageWithFallback } from '@/components/common/ImageWithFallback'
import { cn } from '@/lib/cn'

import type { TTokenInfoArray } from '@/types/index'
import type { TNormalizedBN } from '@/lib/format.bigNumber'

// ! This feature is currently inactive, and needs more development to be used.
const ViewClaimToken = ({ tokens }: { tokens: TTokenInfoArray }) => {
  const [ balance, setBalance ] = useState(toNormalizedBN(0))
  const [ amount, setAmount ] = useState<TNormalizedBN>(toNormalizedBN(0))
  const [ isDisabled, setIsDisabled ] = useState<boolean>(false)

  const { provider, address } = useWeb3()
  const { data: balanceToken } = useBalance({
    address: address,
    token: tokens[0].address,
    watch: true,
  })

  // Updates the balance when the balanceETH or balanceYNETH changes.
  useMemo(() => {
    if (balanceToken) {
      setBalance(toNormalizedBN(balanceToken.value))
    }

  }, [balanceToken])


  useMemo(() => {
    if (amount.raw > balance.raw) {
      setIsDisabled(false)
    }
  },[balanceToken])


  return (
    <>
      <div className='mt-4 flex flex-col justify-start gap-2'>
        <form className='flex w-full flex-col gap-4 rounded-md p-4 bg-background'>
          <div className='flex justify-between items-center'>
            <input 
              className='w-full pl-2 overflow-x-scroll border-none bg-background px-0 outline-none text-xl'
              type={'number'}
              inputMode={'numeric'}
              min={0}
              maxLength={20}
              step={1 / 10 ** (tokens[0]?.decimals || 18)}
              max={balance?.normalized || ''}
              placeholder={'0.000000'}
              value={amount?.normalized || ''}
              // onChange={(amount): void => onChangeAmount(amount)}
              onWheel={(e) => (e.target as HTMLInputElement).blur()}
            />
            <div className='flex items-center justify-between border border-border rounded-lg gap-2 p-2'>
              <p className='pr-2'>
                {tokens[0].symbol}
              </p>
              <div className='h-6 w-6 flex items-center justify-center'>
                <ImageWithFallback
                  alt={tokens[0].name}
                  unoptimized
                  src={'/yn-icon.svg'}
                  width={24}
                  height={24} />
              </div>
            </div>
          </div>
          <div className='flex justify-between items-center'>
            <p
              className='pl-2 pt-1 text-xs text-foreground'>
              {`You have 0.00 ${tokens[0].symbol} available for withdraw`}
            </p>
            <button
              type={'button'}
              tabIndex={-1}
              onClick={(): void => setAmount(balance)}
              disabled={isDisabled}
              className={cn(`px-2 py-1 text-sm rounded-md border border-border transition-colors text-secondary 
            hover:bg-background`, isDisabled ? 'opacity-0 pointer-events-none' : '')}>
              {'Max'}
            </button>
          </div>
        </form>
        <div className='p-2 flex justify-between'>
          <p>Time since withdraw request</p>
          <p>-- days</p>
        </div>
        <div className='border border-border mb-4 rounded-md'>
          <p className='p-2 text-sm'>{`You must make a withdraw request before you can withdraw. 
          After unstaking your ETH will be available for withdrawal after 7-10 days.`}</p>
        </div>
        <ButtonTx
          onClick={async (): Promise<void> => {
            // Function to unstake ETH from the pool goes here.
          }}
          // isBusy={txStatus.pending}
          // ! Button is currently disabled. Remove true to enable.
          isDisabled={!provider || true}
          className='w-full md:w-[184px] border-2 rounded-lg px-4 py-2'>
          {'Claim'}
        </ButtonTx>
      </div>
    </>
  )
}

export default ViewClaimToken
