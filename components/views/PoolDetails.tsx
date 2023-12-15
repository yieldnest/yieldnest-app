import Link from 'next/link'
import { truncateHex } from '@/lib/address'
import { YNETH_TOKEN } from '@/lib/tokens'

import { Info } from 'lucide-react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'

const PoolDetails = () => {

  const etherscanURL = 'https://goerli.etherscan.io/address/'

  return (
    <section className='flex w-full flex-col bg-card rounded-xl sm:max-w-md p-4'>
      <h1 className='text-3xl px-4'>Pool Details</h1>
      <div className='flex flex-col w-full p-4 gap-2'>
        <p>Restake ETH to receive ynETH</p>
        <p>{`ynETH is a liquid restaking token that earns yield from ETH vallidators 
          and Nodes running AVS’s in EigenLayer.`}</p>
      </div>
      <div className='flex flex-col w-full p-4 gap-2'>
        <div className='flex justify-between w-full'>
          <p>ynETH token</p>
          <Link href={`${etherscanURL}${YNETH_TOKEN.address}`} className='text-muted'>{
            truncateHex(YNETH_TOKEN.address, 6)}
          </Link>
        </div>
        <div className='flex justify-between w-full'>
          <p>ynETH pool</p>
          <Link href={`${etherscanURL}${process.env.NEXT_PUBLIC_YNETH_ADDRESS}`} className='text-muted'>
            {truncateHex(process.env.NEXT_PUBLIC_YNETH_ADDRESS, 6)}
          </Link>
        </div>
        <div className='flex justify-between w-full'>
          <div className='flex gap-1 items-center'>
            <p>Protocol Fee</p>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info className='h-4 w-4 cursor-pointer text-muted'/>
                </TooltipTrigger>
                <TooltipContent>
                  <p>10% to Node Operators</p>
                  <p>10% to ynDAO</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <p className='text-muted'>20%</p>
        </div>
        <div className='pt-4'>
          <div className='flex gap-1 items-center'>
            <h2 className='text-2xl'>AVS Modules</h2>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info className='h-4 w-4 cursor-pointer text-muted'/>
                </TooltipTrigger>
                <TooltipContent>
                  <p>This section lists the AVS modules that ynETH recieves rewards from.</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <div>
            <div className='flex justify-between items-center py-2'>
              <h3>ETH Validators</h3>
              <div className='flex'>
                <p>APY</p>
                <p className='text-muted pl-2'>4.12%</p>
              </div>
            </div>
            <p className='text-muted'>Rewards received from ETH validators.</p>
          </div>
          <div>
            <div className='flex justify-between items-center py-2'>
              <h3 >EigenDA</h3>
              <div className='flex'>
                <p>APY</p>
                <p className='text-muted pl-2'>--%</p>
              </div>
            </div>
            <p className='text-muted'>Data availability layer from EigenLayer.</p>
          </div>
        </div>
      </div>
    </section >
  )
}

export default PoolDetails
