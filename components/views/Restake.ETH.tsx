
import { useState, useCallback, useEffect, useMemo } from 'react'
import assert from 'assert'
import { useWeb3 } from '@/contexts/useWeb3'
import { useBalance } from 'wagmi'
import { toNormalizedBN } from '@/lib/format.bigNumber'
import { ETH_TOKEN, YNETH_TOKEN } from '@/lib/tokens'
import { toAddress } from '@/lib/address'
import { depositETH } from '@/lib/actions'
import { defaultTxStatus } from '@/lib/wagmi/provider'
import { ButtonTx } from '@/components/ui/ButtonTx'
import { TxDialog } from '@/components/ui/txDialog'
import RestakeETHForm from './Restake.ETHForm'

import type { TTokenInfo } from '@/types/index'
import type { TTxStatus, TBaseError } from '@/types/transaction'
import type { TNormalizedBN } from '@/lib/format.bigNumber'

type DepositResult = {
  isSuccessful: boolean
  error: TBaseError
  receipt?: {
    transactionHash: string
  } 
}

export type TTransactionResult = {
  isSuccess: boolean,
  transactionHash?: string
  token?: TTokenInfo
  isError?: boolean
  error?: string
}

const ViewRestakeETH = ({ type }: { type: string }) => {
  // default TxResultMessage
  const defaultTxResultMessage={
    isSuccess: false, 
    isError: false,
    transactionHash: '',
    error: ''
  }

  const { isActive, provider, address, chainID } = useWeb3()
  const { data: balanceETH } = useBalance({
    address: address,
    watch: true,
  })

  const [ balance, setBalance ] = useState(toNormalizedBN(0))
  const [ amount, setAmount ] = useState<TNormalizedBN>(toNormalizedBN(0))
  const [ txStatus, setTxStatus ] = useState<TTxStatus>(defaultTxStatus)
  // Displays a message to the user after a transaction result is returned.
  const [ txResultMessage, setTxResultMessage ] = useState<TTransactionResult>(defaultTxResultMessage)
  const [ buttonLabel, setButtonLabel ] = useState<string>('Connect Wallet')
  // txHash is used for transaction message handling
  const [ txHash, setTxHash ] = useState<{ txHash: string }>({ txHash: '' })
  // Opens transaction dialog to display transaction progress.
  const [ isTxInProgress, setIsTxInProgress ] = useState(false)


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
    setTxResultMessage(defaultTxResultMessage)
    setIsTxInProgress(true)

    // Initiates an ETH deposit into ynETH and updates the txStatus.
    // Used by the ButtonTx component.
    const result = await depositETH({
      connector: provider,
      chainID: Number(process.env.NEXT_PUBLIC_BASE_CHAIN_ID),
      contractAddress: toAddress(process.env.NEXT_PUBLIC_YNETH_ADDRESS),
      amount: amount.raw,
      address: toAddress(address),
      statusHandler: setTxStatus,
      hashHandler: setTxHash,
    }) as DepositResult
    if (result.isSuccessful) {
      setAmount(toNormalizedBN(0))
      setTxResultMessage({
        isSuccess: true,
        transactionHash: result?.receipt?.transactionHash,
        token: YNETH_TOKEN
      })
    } else {
      setTxResultMessage({
        isSuccess: false,
        isError: true,
        error: result?.error?.details
      })
    }
  }, [isActive, amount])

  // ? ************************ DEBUGGING ************************ 
  // useEffect(() => {
  //   console.log('txHash -->', txHash?.txHash)
  // }, [txHash])

  return (
    <>
      <div className=''>
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
            className='w-full border-2 rounded-lg px-4 py-2'>
            {buttonLabel && txStatus.pending ? '' : buttonLabel}
          </ButtonTx>
        </div>
        {/* ---------------- Transaction Dialog Component ------------------ */}
        <TxDialog 
          isTxInProgress={isTxInProgress}
          txStatus={txStatus.pending}
          txHash={txHash?.txHash}
          txResultMessage={txResultMessage}
        />
      </div>
    </>
  )
}

export default ViewRestakeETH
