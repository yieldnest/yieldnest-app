// hooks/usePoolData.ts

import { useState, useEffect } from 'react'
import { useBalance, useContractRead } from 'wagmi'

export const usePoolData = (token: string) => {
  const [poolData, setPoolData] = useState({
    name: '',
    symbol: '',
    icon: '',
    userBalance: 0,
    totalSupply: 0
  })

  const { data: balance } = useBalance({
    // Add address of client wallet
    // add token address
  })
  // const { data: totalSupply } = useContractRead({
  //   address: token.address,
  //   functionName: 'totalSupply',
  //   args: [],
  //   enabled: true
  // })

  // useEffect(() => {
  //   // Fetch pool name, symbol, icon from API or other source
  //   const poolName = 'Your Pool Name'
  //   const poolSymbol = 'POOL'
  //   const poolIcon = 'pool-icon.png'

  //   setPoolData({
  //     ...poolData,
  //     name: poolName,
  //     symbol: poolSymbol,
  //     icon: poolIcon,
  //     userBalance: balance,
  //     totalSupply: totalSupply
  //   })
  // }, [balance, totalSupply])

  return poolData
}
