import { useEffect, useState, useMemo } from 'react'
import axios from 'axios'
import { useFetch } from './useFetch'
import { formatAmount } from '@/lib/format.number'
import { useContractRead } from 'wagmi'
import { toAddress } from '@/lib/address'
import { toNormalizedBN } from '@/lib/format.bigNumber'
import { erc20ABI } from '@wagmi/core'
import { YNETH_TOKEN } from '@/lib/tokens'

import type { TNormalizedBN } from '@/lib/format.bigNumber'

// const getETHPrice = async () => {
//   try {
//     // TODO: Add a fallback if the API fails
//     const { data } = await axios.get('https://api.curve.fi/api/getETHprice')
//     return data.data.price
//   } catch (error) {
//     console.error('Error fetching ETH price', error)
//     return 0
//   }
// }

// export const useETHPrice = () => {
//   const [ethPrice, setEthPrice] = useState<string>()

//   useEffect(() => {
//     const fetchETHPrice = async () => {
//       const price = await getETHPrice()
//       setEthPrice(formatAmount(price, 2, 2))
//     }
//     fetchETHPrice()
//   }, [])

//   // Add other functions that require the ETH price here

//   return { ethPrice }
// }
function useTVL(): {TVL: number, TAL: TNormalizedBN} {
  const {data: prices} = useFetch<any>({
    endpoint: 'https://api.curve.fi/api/getETHprice',
  })

  const { data } = useContractRead({
    ...YNETH_TOKEN,
    functionName: 'totalSupply'
  })

  const totalValueLocked = useMemo((): {TVL: number, TAL: TNormalizedBN} => {
  
    if (!data || !prices) {
      return ({TVL: 0, TAL: toNormalizedBN(0)})
    }

    const _value = data ? toNormalizedBN(data as any) : toNormalizedBN(0)
    return ({TVL: Number(_value.normalized) * Number(prices?.data?.price), TAL: _value})

  }, [data, prices])

  return (totalValueLocked)
}

export default useTVL
