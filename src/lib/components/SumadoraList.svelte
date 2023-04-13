<script lang="ts">
    import { valueList } from "../context/valueList";
    console.log($valueList)
</script>
<div class="listContainer">
    <div class="list">
        <table>
            <tbody>
                {#each $valueList as value}
                    <tr>
                        <td class={value.operation + ' ' + "value"}> <span>{value.newValueToOperate}</span> </td>
                        <td class="operation" rowSpan={2}> <span class={value.operation}>{value.operation}</span> </td>
                    </tr>
                    <tr>
                        <td class="result"> <span>{value.finalResult}</span> </td>
                    </tr>
                {/each}
            </tbody>
        </table>
    </div>
    <div class="resultList">
        {$valueList[$valueList.length-1] ? $valueList[$valueList.length-1].finalResult : 0.0 }
    </div>
</div>


<style lang="scss" type="module">
    .listContainer {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        min-height: 100%;
        font-size: x-large;

        @media (prefers-color-scheme: light) {
            & {
                border-radius: .5rem;
                background-color: #c7c7c7;            
            }
        }

        & .list {
            height: 100%;
            width: 100%;

            & table {
                width: 100%
            }

            overflow-y: scroll;
        }

        & .resultList {
            padding: 1rem;

            @media (prefers-color-scheme: light) {
                & {
                    border-top: 1px solid rgb(103, 103, 103);            
                }
            }
            border-top: 1px solid white;

        }

        & .\- {
            color: red
        }

        & .\* {
            color: green
        }

        & .\/ {
            color: yellow;
        }

        & .operation {
            font-size: xx-large;
            width: 2rem;

            & .\- {
                color: red
            }

            & .\* {
                color: green
            }

            & .\/ {
                color: yellow;
            }
        }

        & .result,
        & .value {
            display: flex;
            flex-direction: row;
            justify-content: start;
        }


    }
</style>