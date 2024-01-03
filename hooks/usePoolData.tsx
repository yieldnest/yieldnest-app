// hooks/usePoolData.ts

import { useEffect, useState } from 'react'
import { useContractReads } from 'wagmi'
import { useWeb3 } from '@/contexts/useWeb3'
import { toAddress } from '@/lib/address'
import { toNormalizedBN, toBigInt } from '@/lib/format.bigNumber'

import type { TTokenInfo } from '@/types/index'
import type { TNormalizedBN } from '@/lib/format.bigNumber'

export type TPoolData = {
  poolAddress: string,
	poolName: string,
	symbol: string,
	poolSupply: TNormalizedBN,
	userBalance: TNormalizedBN,
  poolDecimals: string,
} & TTokenInfo

// This component is designed to be used gather pool data for a specific token and be used in other components.
export const usePoolData = (token: TTokenInfo) => {

  const [ poolData, setPoolData ] = useState({
    poolAddress: '',
    poolName: '',
    symbol: '',
    poolSupply: toNormalizedBN(0),
    userBalance: toNormalizedBN(0),
    poolDecimals: '',
  })

  const { address } = useWeb3()

  // Fetches the name, symbol, totalSupply, and balanceOf for the token.
  const { data: contractDataArray, refetch, isFetched } = useContractReads({
    contracts: [
      {
        ...token,
        functionName: 'name'
      },
      {
        ...token,
        functionName: 'symbol'
      },
      {
        ...token,
        functionName: 'totalSupply'
      },
      {
        ...token,
        functionName: 'balanceOf',
        args: [toAddress(address)]
      },
      {
        ...token,
        functionName: 'decimals'
      },
    ],
    watch: true
  })

  useEffect((): void => {
    if (!isFetched) {
      return
    }
    // Sets the pool data to variables with correct formats for easy access.
    setPoolData({
      ...poolData,
      poolAddress: toAddress(token.address),
      poolName: contractDataArray?.[0]?.result as string,
      symbol: contractDataArray?.[1]?.result as string,
      poolSupply: toNormalizedBN(toBigInt(contractDataArray?.[2]?.result as bigint) || 0n),
      userBalance: toNormalizedBN(toBigInt(contractDataArray?.[3]?.result as bigint) || 0n),
      poolDecimals: contractDataArray?.[4]?.result as string,
    })

  }, [contractDataArray, isFetched])

  return { poolData, updatePoolData: refetch }
}
