import { toAddress } from '@/lib/address'
import { ETH_TOKEN_ADDRESS } from './constants'

import type { TAddress } from '@/types/index'

export function isEth(address?: string | null | TAddress): boolean {
  return toAddress(address) === toAddress(ETH_TOKEN_ADDRESS)
}
