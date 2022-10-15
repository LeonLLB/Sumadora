import { ChangeEvent, useContext } from "react"
import { InputStatusContext } from "../../context/inputStatus"
import styles from './sumadoraInput.module.scss'

const SumadoraInput = ({value,onChange}:{value:string,onChange:(e:ChangeEvent)=>void}) => {

    const {setInputFocusedStatus} = useContext(InputStatusContext)

    const onFocus = () => {
        setInputFocusedStatus(true)
    }

    const onBlur = () => {
        setInputFocusedStatus(false)
    }

  return (
    <div>
        <input className={styles.input} onFocus={onFocus} onBlur={onBlur} value={value} type="text" name="formName" onChange={onChange}/>
    </div>
  )
}

export default SumadoraInput