import type	{ ReactNode }	from 'react'
import type { Connector } from 'wagmi'
import type { TAddress } from './index'

export type TSettingsBase = {
	yDaemonBaseURI: string,
	metaBaseURI: string,
	apiBaseURI: string,
}
export type	TSettingsContext = {
	settings: TSettingsBase,
	onUpdateBaseSettings: (newBaseSettings: TSettingsBase) => void,
}

export type	TSettingsContextApp = {
	children: ReactNode,
	baseOptions?: Partial<TSettingsBase>,
}

export type TUIOptions = {
	shouldUseDefaultToaster?: boolean,
	shouldUseThemes?: boolean
}

export type	TUIContext = {
	toast: unknown,
	onLoadStart: () => void,
	onLoadDone: () => void,
}

export type TWeb3Context = {
	address: TAddress | undefined,
	ens: string | undefined,
	lensProtocolHandle: string | undefined,
	chainID: number,
	isDisconnected: boolean,
	isActive: boolean
	isConnecting: boolean,
	isWalletSafe: boolean,
	hasProvider: boolean,
	provider?: Connector,
	onConnect: () => Promise<void>,
	onSwitchChain: (newChainID: number) => void,
	openLoginModal: () => void,
	onDesactivate: () => void,
}
