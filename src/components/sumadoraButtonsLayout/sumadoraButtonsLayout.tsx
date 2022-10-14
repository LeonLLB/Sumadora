import SumadoraButton from '../sumadoraButton/sumadoraButton'
import styles from './sumadoraButtonsLayout.module.scss'

interface buttonsArrObjectsProps {
	key: string | number
	colSpan?: number,
	isFunc?:boolean
}

const SumadoraButtonsLayout = () => {

	const buttonsArr: buttonsArrObjectsProps[] = [ 
		{key:7} , {key:8} , {key:9} , {key:'+',colSpan:3} , 
		{key:4} , {key:5} , {key:6} , {key:'-',colSpan:3} , 
		{key:1} , {key:2} , {key:3} , {key:'*',colSpan:3} , 
		{key:0} , {key:'00'} , {key:','} , {key:'/',colSpan:3} , 
		{key:'CE/C',colSpan:2,isFunc:true} , {key:'CSV',colSpan:2,isFunc:true} , {key:'Config',colSpan:2,isFunc:true} , 
	]

	const defFunc = (key: string | number) => console.log(key) 

	return (
		<div className={styles.container}>
			{
				buttonsArr.map((button,i)=>(
					<SumadoraButton key={i} keyBtn={button.key} onClick={defFunc} gridColSpan={button.colSpan} isFuncKey={button.isFunc}/>
				))
			}			
		</div>
	)
}

export default SumadoraButtonsLayout