<script lang="ts">
    import {navigate} from 'svelte-navigator'
    import SumadoraList from "../components/SumadoraList.svelte";
    import SumadoraInput from "../components/SumadoraInput.svelte";
    import SumadoraButtonsLayout from "../components/SumadoraButtonsLayout.svelte";
    import type { Value } from "../context/valueList";
    import { input } from "../context/value";
    import {valueList} from '../context/valueList'

    (()=>{
        const dataToPreload = JSON.parse(localStorage.getItem('list-backup'))
        if(!dataToPreload){valueList.set([]);return}
        valueList.set(dataToPreload)
    })()

  const addOperation = (newValue: Value, valueList: Value[], newValueToOperate: number) => {
    newValue.finalResult = valueList[valueList.length-1] ?
        valueList[valueList.length-1].finalResult + newValueToOperate :
        newValueToOperate
  }
  const substractOperation = (newValue: Value, valueList: Value[], newValueToOperate: number) => {
    newValue.finalResult = valueList[valueList.length-1] ?
        valueList[valueList.length-1].finalResult - newValueToOperate :
        newValueToOperate
  }
  const timesOperation = (newValue: Value, valueList: Value[], newValueToOperate: number) => {
    newValue.finalResult = valueList[valueList.length-1] ?
        valueList[valueList.length-1].finalResult * newValueToOperate :
        newValueToOperate
  }
  const divideOperation = (newValue: Value, valueList: Value[], newValueToOperate: number) => {
    newValue.finalResult = valueList[valueList.length-1] ?
        valueList[valueList.length-1].finalResult / newValueToOperate :
        newValueToOperate
  }
  const _calcNewValue = (operation: '+' | '-' | '*' | '/') => {    
    const newValueToOperate = parseFloat($input.replace(',','.'))
    const newValue: Value = {
      operation,
      newValueToOperate,
      finalResult:null as any
    }
    
    switch (operation) {
      case '+':
        addOperation(newValue,$valueList,newValueToOperate)
        break;
      case '-':
        substractOperation(newValue,$valueList,newValueToOperate)
        break;  
      case '*':
        timesOperation(newValue,$valueList,newValueToOperate)
        break;  
      case '/':
        divideOperation(newValue,$valueList,newValueToOperate)
        break;    
    }
    return newValue
  }

  const addOrEnterDispatch = (newValueList: any[]) => {
    if($input ==='') return
    input.set('')
    localStorage.setItem('list-backup',JSON.stringify(newValueList))
    valueList.set(newValueList)
  }

  const otherOperationDispatch = (newValueList: any[])=>{
    if($input ==='') return
    input.set('')
    localStorage.setItem('list-backup',JSON.stringify(newValueList))
    valueList.set(newValueList)
  }

  const clearDispatch = ()=>{
    input.set('')
    localStorage.removeItem('list-backup')
    valueList.set([])
  }

  const configDispatch = ()=>{
    navigate('/config')
  }

  const dispatchValue = (type:string) => {
    let newValueList = type === 'Enter' ? [...$valueList as any,_calcNewValue('+')] : [...$valueList as any,_calcNewValue(type as any)]
    switch (type) {
      case 'Enter':
      case '+':        
        return addOrEnterDispatch(newValueList)
      case '-':
      case '*':
      case '/':
        return otherOperationDispatch(newValueList) 
      case 'CE/C':
        return clearDispatch()
      case 'Config':
        return configDispatch();
      default:
        console.log('UNIMPLEMENTED: ',type)
        break;  
      ;

    }
  }

  const onInputFromVirtualKeyboard = (change:string) => {
    if(
        change === ',' && ($input.includes(',') || $input.includes('.')) || 
        change === '.' && ($input.includes(',') || $input.includes('.')) 
      ){
        return
      }
      input.update(inpt => inpt + change)      
  }

  const onInput = (change: string) => {
    const eventKeys = ['Enter','+','-','*','/','CE/C','CSV','Config']
    
    if(eventKeys.includes(change)){
      dispatchValue(change)
      return
    }

    onInputFromVirtualKeyboard(change)
  }  
</script>

<div class="sumadoraContainer">
    <SumadoraList/>
    <SumadoraInput dispatch={dispatchValue} />
    <SumadoraButtonsLayout onChangeOrInputDetected={onInput}/>
</div>    

<style lang="scss" type="module">
    $min_screen: 0px;
    $sm_screen: 640px;
    $md_screen: 768px ;
    $lg_screen: 1024px;
    $xl_screen: 1280px ;

    .sumadoraContainer{
        display: grid;
        grid-template-rows: minmax(0,1fr) 4rem minmax(0,1fr);
        @media (min-width: $min_screen) {
            height: 85vh;
        }
        @media (min-width: $sm_screen) {
            height: 92.5vh;
        }
        @media (min-width: $md_screen) {
            height: 92.5vh;        
        }
    }
</style>