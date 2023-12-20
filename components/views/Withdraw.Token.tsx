import { useState, useCallback, useEffect, useMemo } from 'react'
import Link from 'next/link'
import { useWeb3 } from '@/contexts/useWeb3'
import { useBalance } from 'wagmi'
import { toNormalizedBN } from '@/lib/format.bigNumber'
import { ETH_TOKEN, YNETH_TOKEN } from '@/lib/tokens'
import { defaultTxStatus } from '@/lib/wagmi/provider'
import { ButtonTx } from '@/components/ui/ButtonTx'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXTwitter, faDiscord } from '@fortawesome/free-brands-svg-icons'

import WithdrawForm from './Withdraw.Form'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'

import type { TTxStatus } from '@/types/transaction'
import type { TTokenInfoArray } from '@/types/index'
import type { TNormalizedBN } from '@/lib/format.bigNumber'

const ViewWithdrawToken = ({ tokens }: { tokens: TTokenInfoArray }) => {

  const { isActive, provider, address, chainID } = useWeb3()
  const { data: balanceToken } = useBalance({
    address: address,
    token: tokens[0].address,
    watch: true,
  })

  const [ balance, setBalance ] = useState(toNormalizedBN(0))
  const [ amount, setAmount ] = useState<TNormalizedBN>(toNormalizedBN(0))
  const [ txStatus, setTxStatus ] = useState<TTxStatus>(defaultTxStatus)
  const [ buttonLabel, setButtonLabel ] = useState<string>('Connect Wallet')

  useEffect(() => {
    if (balanceToken) {
      setBalance(toNormalizedBN(balanceToken.value))
    }
  }, [balanceToken])

  useEffect(() => {
    if (isActive && chainID === Number(process.env.NEXT_PUBLIC_DEFAULT_CHAIN_ID)) {
      setButtonLabel('Restake')
    } else if (!isActive && chainID !== Number(process.env.NEXT_PUBLIC_DEFAULT_CHAIN_ID)) {
      setButtonLabel('Invalid Network')
    } else {
      setButtonLabel('Connect Wallet')
    }
  }, [isActive, chainID])

  const onChangeAmount = useCallback((amount: TNormalizedBN): void => {
    setAmount(amount)
  }, [amount])

  // Checks if a users balance is greater than 0 and less than or equal to their balance.
  // Used to enable/disable the deposit button.
  const canDeposit = useMemo((): boolean => {
    return  (amount.raw > 0n) && (amount.raw <= (balance?.raw || 0n))
  }, [amount, balance])

  return (
    <>
      <div className='pt-4'>
        <div className='mt-5 grid gap-5'>
          <WithdrawForm
            tokens={[YNETH_TOKEN, ETH_TOKEN]}
            amount={amount.raw === -1n ? toNormalizedBN(0) : amount}
            onUpdateAmount={(amount): void => onChangeAmount(amount)}
            isDisabled={false} />
        </div>
      </div>
      <div className='mt-4 flex flex-col justify-start gap-2'>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <ButtonTx
                onClick={async (): Promise<void> => {
                  // Function to unstake ETH from the pool goes here.
                }}
                isBusy={txStatus.pending}
                // ! Button is currently disabled. Remove true to enable.
                isDisabled={!canDeposit || !provider || true}
                className='w-full border-2 rounded-lg px-4 py-2'>
                {buttonLabel && txStatus.pending ? '' : buttonLabel}
              </ButtonTx>
            </TooltipTrigger>
            <TooltipContent>
              <p>Unstake is currently disabled.</p>
              <p>Follow us to get the latest updates.</p>
              <Link href='https://twitter.com/YieldNestFi'
                rel="noopener noreferrer" target="_blank">
                <FontAwesomeIcon 
                  icon={faXTwitter}
                  className='text-primary h-6 w-6 py-2 pr-2 hover:text-primary/50' />
              </Link>
              <Link href='https://discord.gg/ayAZuQgFaE'
                rel="noopener noreferrer" target="_blank">
                <FontAwesomeIcon 
                  icon={faDiscord}
                  className='text-primary h-6 w-6 py-2 pr-2 hover:text-primary/50' />
              </Link>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </>
  )
}

export default ViewWithdrawToken
