import { ChangeEvent, useState } from 'react'
import { InputStatusContext } from '../../context/inputStatus'
import SumadoraButtonsLayout from '../../components/sumadoraButtonsLayout/sumadoraButtonsLayout'
import SumadoraInput from '../../components/sumadoraInput/sumadoraInput'
import styles from './sumadora.module.scss'
import { Value, ValueListContext } from '../../context/valueList'

const SumadoraPage = () => {
  const [inputFocusedStatus,setInputFocusedStatus] = useState(false)
  const [valueList,SetValueList] = useState<Value[]>([])
  let defString: string = ''
  const [input,setInput] = useState('')

  const _calcNewValue = (operation: '+' | '-' | '*' | '/') => {
    const newValueToOperate = parseFloat(input.replace(',','.'))
    const newValue: Value = {
      operation,
      newValueToOperate,
      finalResult:null as any
    }
    switch (operation) {
      case '+':
        newValue.finalResult = valueList[valueList.length-1] ?
          valueList[valueList.length-1].finalResult + newValueToOperate :
          newValueToOperate
        break;
      case '-':
        newValue.finalResult = valueList[valueList.length-1] ?
          valueList[valueList.length-1].finalResult - newValueToOperate :
          newValueToOperate
        break;  
      case '*':
        newValue.finalResult = valueList[valueList.length-1] ?
          valueList[valueList.length-1].finalResult * newValueToOperate :
          newValueToOperate
        break;  
      case '/':
        newValue.finalResult = valueList[valueList.length-1] ?
          valueList[valueList.length-1].finalResult / newValueToOperate :
          newValueToOperate
        break;    
    }
    return newValue
  }

  const dispatchValue = (type:string) => {
    defString=''
    setInput('')
    switch (type) {
      case 'Enter':
      case '+':
        SetValueList([...valueList as any,_calcNewValue('+')])     
        break;
      case '-':
      case '*':
      case '/':
        SetValueList([...valueList as any,_calcNewValue(type)])     
        break;
    }
  }

  const onInput = (change: string,fromVirtualKeyboard = false) => {
    const eventKeys = ['Enter','+','-','*','/']
    
    if(eventKeys.includes(change)){
      dispatchValue(change)
      return
    }

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

  const changeInput = (value:string) => {
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
    <ValueListContext.Provider value={{valueList,SetValueList}}>
      <InputStatusContext.Provider value={{inputFocusedStatus,setInputFocusedStatus}}>
        <div className={styles.sumadoraContainer}>
            <div>123</div>
            <SumadoraInput dispatch={dispatchValue} value={input} onChange={changeInput}/>
            <SumadoraButtonsLayout onChangeOrInputDetected={onInput}/>
        </div>    
      </InputStatusContext.Provider>    
    </ValueListContext.Provider>
  )
}

export default SumadoraPage