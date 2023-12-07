import { useState, useCallback, useEffect } from 'react'
import { useWeb3 } from '@/contexts/useWeb3'
import { useBalance } from 'wagmi'
import { toNormalizedBN } from '@/lib/format.bigNumber'
import { ETH_TOKEN } from '@/lib/tokens'

import RestakeETHForm from './Restake.ETHForm'

import type { TNormalizedBN } from '@/lib/format.bigNumber'

const ViewRestakeETH = () => {
  // ! Hooks
  const { isActive, provider, address } = useWeb3()
  const { data: balanceETH, isError, isLoading } = useBalance({
    address: address,
  })


  // ! State
  const [ amount, setAmount ] = useState<TNormalizedBN>(toNormalizedBN(0))

  const onChangeAmount = useCallback((amount: TNormalizedBN): void => {
    setAmount(amount)

    // performBatchedUpdates((): void => {
    // 	set_amount(newAmount);
    // });
  }, [amount])


  // ? ************************ DEBUGGING ************************ 
  useEffect(() => {
    console.log('amount -->', amount)
    console.log('balanceETH -->', balanceETH)
  }, [amount, balanceETH])

  return (
    <>
      <div className={'pt-4'}>
        <div className={'mt-5 grid gap-5'}>
          <RestakeETHForm
            token={ETH_TOKEN}
            amount={amount.raw === -1n ? toNormalizedBN(0) : amount}
            onUpdateAmount={(amount): void => onChangeAmount(amount)}
            isDisabled={false} />
        </div>
      </div>
      <div className={'mt-10 flex justify-start'}>
        <div className={'flex w-full flex-row space-x-4'}>
          {/* <ButtonY
						onClick={async (): Promise<void> => (
							!shouldApproveDeposit ? onApprove(
								toAddress(process.env.POOL_ADDRESS),
								'poolAllowance',
								set_txStatus
							) : onDeposit()
						)}
						isBusy={shouldApproveDeposit ? txStatus.pending : txStatusDeposit.pending}
						isDisabled={!canDeposit || !provider || toBigInt(estimateOut.value) === 0n}
						variant={'outlined'}
						className={'w-full md:w-[184px]'}>
						{shouldApproveDeposit ? 'Approve for Deposit' : 'Deposit'}
					</ButtonY> */}
        </div>
      </div>
    </>
  )
}

export default ViewRestakeETH
