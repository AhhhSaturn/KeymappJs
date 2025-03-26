// Generated by dts-bundle-generator v9.5.1

export declare class Client {
	private socket;
	private service;
	constructor(socket: string);
	GetStatus: () => Promise<{
		keymappVersion: string;
		connectedKeyboard: {
			friendlyName: string;
			firmwareVersion: string;
		} | undefined;
	} | undefined>;
	GetKeyboards: () => Promise<{
		id: number;
		friendlyName: string;
		isConnected: boolean;
	}[] | undefined>;
	ConnectKeyboard: (id: number) => Promise<boolean>;
	ConnectAnyKeyboard: () => Promise<boolean>;
	DisconnectKeyboard: () => Promise<boolean>;
	SetLayer: (layer: number) => Promise<boolean>;
	UnSetLayer: () => Promise<boolean>;
	SetRGBAll: (color: string, sustain?: number) => Promise<boolean>;
	SetRGBLed: (led: number, color: string, sustain?: number) => Promise<boolean>;
	SetStatusLed: (led: number, on: boolean, sustain?: number) => Promise<boolean>;
}

export {};
