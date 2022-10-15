import { ChangeEvent, useContext } from "react"
import { InputStatusContext } from "../../context/inputStatus"
import styles from './sumadoraInput.module.scss'

const SumadoraInput = ({value,onChange,dispatch}:{value:string,onChange:(value:string)=>void,dispatch:(type:string)=>void}) => {

    const {setInputFocusedStatus} = useContext(InputStatusContext)

    const onFocus = () => {
        setInputFocusedStatus(true)
    }

    const onBlur = () => {
        setInputFocusedStatus(false)
    }    

    const dispatchUp = (dispatchType:string) => {
      const eventKeys = ['Enter','+','-','*','/']
      if(eventKeys.includes(dispatchType)){
        dispatch(dispatchType)
      }
    }

  return (
    <div>
        <input
          onKeyUp={({key})=>dispatchUp(key)}
          className={styles.input}
          onFocus={onFocus}
          onBlur={onBlur}
          value={value}
          type="text"
          name="input"
          onChange={(e)=>onChange(e.target.value)}
          />
    </div>
  )
}

export default SumadoraInput