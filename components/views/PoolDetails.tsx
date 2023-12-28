import Link from 'next/link'
import { truncateHex } from '@/lib/address'
import { YNETH_TOKEN } from '@/lib/tokens'
import { ImageWithFallback } from '@/components/common/ImageWithFallback'
import { formatColor } from '@/lib/format.colors'

import PoolValidators from '@/components/views/PoolDetails.Validators'

import { ExternalLink } from 'lucide-react'

import type { TTokenInfoArray } from '@/types/index'
type PoolOverviewProps = {
  token: TTokenInfoArray
}

const PoolDetails = (props: PoolOverviewProps) => {

  const etherscanURL = 'https://goerli.etherscan.io/address/'

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

  return (
    <>
      {/* Details section */}
      <section className='flex w-full flex-col bg-card rounded-xl p-4'>
        <h2 className='text-3xl px-4'>{props.token[0].symbol} Details</h2>
        <div className='w-full p-4 text-sm text-muted'>
          <p className=''>{` 
          ynETH is a native liquid restaking token that earns yield from 
          ETH validators and AVSs on top of EigenLayer. 
          Restake ETH to receive ynETH to earn rewards from ETH staking and AVSs.`}</p>
          <div className='flex items-center text-foreground'>
            <Link 
              href={'https://docs.yieldnest.finance/protocol-design/native-liquid-restaking-tokens-nlrts/yneth-token'}
              rel="noopener noreferrer" target="_blank"
              className='text-primary hover:text-primary/40 flex items-center gap-1'>
            learn more 
              <ExternalLink className='h-3 w-3'/>
            </Link>
          </div>
          {/* --------------------------- Protocol Economics --------------------------- */} 
          <div className='flex w-full my-2 gap-4'>
            <div className='text-muted text-sm'>
              <h3 className='text-foreground text-xl'>Protocol Economics</h3>
              <p className=''>
                {`YieldNest does not have any hidden fees. The protocol generates rewards and distrubutes 
                earnings to protocol participants.`}
              </p>
              <p>Restakers receive <span className='text-foreground'>80%</span> of protocol rewards.</p>
              <p>YND holders recieve <span className='text-foreground'>10%</span></p>
              <p>Node Operators reveive <span className='text-foreground'>10%</span></p>
            </div>
          </div>
        </div>
      </section>  
      {/* Validators section */}
      <section className='flex w-full flex-col bg-card rounded-xl p-4'>
        <h2 className='text-3xl px-4'>{props.token[0].symbol} Operators</h2>
        <PoolValidators />
      </section>  
      <section className='flex w-full flex-col bg-card rounded-xl p-4'>
        <h2 className='text-3xl px-4'>AVS Strategies</h2>
        <p className='px-4 text-muted'>This section lists the AVS modules that ynETH recieves rewards from.</p>
        <div className='flex flex-col w-full p-4 gap-2'>
          <div className='pt-4'>
            <div className='rounded-md bg-background p-2'>
              <div className='flex justify-between items-center py-2'>
                <h3>ETH Staking</h3>
                <div className='flex'>
                  <p className='text-muted pl-2'>APR</p>
                  <p className='pl-2'>3.85%</p>
                </div>
              </div>
              <p className='text-muted text-sm'>{`Stake ETH to secure the Ethereum network and earn rewards.`}</p>
            </div>
            <div>
              {avsArray ? 
                avsArray.map((avs, index) => {
                  return (
                    <div  key={index} className='flex flex-col gap-1 mt-4 rounded-md bg-background p-2'>
                      <div 
                        className='flex justify-between items-center py-2'>
                        <div className='flex gap-2'>
                          <h3 >{avs.name}</h3>
                          <Link href={avs.link} target='_blank' className='inline-block'>
                            <ImageWithFallback
                              alt={avs.name}
                              unoptimized
                              src={avs.logoURI}
                              width={24}
                              height={24}
                              className='inline-block' />
                            <ExternalLink className='h-4 w-4 inline-block pl-1 text-primary hover:text-primary/60' />
                          </Link>
                        </div>
                        <div className='flex'>
                          <p className='text-muted pl-2'>APR</p>
                          <p className='pl-2'>{avs.apr}%</p>
                        </div>
                      </div>
                      <p className='text-muted text-sm'>{avs.description}</p>
                    </div>
                  )
                })
                :
                <div>
                  <p>Loading...</p>
                </div>
              }
            </div>
          </div>
        </div>
      </section >

      <section className='flex w-full flex-col bg-card rounded-xl p-4'>
        <h2 className='text-3xl px-4'>{props.token[0].symbol} Research</h2>
        <div className='flex flex-col w-full p-4 gap-2'>
          <div className='flex gap-4 w-full'>
            <p className='text-muted'>{props.token[0].symbol}</p>
            <Link href={`${etherscanURL}${process.env.NEXT_PUBLIC_YNETH_ADDRESS}`} 
              className='flex gap-2 items-center hover:text-primary/50'
              rel="noopener noreferrer" target="_blank">
              {truncateHex(process.env.NEXT_PUBLIC_YNETH_ADDRESS, 6)}
              <ExternalLink className='h-3 w-3'/>
            </Link>
          </div>
        </div>  
        <div className=''>
          {/* <h3 className='text-xl px-4'>Risk Analysis</h3> */}
          <div className='flex flex-col bg-background rounded-md gap-2 p-4 m-2'>
            <div className='flex gap-6 w-full'>
              <p className='text-xl'>Risk Level</p>
              <p className='text-green-600 text-xl' style={{ color: formatColor('medium') }}>Medium</p>
            </div>
            <p>{`YieldNest's succinct risk report on EigenLayer's restaking protocol:`}</p>
            <p className='text-muted'>
              {` 
              ynETH offers a liquid natively restaked token meaning your ETH is restaked via Eigenlayer and then 
              used to spin up ETH validators and also delegated to AVS Operators.`}
            </p>
            <p className='text-muted'><span className='text-foreground'>{`Investment Profile: `}</span>
              {`EigenLayer suits investors seeking high-risk, high-reward opportunities in Ethereum's new 
              cryptoeconomic security model.`}
            </p>
            <p className='text-muted'><span className='text-foreground'>{`Operational Mechanics: `}</span>
              {`The strategy involves native ETH staking and restaking Beacon Chain Ether through EigenLayer, 
              enhancing security for other protocols via Ethereum's PoS consensus and restaking.`}
            </p>
            <p className='text-muted'><span className='text-foreground'>{`Risk Factors: `}</span>
              {`Predominant risks include technical complexities, project continuity, ETH liquidity constraints, 
              and heightened slashing risks in staking and restaking.`}
            </p>
            <p className='text-muted'><span className='text-foreground'>{`Security Audits: `}</span>
              {`Thorough audits by Consensys and Sigma Prime establish a strong foundation but highlight 
              inherent risks in new, complex systems. `}
              <span className='text-primary hover:text-primary/60'>
                <Link href={'https://consensys.io/diligence/audits/2023/03/eigenlabs-eigenlayer/'} 
                  target='_blank'
                  className='inline-block'>
                  Consensys
                  <ExternalLink className='h-4 w-4 inline-block pl-1' />
                </Link>
              </span>
              <span className='text-primary hover:text-primary/60'>
                <Link 
                  href={`https://t.ly/-794H`} 
                  target='_blank'
                  className='inline-block pl-2'>
                  Sigma Prime
                  <ExternalLink className='h-4 w-4 inline-block pl-1' />
                </Link>
              </span>
            </p>
            <p className='text-muted'><span className='text-foreground'>{`Conclusion: `}</span>
              {`Recommended for knowledgeable investors in blockchain staking, accepting medium 
              risk for potential extra returns.`}
            </p>
          </div>  
        </div>  
      </section >
    </>
  )
}

export default PoolDetails
