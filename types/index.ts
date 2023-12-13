
// TAddress is used to represent a checksummed address
export type TAddressYN = '/^0x[0-9a-f]{40}$/i';
export type	TAddressWagmi = `0x${string}`;
export type TAddress = TAddressWagmi;
export type TAddressLike = TAddressYN | TAddressWagmi | string;

export type TIndexedTokenInfo = TTokenInfo & {index: number};
export type TTokenInfoArray = TTokenInfo[]
export type TTokenInfo = {
	chainId: number,
	address: TAddress,
	name: string,
	symbol: string,
	decimals: number,
	logoURI: string,
  abi?: any,
};
