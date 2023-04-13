<script lang="ts">
  import { Router, Route} from "svelte-navigator";	
    import SumadoraPage from "./lib/pages/SumadoraPage.svelte";
    import ConfigPage from "./lib/pages/ConfigPage.svelte";
</script>

<Router>
  <Route path="/" primary={false} component={SumadoraPage}/>
  <Route path="/config" primary={false} component={ConfigPage}/>
</Router>

<style>
  
</style>
