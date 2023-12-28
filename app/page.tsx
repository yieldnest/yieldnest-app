'use client'
import Link from 'next/link'

import { ImageWithFallback } from '@/components/common/ImageWithFallback'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { YNETH_TOKEN, ETH_TOKEN } from '@/lib/tokens'
import { useWeb3 } from '@/contexts/useWeb3'
import { usePoolData } from '@/hooks/usePoolData'
import { formatAmount } from '@/lib/format.number'
import { useFetch } from '@/hooks/useFetch'

import ContactForm from '@/components/common/ContactForm'

import { Info, ArrowRight, ExternalLink } from 'lucide-react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'

const avsArray = [
  {
    name: 'EigenDA', 
    logoURI: '/logos/eigenda.jpeg',
    link: 'https://twitter.com/eigen_da',
    description: `EigenDA is an AVS on Eigenlayer providing low-cost, 
    hyperscale data availability to rollups, secured by ETH restaking.
    `,
    apr: 3.54
  },
  {
    name: 'AltLayer', 
    logoURI: '/logos/altlayer.svg',
    link: 'https://twitter.com/alt_layer',
    description: `Altlayer is a decentralized protocol that facilitates the 
    launch of native and restaked rollups with both optimistic and zk rollup stacks.
    `,
    apr: 3.08
  },
  {
    name: 'Espresso Systems', 
    logoURI: '/logos/espresso.svg',
    link: 'https://twitter.com/EspressoSys',
    description: `The Espresso Sequencer is designed to offer rollups a means of 
    achieving credible neutrality, enhanced interoperability, & long-term alignment with Ethereum.`,
    apr: 2.64
  },
]

const Index = () => {

  const { isActive } = useWeb3()
  const { poolData } = usePoolData(YNETH_TOKEN)

  const {data: prices} = useFetch<any>({
    endpoint: 'https://api.curve.fi/api/getETHprice',
  })

  const tokenIcons = [
    {
      name: 'crvUSD',
      logoURI: '/logos/crvUSD-logo.png'
    },
    {
      name: 'FRAX',
      logoURI: '/logos/frax-logo.svg'
    },{
      name: 'sDAI',
      logoURI: '/logos/sdai-logo.svg'
    },
  ]

  const tryLSDIcons = [
    {
      name: 'wstETH',
      logoURI: '/logos/wsteth-icon.svg'
    },
    {
      name: 'rETH',
      logoURI: '/logos/reth-icon.png'
    },{
      name: 'sfrxETH',
      logoURI: '/logos/sfrx-icon.png'
    },
  ]


  return (
    <main className="flex flex-col h-full w-full items-center justify-between mt-14">
      <section className='mt-4 mb-8 w-5/6'>
        <h1 className='text-3xl font-bold text-center mx-auto'>YieldNest Overview</h1>
        <div className='grid grid-cols-2 items-center gap-4 my-6 md:flex md:flex-row md:justify-center'>
          <div className='flex flex-col justify-between gap-2 h-full'>
            <h2 className='text-lg text-foreground/60'>Total Value Restaked</h2>
            <p className='text-2xl'>$12,032,321</p>
          </div>
          <Separator orientation='vertical' className=' hidden md:block md:h-[68px] text-muted'/>
          <div className='flex flex-col justify-between gap-2 h-full'>
            <h2 className='text-lg text-foreground/60'>Total Rewards Paid</h2>
            <p className='text-2xl'>$3,032,321</p>
          </div>
          <Separator orientation='vertical' className='hidden md:block md:h-[68px] text-muted'/>
          <div className='flex flex-col justify-between gap-2 h-full'>
            <h2 className='text-lg text-foreground/60'>Total Restakers</h2>
            <p className='text-2xl'>1,234</p>
          </div>
          <Separator orientation='vertical' className='hidden md:block md:h-[68px] text-muted'/>
          <div className='flex flex-col justify-between gap-2 h-full'>
            <h2 className='text-lg text-foreground/60'>Total EigenLayer Points</h2>
            <p className='text-2xl'>324,231,763</p>
          </div>
        </div>
      </section>
      <div className='flex mb-4 w-11/12'>
        <h2 className='text-3xl'>Liquid Restaking Tokens</h2>
      </div>
      <section className='flex flex-col justify-center gap-4 w-11/12 md:flex-row md:justify-between'>
        {/* ----------------------Restaking pool card 1 ---------------------- */}
        <div className='flex flex-col gap-2 w-full max-w-[360px] sm:w-1/2 md:w-1/3 
        rounded-lg border border-border/50 pb-4 mx-auto flex-1'>
          {/* title section */}
          <div className='flex flex-col w-full justify-center items-center h-[80px] pt-4 pb-2'>
            <h3 className='text-3xl'>ynETH</h3>
          </div>
          {/* details section */}
          <Separator className=''/>
          <div className='flex justify-between pt-4 px-4 flex-1'>
            <p>{`ynETH is a native liquid restaking token that earns yield from ETH validators 
          and AVSs on top of EigenLayer.`}</p>
          </div>
          <div className='bg-border/50 h-[1px] mx-4'/>
          <div className='flex justify-between px-4'>
            <p className='text-foreground/60'>Assets</p>
            <ImageWithFallback
              alt={ETH_TOKEN.name}
              unoptimized
              src={ETH_TOKEN.logoURI}
              width={24}
              height={24} />
          </div>
          <div className='bg-border/50 h-[1px] mx-4'/>
          <div className='flex justify-between px-4'>
            <p className='text-foreground/60'>Total Restaked</p>
            <p className='font-bold'>$12,032,321</p>
          </div>
          <div className='bg-border/50 h-[1px] mx-4'/>
          <div className='flex justify-between px-4'>
            <p className='text-foreground/60'>My Position</p>

            {Number(poolData.userBalance.normalized) && isActive ?
              <p >$
                {formatAmount(Number(poolData.userBalance.normalized) * Number(prices?.data?.price), 2, 4)}
              </p>
              :
              '--'}

          </div>
          <div className='bg-border/50 h-[1px] mx-4'/>
          <div className='flex justify-between px-4'>
            <p className='text-foreground/60'>Retakers</p>
            <p className='font-bold'>1,234</p>
          </div>
          <div className='bg-border/50 h-[1px] mx-4'/>
          <div className='flex justify-between px-4'>
            <p className='text-foreground/60'>AVS Modules</p>
            <div className='flex gap-1'>
              {avsArray.map((avs, index) => {
                return (
                  <Link href={avs.link} key={index}>
                    <ImageWithFallback
                      alt={avs.name}
                      unoptimized
                      src={avs.logoURI}
                      width={24}
                      height={24} />
                  </Link>
                )
              })}
            </div>
          </div>
          <div className='flex justify-between mx-10 my-4 px-4 py-2 bg-muted/20 rounded-md'>
            <div className='flex gap-1 items-center'>
              <p className='text-foreground/60'>APR</p>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className='h-3 w-3 cursor-pointer text-muted'/>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Moving Average of APR for a 7 day period.</p>
                    <p>ETH staking: 3.85%</p>
                    <p>Restaking: 9.26%</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <ArrowRight />
            <p className='font-bold'>13.11%</p>
          </div>
          <div className='w-full flex-1 py-2 px-4'>
            <Link href={`/${YNETH_TOKEN.chainId}/${YNETH_TOKEN.address}`}>
              <Button className='w-full text-xl h-12'>Restake</Button>
            </Link>
          </div>
        </div>
        {/* ----------------------Restaking pool card 2---------------------- */}
        <div className='flex flex-col gap-2 w-full h-full max-w-[360px] sm:w-1/2 md:w-1/3 
        rounded-lg border border-border/50 pb-4 text-foreground/60 mx-auto flex-1'>
          {/* title section */}
          <div className='flex flex-col w-full justify-center items-center h-[80px] pt-4 pb-2'>
            <h3 className='text-3xl'>ynTryLSD</h3>
            <p className='text-sm'>(Coming Soon)</p>
          </div>
          {/* details section */}
          <Separator className=''/>
          <div className='flex justify-between pt-4 px-4 flex-1'>
            <p>{`ynTryLSD is a liquid restaking token based on the TryLSD LP pool on curve.fi. 
            You can view the pool here:`}
            <Link href={'https://curve.fi/#/ethereum/pools/factory-tricrypto-14/deposit'}
              rel="noopener noreferrer" target="_blank"
              className='text-primary z-10 px-1 inline-block'>curve.fi</Link>
            <ExternalLink className='h-3 w-3 inline-block text-primary'/>
            </p>
          </div>
          <div className='bg-border/50 h-[1px] mx-4'/>
          <div className='flex justify-between px-4'>
            <p>Assets</p>
            <div className='flex gap-1 items-center'>
              {tryLSDIcons.map((token, index) => {
                return (
                  <ImageWithFallback
                    key={index}
                    alt={token.name}
                    unoptimized
                    src={token.logoURI}
                    width={24}
                    height={24} />
                )
              })}
            </div>
          </div>
          <div className='bg-border/50 h-[1px] mx-4'/>
          <div className='flex justify-between px-4'>
            <p>Total Restaked</p>
            <p className='font-bold'>$--</p>
          </div>
          <div className='bg-border/50 h-[1px] mx-4'/>
          <div className='flex justify-between px-4'>
            <p>My Position</p>
            <p className='font-bold'>$--</p>
          </div>
          <div className='bg-border/50 h-[1px] mx-4'/>
          <div className='flex justify-between px-4'>
            <p>Retakers</p>
            <p className='font-bold'>--</p>
          </div>
          <div className='bg-border/50 h-[1px] mx-4'/>
          <div className='flex justify-between px-4'>
            <p>AVS Modules</p>
            <div className='flex gap-1'>
              {avsArray.map((avs, index) => {
                return (
                  <Link href={avs.link} key={index}>
                    <ImageWithFallback
                      alt={avs.name}
                      unoptimized
                      src={avs.logoURI}
                      width={24}
                      height={24} />
                  </Link>
                )
              })}
            </div>
          </div>
          <div className='flex justify-between mx-10 my-4 px-4 py-2 bg-muted/20 rounded-md'>
            <div className='flex gap-1 items-center'>
              <p>APR</p>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className='h-3 w-3 cursor-pointer text-muted'/>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Moving Average of APR for a 7 day period.</p>
                    <p>ETH staking: --%</p>
                    <p>Restaking: --%</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <ArrowRight />
            <p className='font-bold'>--%</p>
          </div>
          <div className='w-full py-2 px-4'>
            <Button disabled className='w-full text-xl h-12'>Coming Soon</Button>
          </div>
        </div>
        {/* ----------------------Restaking pool card 3---------------------- */}
        <div className='flex flex-col gap-2 w-full max-w-[360px] sm:w-1/2 md:w-1/3 
        rounded-lg border border-border/50 pb-4 text-foreground/60 mx-auto flex-1'>
          {/* title section */}
          <div className='flex flex-col w-full justify-center items-center h-[80px] pt-4 pb-2'>
            <h3 className='text-3xl'>ynXYZ</h3>
            <p className='text-sm'>(Contact Us)</p>
          </div>
          {/* details section */}
          <Separator className=''/>
          <div className='flex justify-between pt-4 px-4 flex-1'>
            <p>{`ynXYZ is a restaking pool based on an ERC-20 token. 
            Some examples could be crvUSD, Frax, USDC, or more.`}</p>
          </div>
          <div className='bg-border/50 h-[1px] mx-4'/>
          <div className='flex justify-between px-4'>
            <p>Assets</p>
            <div className='flex gap-1 items-center'>
              {tokenIcons.map((token, index) => {
                return (
                  <ImageWithFallback
                    key={index}
                    alt={token.name}
                    unoptimized
                    src={token.logoURI}
                    width={24}
                    height={24} />
                )
              })}
            </div>
          </div>
          <div className='bg-border/50 h-[1px] mx-4'/>
          <div className='flex justify-between px-4'>
            <p>Total Restaked</p>
            <p className='font-bold'>$--</p>
          </div>
          <div className='bg-border/50 h-[1px] mx-4'/>
          <div className='flex justify-between px-4'>
            <p>My Position</p>
            <p className='font-bold'>$--</p>
          </div>
          <div className='bg-border/50 h-[1px] mx-4'/>
          <div className='flex justify-between px-4'>
            <p>Retakers</p>
            <p className='font-bold'>--</p>
          </div>
          <div className='bg-border/50 h-[1px] mx-4'/>
          <div className='flex justify-between px-4'>
            <p>AVS Modules</p>
            <div className='flex gap-1'>
              {avsArray.map((avs, index) => {
                return (
                  <Link href={avs.link} key={index}>
                    <ImageWithFallback
                      alt={avs.name}
                      unoptimized
                      src={avs.logoURI}
                      width={24}
                      height={24} />
                  </Link>
                )
              })}
            </div>
          </div>
          <div className='flex justify-between mx-10 my-4 px-4 py-2 bg-muted/20 rounded-md'>
            <div className='flex gap-1 items-center'>
              <p>APR</p>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className='h-3 w-3 cursor-pointer text-muted'/>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Moving Average of APR for a 7 day period.</p>
                    <p>Restaking: --%</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <ArrowRight />
            <p className='font-bold'>--%</p>
          </div>
          <div className='w-full py-2 px-4'>
            {/* Contact form component */}
            <ContactForm />
          </div>
        </div>
      </section>
    </main>
  )
}
export default Index
