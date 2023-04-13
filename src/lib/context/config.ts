import { writable } from "svelte/store";

export interface Config {
    decimal: number 
}

export const config = writable<Config>({
    decimal:10
})