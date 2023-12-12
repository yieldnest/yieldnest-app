
import type { BaseError, TransactionReceipt } from 'viem'

export type	TTxStatus = {
	none: boolean,
	pending: boolean,
	success: boolean,
	error: boolean,
	errorMessage?: string
}
export type TBaseError = {
	name?: string,
	message: string,
  shortMessage: string,
  details?: string,
}
export type TTxResponse = {
	isSuccessful: boolean,
	receipt?: TransactionReceipt,
	error?: BaseError | unknown
}
