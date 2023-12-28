import { useState, useMemo } from 'react'
import Link from 'next/link'
import { YNETH_TOKEN } from '@/lib/tokens'
import { truncateHex } from '@/lib/address'
import { useCopyToClipboard } from '@/hooks/useCopyToClipboard'
import { Copy, ExternalLink, Loader, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

import type { TTransactionResult } from '@/components/views/Restake.ETH'

type txProgress = {
  isTxInProgress: boolean
  txStatus: boolean
  txHash: string
  txResultMessage: TTransactionResult
}


export function TxDialog({ isTxInProgress, txStatus, txHash, txResultMessage }: txProgress) {

  const [isDialogOpen, setIsDialogOpen] = useState(isTxInProgress)
  const [ addressToCopy, setAddressToCopy ] = useState('')
  const handleCopy = useCopyToClipboard(addressToCopy)

  useMemo(() => {
    setAddressToCopy(txHash)
  }, [txHash])

  // Functions to open/cose the dialog
  useMemo(() => {
    setIsDialogOpen(isTxInProgress)
  },[isTxInProgress])

  const handleDialog = () => {
    setIsDialogOpen(!isDialogOpen)
  }

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
    <Dialog open={isDialogOpen}>
      <DialogTrigger asChild>
        {isTxInProgress &&
        <Button 
          onClick={handleDialog}>
          Transaction Progress
        </Button>
        }
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className='text-2xl'>Transaction Pending</DialogTitle>
        </DialogHeader>
        
        <div className="flex flex-col justify-center items-center my-2">
          {txStatus ? 
            <div className='flex flex-col p-4 items-center'>
              <Loader className='h-10 w-10 text-primary/80 animate-spin-slow my-4 mx-auto' />
              {txHash ? 
                <div className='text-lg'>
                  <p className=' text-left text-muted'>
                    <span className='text-muted pr-1'>Step 1:</span>
                    Transaction confirmed.
                    <span><CheckCircle className='h-8 w-8 text-primary/80 pl-2 inline-block' /></span>
                  </p>
                  <p className='text-left'>
                    <span className='pr-1'>Step 2:</span> 
                    Your transaction is waiting to be included in a block.
                  </p>  
                </div>
                :
                <div className='text-lg'>
                  <p className='text-left'>
                    <span className='pr-1'>Step 1:</span>
                    Transaction pending. View your wallet to confirm transaction.
                  </p>
                  <p className='text-muted text-left'>
                    <span className='pr-1'>Step 2:</span> 
                    Your transaction is waiting to be included in a block.
                  </p>  
                </div>
              }
            </div>
            : 
            ''
          }
          

          {txResultMessage.isSuccess &&
            <>
              <div className='flex flex-col items-center justify-center'>
                <p className='text-xl text-primary'>Transaction Successful!</p>
                <div className='flex items-center justify-center mt-4'>
                  <p className='text-muted'>View Transaction</p>
                  <Link href={`https://goerli.etherscan.io/tx/${txResultMessage?.transactionHash}`} 
                    rel='noopener noreferrer' target='_blank'>
                    <ExternalLink className='h-4 w-4 ml-1 text-muted hover:text-primary/60'/>
                  </Link>    
                </div>   

                <div className={`flex items-center gap-2 text-muted tx-sm mb-4 
                hover:cursor-pointer hover:text-primary/60`} 
                onClick={handleCopy}>
                  <p>{truncateHex(txResultMessage?.transactionHash, 6)}</p>
                  <Copy className='h-3 w-3' />
                </div>
                
              </div>
              <div className='flex mt-2 items-center justify-center'>
                <Button
                  className='bg-background hover:bg-primary/30'
                  onClick={addTokenToWallet}
                >
                Add ynETH to Wallet
                </Button>
              </div>
            </>
          }
          {txResultMessage.isError && <p className='text-sm text-red-500'>{txResultMessage?.error}</p>}
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button 
              type="button" 
              onClick={handleDialog}>
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
