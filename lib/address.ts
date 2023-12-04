import { getAddress, isAddress, zeroAddress as wZeroAddress } from 'viem'

import type { TAddress, TAddressLike, TAddressYN } from '@/types/index'


export const zeroAddress = wZeroAddress as TAddress

export function isTAddress(address?: string | null): address is TAddress {
	const regex = /^0x([0-9a-f][0-9a-f])*$/i;
	return !!address && regex.test(address);
}

/* - YieldNest ******************************************************
** Functions used to format the addresses and work with them to
** always be sure they are correct. An address should not be a string, it
** should be a specific type address, which does not exists, so any address
** should always be called by toAddress(0x...).
**************************************************************************/
function checksumAddress(address?: string | null | undefined): TAddressYN {
	try {
		if (address && isAddress(address)) {
			const checksummedAddress = getAddress(address);
			if (isTAddress(checksummedAddress)) {
				return checksummedAddress as TAddressYN;
			}
		}
	} catch (error) {
		console.error(error);
	}
	return zeroAddress as TAddressYN;
}

/* - YieldNest ******************************************************
** Wagmi only requires a 0xString as a valid address. To use your safest
** version, we need to convert it between types, and the other way around.
**************************************************************************/
export function toAddress(address?: TAddressLike | null): TAddress {
	if (!address) {
		return wZeroAddress;
	}
	return getAddress(checksumAddress(address)?.valueOf())
}

/* - YieldNest  ******************************************************
** truncateHex is used to trucate a full hex string to a specific size with
** a ... in the middle. Ex: 0x1234567890abcdef1234567890abcdef12345678
** will be truncated to 0x1234...5678
**************************************************************************/
export function truncateHex(address: string | undefined, size: number): string {
	if (address !== undefined) {
		if (size === 0) {
			return address;
		}
		return `${address.slice(0, size)}...${address.slice(-size)}`;
	}
	if (size === 0) {
		return zeroAddress;
	}
	return '0x000...0000';
}

/* - YieldNest ******************************************************
** isZeroAddress is used to check if an address is the zero address.
**************************************************************************/
export function isZeroAddress(address?: string): boolean {
	return toAddress(address) === toAddress(zeroAddress);
}
