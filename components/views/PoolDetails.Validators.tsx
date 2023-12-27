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
} from '@/components/ui/table'


const PoolValidators = () => {

  const beaconChainLink = 'https://goerli.beaconcha.in/validator'

  const ethValidators = [
    {
      publicKey: '0xb3bd960bf29e3d673fe352d38c0577a93d4a175e84f52d319541c7de8966ca4beeeb0f52da4b405c72d0abec7f7693fb',
      earned: '--',
      apr: '--',
      created: '2023-12/25'
    },
    {
      publicKey: '0xa57ee111603c6ca106606bacce94778fc41ca0a0260ec9bd047a991bef1737567ed27371c753719cfd8fb5ac3cf08175',
      earned: '--',
      apr: '--',
      created: '2023-12-19'
    }
  ]

  return (
    <Table className='mx-auto md:w-5/6'>
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
                className='hover:text-primary/50'>
                <ExternalLink className='h-3 w-3' />
              </Link>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default PoolValidators
