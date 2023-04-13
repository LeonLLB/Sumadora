import { writable } from "svelte/store"

export interface Value{
    operation: '+' | '-' | '/' | '*'
    newValueToOperate: number,
    finalResult: number
}

export const valueList = writable<Value[]>([])