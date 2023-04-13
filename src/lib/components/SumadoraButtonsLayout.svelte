<script lang="ts">
    import { isInputFocused } from "../context/inputStatus";
    import SumadoraButton from "./SumadoraButton.svelte";
	import {onMount, onDestroy} from 'svelte'

	export let onChangeOrInputDetected: (change: string) => void

    interface buttonsArrObjectsProps {
        key: string | number
        colSpan?: number,
        isFunc?: boolean
    }

    const buttonsArr: buttonsArrObjectsProps[] = [
		{ key: 7 }, { key: 8 }, { key: 9 }, { key: '+', colSpan: 3 },
		{ key: 4 }, { key: 5 }, { key: 6 }, { key: '-', colSpan: 3 },
		{ key: 1 }, { key: 2 }, { key: 3 }, { key: '*', colSpan: 3 },
		{ key: 0 }, { key: '00' }, { key: ',' }, { key: '/', colSpan: 3 },
		{ key: 'CE/C', colSpan: 3, isFunc: true }, { key: 'Config', colSpan: 3, isFunc: true },
	]

	const defFunc = (key: string | number) => onChangeOrInputDetected(`${key}`)
	
	const keyboardListener = (e: KeyboardEvent) => {
		const validKeys = [
			'7','8','9','+',
			'4','5','6','-',
			'1','2','3','*',
			'0',',','.','/',
			'Enter',' '
		]
		if(validKeys.includes(e.key) && !$isInputFocused){
			onChangeOrInputDetected(e.key)
		}
	}

	onMount(()=>window.addEventListener('keyup',keyboardListener))
	onDestroy(()=>window.removeEventListener('keyup',keyboardListener))

	
</script>

<div class="container">
    {#each buttonsArr as button}
        <SumadoraButton keyBtn={button.key} onClick={defFunc} gridColSpan={button.colSpan} isFuncKey={button.isFunc} />
    {/each}
</div>

<style lang="scss" type="module">
    .container{
        display: grid;
        gap: 1.375rem;
        width: 100%;
        grid-template-columns: repeat(6,minmax(0,1fr));
        grid-template-rows: repeat(4,minmax(0,1fr)) 2rem;    
    }
</style>