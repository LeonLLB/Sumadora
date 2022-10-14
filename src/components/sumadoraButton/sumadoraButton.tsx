import styles from './sumadoraButton.module.scss'

interface SumadoraButtonProps{
    keyBtn:string | number

    isFuncKey?: boolean

    onClick: (key:string | number) => void

    gridColSpan?: number
}

const SumadoraButton = ({keyBtn,isFuncKey = false,onClick,gridColSpan = 1}:SumadoraButtonProps) => {
  return (
    <div className={`${styles.btn} ${isFuncKey ? styles.func : ''}`} style={{gridColumn: `span ${gridColSpan} / span ${gridColSpan}`}} onClick={()=>onClick(keyBtn)}>
        <span>
            {keyBtn}
        </span>
    </div>
  )
}

export default SumadoraButton