<script lang="ts">
    import { isInputFocused } from '../context/inputStatus';
    import {input} from '../context/value'

    export let dispatch : (dispatchType: string) => void

    const getCharsInString = (string:string,floatingChar: string) =>
        string.split('').filter((char:string)=>char===floatingChar).length

    const changeInput = (value:string) => {
        if(
        $input.includes(',') && value.includes('.') ||
        $input.includes('.') && value.includes(',')
        ) return;
        if(
        getCharsInString(value,',') >=2 && ($input.includes(',') || $input.includes('.')) || 
        getCharsInString(value,'.') >=2 && ($input.includes(',') || $input.includes('.')) 
        ){
        return
        }
        input.set(value)
    }

    const onChange = (e:any)=>changeInput(e.target.value)

    const onFocus = () => {
        isInputFocused.set(true)
    }

    const onBlur = () => {
        isInputFocused.set(false)
    }    

    const dispatchUp = (dispatchType:string) => {
        const eventKeys = ['Enter','+','-','*','/']
        if(eventKeys.includes(dispatchType)){
            dispatch(dispatchType)
        }
    }
</script>

<div>
    <input
        on:keyup={({key})=>dispatchUp(key)}
        class="input"
        on:focus={onFocus}
        on:blur={onBlur}
        value={$input}
        on:change={onChange}
        type="text"
        name="input"
      />
</div>

<style lang="scss" type="module">
    .input{
        border: none;
        border-radius: .5rem;
        padding:1rem;
        width: 95%;
        font-size: large;

        @media (prefers-color-scheme: light) {
            & {
                margin-top: 0.35rem;
                border: 1px solid rgb(103, 103, 103);
                background-color: #c7c7c7;            
            }
        }
    }
</style>