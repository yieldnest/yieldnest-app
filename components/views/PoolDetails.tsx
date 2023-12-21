import Link from 'next/link'
import { truncateHex } from '@/lib/address'
import { YNETH_TOKEN } from '@/lib/tokens'

import { Info, ExternalLink } from 'lucide-react'
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
      <h1 className='text-3xl px-4'>ynETH Details</h1>
      <div className='flex flex-col w-full p-4 gap-2'>
        <p>Restake ETH to receive ynETH</p>
        <p>{`ynETH is a native liquid restaking token that earns yield from ETH validators 
          and AVSs on top of EigenLayer.`}
        <Link href={'https://docs.yieldnest.finance/protocol-design/native-liquid-restaking-tokens-nlrts/yneth-token'}
          className='pl-1 text-muted hover:text-primary/50'>
            [learn more here]
        </Link>
        </p>

      </div>
      <div className='flex flex-col w-full p-4 gap-2'>
        <div className='flex justify-between w-full'>
          <p>ynETH token</p>
          <Link href={`${etherscanURL}${YNETH_TOKEN.address}`} 
            className='text-muted flex gap-2 items-center'
            rel="noopener noreferrer" target="_blank">
            {truncateHex(YNETH_TOKEN.address, 6)}
            <ExternalLink className='h-4 w-4'/>
          </Link>
        </div>
        <div className='flex justify-between w-full'>
          <p>ynETH minter</p>
          <Link href={`${etherscanURL}${process.env.NEXT_PUBLIC_YNETH_ADDRESS}`} 
            className='text-muted flex gap-2 items-center'
            rel="noopener noreferrer" target="_blank">
            {truncateHex(process.env.NEXT_PUBLIC_YNETH_ADDRESS, 6)}
            <ExternalLink className='h-4 w-4'/>
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
                <p>APR</p>
                <p className='text-muted pl-2'>--%</p>
              </div>
            </div>
            <p className='text-muted'>Rewards received from ETH validators.</p>
          </div>
          <div>
            <div className='flex justify-between items-center py-2'>
              <h3 >EigenDA</h3>
              <div className='flex'>
                <p>APR</p>
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
