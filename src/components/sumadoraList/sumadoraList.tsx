import { Fragment, useContext } from 'react'
import { ValueListContext } from '../../context/valueList'
import styles from './sumadoraList.module.scss'

const SumadoraList = () => {

    const {valueList} = useContext(ValueListContext)

  return (
    <div className={styles.listContainer}>
        <div className={styles.list}>
            <table>
                <tbody>
                    {
                        valueList.map((value,i)=>(
                            <Fragment key={i}>
                                <tr>
                                    <td className={styles[value.operation] + ' ' + styles.value}> <span>{value.newValueToOperate}</span> </td>
                                    <td className={styles.operation} rowSpan={2}> <span className={styles[value.operation]}>{value.operation}</span> </td>
                                </tr>
                                <tr>
                                    <td className={styles.result}> <span>{value.finalResult}</span> </td>
                                </tr>
                            </Fragment>
                        ))
                    }
                </tbody>
            </table>
        </div>
        <div className={styles.resultList}>
            {valueList[valueList.length-1] ? valueList[valueList.length-1].finalResult : 0.0 }
        </div>
    </div>
  )
}

export default SumadoraList