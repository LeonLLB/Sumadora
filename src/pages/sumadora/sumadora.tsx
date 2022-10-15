import { ChangeEvent, useState } from 'react'
import { InputStatusContext } from '../../context/inputStatus'
import SumadoraButtonsLayout from '../../components/sumadoraButtonsLayout/sumadoraButtonsLayout'
import SumadoraInput from '../../components/sumadoraInput/sumadoraInput'
import styles from './sumadora.module.scss'

const SumadoraPage = () => {
  const [inputFocusedStatus,setInputFocusedStatus] = useState(false)
  let defString: string = ''
  const [input,setInput] = useState('')

  const onInput = (change: string,fromVirtualKeyboard = false) => {
    if(fromVirtualKeyboard){
      if(
        change === ',' && (input.includes(',') || input.includes('.')) || 
        change === '.' && (input.includes(',') || input.includes('.')) 
      ){
        return
      }
      defString = input + change 
      setInput(defString)      
      return
    }
    if(
      change === ',' && (defString.includes(',') || defString.includes('.')) || 
      change === '.' && (defString.includes(',') || defString.includes('.')) 
    ){
      return
    }
    defString = defString + change 
    setInput(defString)
  }

  const _filterStringByFloatingPoint = (string:string,floatingChar: string) =>
    string.split('').filter((char:string)=>char===floatingChar)

  const changeInput = (e:ChangeEvent) => {
    const value = (e.target as any).value as string
    defString = value
    if(
      _filterStringByFloatingPoint(value,',').length>=1 && (input.includes(',') || input.includes('.')) || 
      _filterStringByFloatingPoint(value,'.').length>=1 && (input.includes(',') || input.includes('.')) 
    ){
      return
    }
    setInput(value)
  }

  return (
    <InputStatusContext.Provider value={{inputFocusedStatus,setInputFocusedStatus}}>
      <div className={styles.sumadoraContainer}>
          <div>123</div>
          <SumadoraInput value={input} onChange={changeInput}/>
          <SumadoraButtonsLayout onChangeOrInputDetected={onInput}/>
      </div>    
    </InputStatusContext.Provider>
  )
}

export default SumadoraPage