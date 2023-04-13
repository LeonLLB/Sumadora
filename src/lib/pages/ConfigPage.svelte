<script lang="ts">
    import {navigate} from 'svelte-navigator'
    import {config} from '../context/config'

    const value = $config

    const setConfig = ()=> config.set(value)

    const goBackToSumadora = () => navigate('/')

</script>

<div class="configContainer">
    <h2>Configuración</h2>
    <div class="inputContainer">
        <label for="decimal">Decimal:</label>
        <input type="number" min="0" max="10" on:change={setConfig} bind:value={value.decimal} />
    </div>
    <button on:click={goBackToSumadora} class="backBtn">Ir a sumadora</button>
</div>

<style lang="scss" type="module">
    $min_screen: 0px;
    $sm_screen: 640px;
    $md_screen: 768px ;
    $lg_screen: 1024px;
    $xl_screen: 1280px ;

    .configContainer{
        display: flex;
        flex-direction: column;
        @media (min-width: $min_screen) {
            height: 85vh;
        }
        @media (min-width: $sm_screen) {
            height: 92.5vh;
        }
        @media (min-width: $md_screen) {
            height: 92.5vh;        
        }

        & > * + * {
            margin-top: .5rem !important;
        }

        & .inputContainer {
            display: flex;
            flex-direction: column;
            
            & input{
                font-size: large;
                padding: .5rem;
            }

            & label{
                font-size: large;
            }
        }

        & .backBtn{
            border-radius: 1rem;
            padding: 0.5rem;
            height:2rem;
            transition: all ease-in-out 100ms;

            &:hover {
                filter: drop-shadow(0 0 .25rem #606173aa) blur(1px);		
                transform: scale(0.90);
            }

            @media (prefers-color-scheme: light) {
                &:hover {
                    filter: drop-shadow(0 0 10rem #242424aa) blur(1px);		
                }
            }
        }
    }
</style>