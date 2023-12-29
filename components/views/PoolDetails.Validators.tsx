import Link from 'next/link'
import { ImageWithFallback } from '@/components/common/ImageWithFallback'
import { formatSince } from '@/lib/format.time'
import { truncateHex } from '@/lib/address'
import { ExternalLink } from 'lucide-react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableCaption,
} from '@/components/ui/table'


const PoolValidators = () => {

  const beaconChainLink = 'https://goerli.beaconcha.in/validator'
  const eigenDaLink = 'https://goerli.eigenlayer.xyz/operator/'

  const ethValidators = [
    {
      publicKey: '0xa6134e016c7277bbb6f2db7033506316637a64c3cb672dcb1a2ceb995aa08b52308d0f3fe7ead6d0809ff3d3f1ae189f',
      earned: '0.00513',
      apr: '2.56',
      created: '2023-12/26'
    },
    {
      publicKey: '0x010000000000000000000000a1237efe3159197537f41f510f01d09394780f08',
      earned: '0.01508',
      apr: '2.54',
      created: '2023-12-19'
    }
  ]

  const avsOperators = [
    {
      publicKey: '0xe3b520f525b57be060f2c7b9ca0ea98a2dc4500b',
      avsName: 'EigenDA',
      earned: '0.00913',
      apr: '3.56',
      created: '2023-12/26'
    },
    {
      publicKey: '0xe1daf89265027fb0edb2604d55b1ebe26b4a74c2',
      avsName: 'EigenDA',
      earned: '0.01508',
      apr: '3.24',
      created: '2023-12-19'
    }
  ]

  return (
    <>
      <Table className='mx-auto md:w-5/6'>
        <TableCaption className='caption-top text-left text-lg'>ETH Validators</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className=''>Address</TableHead>
            <TableHead className='text-center'>Earned</TableHead>
            <TableHead className='text-center'>APR</TableHead>
            <TableHead className='text-right'>Created</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {ethValidators.map((node) => (
            <TableRow key={node.publicKey}>
              <TableCell className=''>{truncateHex(node.publicKey, 4)}</TableCell>
              <TableCell className='text-center flex justify-center items-center gap-2'>
                <ImageWithFallback
                  className='h-4 w-4'
                  alt={'ETH icon'}
                  unoptimized
                  src={'/logos/eth-icon.svg'}
                  width={24}
                  height={24} />
                {node.earned}
              </TableCell>
              <TableCell className='text-center'>{node.apr}%</TableCell>
              <TableCell className='text-right flex justify-end items-center gap-1'>
                {formatSince(node.created)}
                <Link href={`${beaconChainLink}/${node.publicKey}`}
                  rel="noopener noreferrer" target="_blank"
                  className='hover:text-primary/50'>
                  <ExternalLink className='h-3 w-3' />
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Table className='mx-auto md:w-5/6'>
        <TableCaption className='caption-top text-left text-lg'>AVS Operators</TableCaption>
        <TableHeader>
          <TableRow className='items-center'>
            <TableHead className=''>Address</TableHead>
            <TableHead className='text-center'>AVS</TableHead>
            <TableHead className='text-center'>Earned</TableHead>
            <TableHead className='text-center'>APR</TableHead>
            <TableHead className='text-right'>Created</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {avsOperators.map((node) => (
            <TableRow key={node.publicKey} className='items-center'>
              <TableCell className=''>{truncateHex(node.publicKey, 4)}</TableCell>
              <TableCell className=''>{node.avsName}</TableCell>
              <TableCell className='text-center flex justify-center items-center gap-2 h-full'>
                <ImageWithFallback
                  className='h-4 w-4'
                  alt={'ETH icon'}
                  unoptimized
                  src={'/logos/eth-icon.svg'}
                  width={24}
                  height={24} />
                {node.earned}
              </TableCell>
              <TableCell className='text-center'>{node.apr}%</TableCell>
              <TableCell className='text-right flex justify-end items-center gap-1'>
                {formatSince(node.created)}
                <Link href={`${eigenDaLink}/${node.publicKey}`}
                  rel="noopener noreferrer" target="_blank"
                  className='hover:text-primary/50'>
                  <ExternalLink className='h-3 w-3' />
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  )
}

export default PoolValidators
