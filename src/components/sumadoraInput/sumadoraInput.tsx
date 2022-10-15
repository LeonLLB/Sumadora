import { ChangeEvent, useContext } from "react"
import { InputStatusContext } from "../../context/inputStatus"


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
        <input onFocus={onFocus} onBlur={onBlur} value={value} type="text" name="formName" onChange={onChange}/>
    </div>
  )
}

export default SumadoraInput