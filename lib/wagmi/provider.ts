
import assert from 'assert'
import { BaseError } from 'viem'
import { prepareWriteContract, 
  switchNetwork, 
  waitForTransaction, 
  writeContract, 
  watchContractEvent } from '@wagmi/core'

import { toBigInt } from '@/lib/format.bigNumber'
import { assertAddress } from '@/lib/address'

import type { Abi, SimulateContractParameters } from 'viem'
import type { Connector } from 'wagmi'
import type { GetWalletClientResult, WalletClient } from '@wagmi/core'
import type { TAddress } from '@/types/index'
import type { TTxResponse } from '@/types/transaction'

export type TWagmiProviderContract = {
	walletClient: GetWalletClientResult,
	chainId: number,
	address: TAddress,
}

// Initial status of a transaction.
const defaultTxStatus = { none: true, pending: false, success: false, error: false }
const defaultHash = {txHash: ''}
/* This function takes a connector as input, checks if it's set, retrieves the
wallet client and chain ID from the connector, and returns an object containing
the wallet client, chain ID, and address. 
*/
export async function toWagmiProvider(connector: Connector | undefined): Promise<TWagmiProviderContract> {
  assert(connector, 'Connector is not set')

  const signer = await connector.getWalletClient()
  const chainId = await connector.getChainId()
  const {address} = signer.account
  return ({
    walletClient: signer,
    chainId,
    address
  })
}


export type TWriteTransaction = {
	chainID: number
	connector: Connector | undefined
	contractAddress: TAddress | undefined
	statusHandler?: (status: typeof defaultTxStatus) => void
  hashHandler?: (hash: typeof defaultHash) => void

}

type TPrepareWriteContractConfig<
	TAbi extends Abi | readonly unknown[] = Abi,
	TFunctionName extends string = string
> = Omit<SimulateContractParameters<TAbi, TFunctionName>, 'chain' | 'address'> & {
	chainId?: number
	walletClient?: WalletClient
	address: TAddress | undefined
}

/**
 * This function handles a transaction by preparing the contract configuration,
 *  switching the network if necessary, and executing the transaction. 
 * @param args - The transaction parameters including chainID, connector, contract address, 
 * and optional status handler.
 * @param props - The contract configuration parameters including ABI, function
 *  name, chain ID, wallet client, contract address, and value.
 * @returns A promise that resolves to the transaction response.
 */
export async function handleTx<
	TAbi extends Abi | readonly unknown[],
	TFunctionName extends string
>(
  args: TWriteTransaction,
  props: TPrepareWriteContractConfig<TAbi, TFunctionName>,
): Promise<TTxResponse> {
  args.statusHandler?.({...defaultTxStatus, pending: true})
  args.hashHandler?.({...defaultHash, txHash: ''})

  let wagmiProvider = await toWagmiProvider(args.connector)

  /* ******************************************************
	** First, make sure we are using the correct chainID.
	*********************************************************/
  if (wagmiProvider.chainId !== args.chainID) {
    await switchNetwork({chainId: args.chainID})
  }

  wagmiProvider = await toWagmiProvider(args.connector)
  assertAddress(props.address, 'contractAddress')
  assertAddress(wagmiProvider.address, 'userAddress')
  assert(wagmiProvider.chainId === args.chainID, 'ChainID mismatch')
  try {
    const config = await prepareWriteContract({
      ...wagmiProvider,
      ...props as TPrepareWriteContractConfig,
      address: props.address,
      value: toBigInt(props.value)
    })

    const {hash} = await writeContract(config.request)
    // hashHandler makes the hash update available to use for better tx user message handling
    args.hashHandler?.({...defaultHash, txHash: hash})

    const receipt = await waitForTransaction({chainId: wagmiProvider.chainId, hash, confirmations: 1})
    if (receipt.status === 'success') {
      args.statusHandler?.({...defaultTxStatus, success: true})
    } else if (receipt.status === 'reverted') {
      args.statusHandler?.({...defaultTxStatus, error: true})
    }
    console.log('Transaction successful!')
    return ({isSuccessful: receipt.status === 'success', receipt})
    
  } catch (error) {
    if (!(error instanceof BaseError)) {
      return ({isSuccessful: false, error})
    }
    console.error(error.shortMessage)
    args.statusHandler?.({...defaultTxStatus, error: true})
    console.error(error)
    return ({isSuccessful: false, error})
  } finally {
    setTimeout((): void => {
      args.statusHandler?.({...defaultTxStatus})
    }, 4000)
  }
}

export { defaultTxStatus }
