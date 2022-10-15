import { createContext, Dispatch, SetStateAction } from 'react'

export interface Value{
    operation: '+' | '-' | '/' | '*'
    newValueToOperate: number,
    finalResult: number
}

interface ValueListContextProps {
    valueList: Value[],
    SetValueList: Dispatch<SetStateAction<Value[]>>
}

export const ValueListContext = createContext<ValueListContextProps>({} as any)