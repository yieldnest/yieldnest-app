import { useEffect, useState, useMemo } from 'react'
import { useFetch } from './useFetch'
import { useContractRead } from 'wagmi'
import { toNormalizedBN } from '@/lib/format.bigNumber'
import { YNETH_TOKEN } from '@/lib/tokens'

import type { TNormalizedBN } from '@/lib/format.bigNumber'


function useTVL(): {TVL: number, TAL: TNormalizedBN} {
  // Fetches the price of ETH from the Curve API.
  // Temporary until we have an ynETH price.
  const {data: prices} = useFetch<any>({
    endpoint: 'https://api.curve.fi/api/getETHprice',
  })

  // Fetches the total supply of ynETH.
  const { data } = useContractRead({
    ...YNETH_TOKEN,
    functionName: 'totalSupply',
    watch: true
  })

  const totalValueLocked = useMemo((): {TVL: number, TAL: TNormalizedBN} => {
  
    if (!data || !prices) {
      return ({TVL: 0, TAL: toNormalizedBN(0)})
    }

    const _value = data ? toNormalizedBN(data as any) : toNormalizedBN(0)
    // TVL = ynETH supply * ETH price. This will need to be updated when we have an ynETH price.
    return ({TVL: Number(_value.normalized) * Number(prices?.data?.price), TAL: _value})

  }, [data, prices])

  return (totalValueLocked)
}

export default useTVL
