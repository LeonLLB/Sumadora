import { createContext, Dispatch, SetStateAction } from 'react'

interface InputStatusContextProps {
    inputFocusedStatus: boolean,
    setInputFocusedStatus: Dispatch<SetStateAction<boolean>> 
}

export const InputStatusContext = createContext<InputStatusContextProps>({} as any)