import { usePoolData } from '@/hooks/usePoolData'
import { useCallback, useState } from 'react'
import { useWeb3 } from '@/contexts/useWeb3'
import { useIsMounted } from '@react-hookz/web'

import type { TTokenInfo } from '@/types/index'


export const useTokenToWallet = (
  token: TTokenInfo,
  image?: string,
): {
  addToken?: () => Promise<boolean>
  canAdd: boolean
  loading: boolean
} => {
  const isMounted = useIsMounted()
  const [ loading, setLoading ] = useState(isMounted)
  const { provider } = useWeb3()

  const { poolData } = usePoolData(token)

  const handleAdd = useCallback(async () => {
    const signer = await provider?.getWalletClient()
    if (!signer?.request) return false

    try {
      setLoading(true)
      
      const [address, symbol, decimals] = await Promise.all([
        poolData.poolAddress,
        poolData.symbol,
        poolData.poolDecimals,
      ])

      const result = await signer.request({
        method: 'wallet_watchAsset',
        params: {
          type: 'ERC20',
          options: {
            address,
            symbol,
            decimals,
            image,
          },
        } as any,
      })

      return !!result
    } catch (error) {
      console.error(error)
      return false
    } finally {
      setLoading(false)
    }
  }, [token, image, setLoading, poolData])

  const canAdd = provider?.name === 'MetaMask'
  const addToken = canAdd ? handleAdd : undefined

  return {
    canAdd,
    addToken,
    loading,
  }
}
