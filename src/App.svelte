<script lang="ts">
  import { Router, Route, Link, createHistory } from "svelte-navigator";	
    import SumadoraPage from "./lib/pages/SumadoraPage.svelte";
</script>

<Router>
  <Route path="/" component={SumadoraPage}/>
</Router>

<style>
  
</style>
