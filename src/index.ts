import { credentials, loadPackageDefinition } from "@grpc/grpc-js";
import { loadSync } from "@grpc/proto-loader";
import { join } from "node:path";

const protoPath = loadSync(join(import.meta.dirname, 'keymapp.proto'));
const packageDefinition = loadPackageDefinition(protoPath);

export class Client {
    // biome-ignore lint/suspicious/noExplicitAny:
    private service: any;
    constructor(private socket: string) {
        // @ts-ignore
        this.service = new packageDefinition.api.KeyboardService(
            socket,
            credentials.createInsecure(),
        );
    }
    GetStatus = () => new Promise<{ keymappVersion: string; connectedKeyboard: { friendlyName: string, firmwareVersion: string; } | undefined; } | undefined>((resolve, reject) => {
        this.service.GetStatus({}, (error: string, data: { keymappVersion: string; connectedKeyboard: { friendlyName: string, firmwareVersion: string; } | undefined; }) => {
            if (error) reject(error);
            resolve(data);
        });
    });
    GetKeyboards = () => new Promise<{ id: number, friendlyName: string, isConnected: boolean; }[] | undefined>((resolve, reject) => {
        this.service.GetKeyboards({}, (error: string, data: { keyboards: { id: number, friendlyName: string, isConnected: boolean; }[]; }) => {
            if (error) reject(error);
            resolve(data.keyboards);
        });
    });
    ConnectKeyboard = (id: number) => new Promise<boolean>((resolve, reject) => {
        this.service.ConnectKeyboard({ id }, (error: string, data: { success: boolean; }) => {
            if (error) reject(error);
            resolve(data.success);
        });
    });
    ConnectAnyKeyboard = () => new Promise<boolean>((resolve, reject) => {
        this.service.ConnectAnyKeyboard({}, (error: string, data: { success: boolean; }) => {
            if (error) reject(error);
            resolve(data.success);
        });
    });
    DisconnectKeyboard = () => new Promise<boolean>((resolve, reject) => {
        this.service.DisconnectKeyboard({}, (error: string, data: { success: boolean; }) => {
            if (error) reject(error);
            resolve(data.success);
        });
    });
    SetLayer = (layer: number) => new Promise<boolean>((resolve, reject) => {
        this.service.SetLayer({ layer }, (error: string, data: { success: boolean; }) => {
            if (error) reject(error);
            resolve(data.success);
        });
    });
    UnSetLayer = () => new Promise<boolean>((resolve, reject) => {
        this.service.SetLayer({ layer: 0 }, (error: string, data: { success: boolean; }) => {
            if (error) reject(error);
            resolve(data.success);
        });
    });
    SetRGBAll = (color: string, sustain?: number) => new Promise<boolean>((resolve, reject) => {
        const rgb = Bun.color(color, '[rgb]');
        if (!rgb) throw new Error('Color not valid');
        this.service.SetRGBAll({ red: rgb[0], green: rgb[1], blue: rgb[2], sustain }, (error: string, data: { success: boolean; }) => {
            if (error) reject(error);
            resolve(data.success);
        });
    });
    SetRGBLed = (led: number, color: string, sustain?: number) => new Promise<boolean>((resolve, reject) => {
        const rgb = Bun.color(color, '[rgb]');
        if (!rgb) throw new Error('Color not valid');
        this.service.SetRGBLed({ led, red: rgb[0], green: rgb[1], blue: rgb[2], sustain }, (error: string, data: { success: boolean; }) => {
            if (error) reject(error);
            resolve(data.success);
        });
    });
    SetStatusLed = (led: number, on: boolean, sustain?: number) => new Promise<boolean>((resolve, reject) => {
        this.service.SetStatusLed({ led, on, sustain }, (error: string, data: { success: boolean; }) => {
            if (error) reject(error);
            resolve(data.success);
        });
    });
}
