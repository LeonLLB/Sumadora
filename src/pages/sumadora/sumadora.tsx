import { ChangeEvent, useState } from 'react'
import { InputStatusContext } from '../../context/inputStatus'
import SumadoraButtonsLayout from '../../components/sumadoraButtonsLayout/sumadoraButtonsLayout'
import SumadoraInput from '../../components/sumadoraInput/sumadoraInput'
import styles from './sumadora.module.scss'
import { Value, ValueListContext } from '../../context/valueList'
import SumadoraList from '../../components/sumadoraList/sumadoraList'

const SumadoraPage = () => {
  const [inputFocusedStatus,setInputFocusedStatus] = useState(false)
  const [valueList,SetValueList] = useState<Value[]>(JSON.parse(localStorage.getItem('list-backup')!) || [])
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
    let newValueList = type === 'Enter' ? [...valueList as any,_calcNewValue('+')] : [...valueList as any,_calcNewValue(type as any)]
    switch (type) {
      case 'Enter':
      case '+':        
        if(defString === '' && input==='') return
        defString=''
        setInput('')
        localStorage.setItem('list-backup',JSON.stringify(newValueList))
        SetValueList(newValueList)     
        break;
      case '-':
      case '*':
      case '/':
        if(defString === '' && input==='') return
        defString=''
        setInput('')
        localStorage.setItem('list-backup',JSON.stringify(newValueList))
        SetValueList(newValueList)     
        break;
      case 'CE/C':
        defString=''
        setInput('')
        localStorage.removeItem('list-backup')
        SetValueList([])
        break
    }
  }

  const onInput = (change: string,fromVirtualKeyboard = false) => {
    const eventKeys = ['Enter','+','-','*','/','CE/C']
    
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

  const _getCharsInString = (string:string,floatingChar: string) =>
    string.split('').filter((char:string)=>char===floatingChar).length

  const changeInput = (value:string) => {
    defString = value
    if(
      input.includes(',') && value.includes('.') ||
      input.includes('.') && value.includes(',')
    ) return;
    if(
      _getCharsInString(value,',') >=2 && (input.includes(',') || input.includes('.')) || 
      _getCharsInString(value,'.') >=2 && (input.includes(',') || input.includes('.')) 
    ){
      return
    }
    setInput(value)
  }


  return (
    <ValueListContext.Provider value={{valueList,SetValueList}}>
      <InputStatusContext.Provider value={{inputFocusedStatus,setInputFocusedStatus}}>
        <div className={styles.sumadoraContainer}>
            <SumadoraList/>
            <SumadoraInput dispatch={dispatchValue} value={input} onChange={changeInput}/>
            <SumadoraButtonsLayout onChangeOrInputDetected={onInput}/>
        </div>    
      </InputStatusContext.Provider>    
    </ValueListContext.Provider>
  )
}

export default SumadoraPage