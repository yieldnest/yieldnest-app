import { useState, useCallback, useEffect, useMemo, ReactNode } from 'react'
import Link from 'next/link'
import assert from 'assert'
import { useWeb3 } from '@/contexts/useWeb3'
import { useBalance, useWalletClient } from 'wagmi'
import { toNormalizedBN } from '@/lib/format.bigNumber'
import { ETH_TOKEN, YNETH_TOKEN } from '@/lib/tokens'
import { toAddress } from '@/lib/address'
import { depositETH } from '@/lib/actions'
import { defaultTxStatus } from '@/lib/wagmi/provider'
import { ButtonTx } from '@/components/ui/ButtonTx'
import { Button } from '@/components/ui/button'
import { ExternalLink } from 'lucide-react'
import RestakeETHForm from './Restake.ETHForm'

import type { TTxStatus, TBaseError } from '@/types/transaction'
import type { TNormalizedBN } from '@/lib/format.bigNumber'

type DepositResult = {
  isSuccessful: boolean
  error: TBaseError
  receipt?: {
    transactionHash: string
  } 
}

const ViewRestakeETH = ({ type }: { type: string }) => {

  const { isActive, provider, address, chainID } = useWeb3()
  const { data: balanceETH } = useBalance({
    address: address,
    watch: true,
  })

  const [ balance, setBalance ] = useState(toNormalizedBN(0))
  const [ amount, setAmount ] = useState<TNormalizedBN>(toNormalizedBN(0))
  const [ txStatus, setTxStatus ] = useState<TTxStatus>(defaultTxStatus)
  // Displays a message to the user after a transaction result is returned.
  const [ txResultMessage, setTxResultMessage ] = useState<ReactNode>('')
  const [ buttonLabel, setButtonLabel ] = useState<string>('Connect Wallet')

  // Updates the balance when the balanceETH changes.
  useEffect(() => {
    if (balanceETH) {
      setBalance(toNormalizedBN(balanceETH.value))
    }
  }, [balanceETH])

  const onChangeAmount = useCallback((amount: TNormalizedBN): void => {
    setAmount(amount)
  }, [amount])

  useEffect(() => {
    if (isActive && chainID === Number(process.env.NEXT_PUBLIC_DEFAULT_CHAIN_ID)) {
      setButtonLabel('Restake')
    } else if (!isActive && chainID !== Number(process.env.NEXT_PUBLIC_DEFAULT_CHAIN_ID)) {
      setButtonLabel('Invalid Network')
    } else {
      setButtonLabel('Connect Wallet')
    }
  }, [isActive, chainID])

  // Checks if a users balance is greater than 0 and less than or equal to their balance.
  // Used to enable/disable the deposit button.
  const canDeposit = useMemo((): boolean => {
    return  (amount.raw > 0n) && (amount.raw <= (balance?.raw || 0n))
  }, [amount, balance])

  // Handles the deposit transcation and updates the txStatus.
  const onDeposit = useCallback(async (): Promise<void> => {
    assert(isActive, 'Wallet not connected')
    assert(provider, 'Provider not connected')
    setTxResultMessage('')
    // TODO: Add a pending transaction message while waiting for result.

    // Initiates an ETH deposit into ynETH and updates the txStatus.
    // Used by the ButtonTx component.
    const result = await depositETH({
      connector: provider,
      chainID: Number(process.env.NEXT_PUBLIC_BASE_CHAIN_ID),
      contractAddress: toAddress(process.env.NEXT_PUBLIC_YNETH_ADDRESS),
      amount: amount.raw,
      minAmount: 0n,
      statusHandler: setTxStatus
    }) as DepositResult
    if (result.isSuccessful) {
      setAmount(toNormalizedBN(0))
      setTxResultMessage(
        <>
          <div className='flex mt-2 items-center justify-center'>
            <p className=''>Transaction Successful! View Tx</p>
            <Link href={`https://goerli.etherscan.io/tx/${result?.receipt?.transactionHash}`} 
              rel="noopener noreferrer" target="_blank">
              <ExternalLink className='h-6 w-6 ml-2 text-primary hover:text-accent'/>
            </Link>       
          </div>
          <div className='flex mt-2 items-center justify-center'>
            <Button
              className='bg-primary/60'
              onClick={addTokenToWallet}
            >
              Add ynETH to Wallet
            </Button>
          </div>
        </>
      )
    } else {
      setTxResultMessage(<p className='text-sm text-red-500'>{result?.error?.details}</p>)}

  }, [isActive, amount])

  // ? ************************ DEBUGGING ************************ 
  useEffect(() => {
    // console.log('canDeposit -->', canDeposit)
    // console.log('balanceETH -->', balanceETH)
  }, [canDeposit])

  // TODO: Move this to provider.ts to be reused by other tokens.
  const addTokenToWallet = async () => {
    const ethereumWindow: any = window
    const wasAdded = await ethereumWindow.ethereum?.request({
      method: 'wallet_watchAsset',
      params: {
        type: 'ERC20',
        options: {
          address: YNETH_TOKEN.address,
          symbol: YNETH_TOKEN.symbol, 
          decimals: YNETH_TOKEN.decimals, 
          image: '/yn-icon.svg',
        },
      },
    })
    // TODO: Add a message to the user if the token was added or not.
  }

  return (
    <>
      <div className='pt-4'>
        <div className='mt-5 grid gap-5'>
          <RestakeETHForm
            tokens={[ETH_TOKEN, YNETH_TOKEN]}
            amount={amount.raw === -1n ? toNormalizedBN(0) : amount}
            onUpdateAmount={(amount): void => onChangeAmount(amount)}
            isDisabled={false} />
        </div>
        {/* <div className='flex text-sm justify-between mt-4 mx-1'>
          <p>
            Estimated gas fee
          </p>
          <div className='flex'>
            <p>
              0.00
            </p>
            <Settings className='h-4 w-4 ml-2 hover:animate-spin-slow hover:cursor-pointer' />
          </div>
        </div> */}
      </div>
      <div className='mt-4 flex flex-col justify-start gap-2'>
        <div >
          <ButtonTx
            onClick={async (): Promise<void> => {
              onDeposit()
            }}
            isBusy={txStatus.pending}
            isDisabled={!canDeposit || !provider || !isActive || 
              chainID !== Number(process.env.NEXT_PUBLIC_DEFAULT_CHAIN_ID)}
            className='w-full md:w-[184px] border-2 rounded-lg px-4 py-2'>
            {buttonLabel && txStatus.pending ? '' : buttonLabel}
          </ButtonTx>
        </div>
        {txResultMessage && 
          txResultMessage 
        }
      </div>
    </>
  )
}

export default ViewRestakeETH
