import { ChangeEvent, useState } from 'react'
import { InputStatusContext } from '../../context/inputStatus'
import SumadoraButtonsLayout from '../../components/sumadoraButtonsLayout/sumadoraButtonsLayout'
import SumadoraInput from '../../components/sumadoraInput/sumadoraInput'
import styles from './sumadora.module.scss'

const SumadoraPage = () => {
  const [inputFocusedStatus,setInputFocusedStatus] = useState(false)
  let defString: string = ''
  const [input,setInput] = useState('')

  const onInput = (change: string) => {
    defString = defString + change 
    setInput(defString)
  }

  const changeInput = (e:ChangeEvent) => {
    setInput((e.target as any).value)
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