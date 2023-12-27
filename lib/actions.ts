import assert from 'assert'
import { erc20ABI } from '@wagmi/core'
import YNETH_POOL_ABI from '@/lib/abi/ynETHPool.abi'
import { assertAddress } from '@/lib/address'
import { handleTx } from '@/lib/wagmi/provider'

import type { TAddress } from '@/types/index'
import type { TWriteTransaction } from '@/lib/wagmi/provider'
import type { TTxResponse } from '@/types/transaction'


/* - YieldNest **********************************************************
** approveERC20 is a _WRITE_ function that approves a token for a spender.
**
** @param spenderAddress - The address of the spender.
** @param amount - The amount of collateral to deposit.
******************************************************************************/
// TODO: This still needs to be tested. Has not yet been used. 
type TApproveERC20 = TWriteTransaction & {
	spenderAddress: TAddress | undefined
	amount: bigint
}
export async function approveERC20(props: TApproveERC20): Promise<TTxResponse> {
  assertAddress(props.spenderAddress, 'spenderAddress')
  assertAddress(props.contractAddress)

  return await handleTx(props, {
    address: props.contractAddress,
    abi: erc20ABI,
    functionName: 'approve',
    args: [props.spenderAddress, props.amount]
  })
}


/* - YieldNest **********************************************************
** depositETH is a _WRITE_ function that deposits a specified amount of ETH into a contract.
**
** @param amount - The amount of ETH to deposit.
** @param minAmount - The minimum amount of ETH to be deposited.
******************************************************************************/
type TDepositEth = TWriteTransaction & {
	amount: bigint
  address: TAddress
}
export async function depositETH(props: TDepositEth): Promise<TTxResponse> {
  assert(props.connector, 'No connector')
  assert(props.amount > 0n, 'Amount is 0')
  assertAddress(props.contractAddress, 'ynETH address')

  return await handleTx(props, {
    address: props.contractAddress,
    abi: YNETH_POOL_ABI,
    functionName: 'depositETH',
    value: props.amount,
    args: [props.address],
  })
}
