<script>
  import ControlPanel from "../components/ControlPanel.svelte";
  import IdeasWrapper from "../components/IdeasWrapper.svelte";
  import TourButton from "../components/TourButton.svelte";
  import { onMount } from "svelte";
  import Lazy from "svelte-lazy";

  let ideas;
  onMount(() => {
    ideas = JSON.parse(localStorage.getItem("ideas")) || [];
  });

  const setIdeas = function(newIdeas) {
    ideas = newIdeas;
    localStorage.setItem("ideas", JSON.stringify(newIdeas));
  };
</script>

<svelte:head>
  <title>Code Inspiration</title>
</svelte:head>

<div className="App">
  <h1>
    Capture
    <code>code</code>
    ideas:
  </h1>
  <Lazy>
    <ControlPanel {ideas} {setIdeas} />
    <Lazy>
      <IdeasWrapper {ideas} {setIdeas} />
    </Lazy>
    <Lazy>
      <TourButton />
    </Lazy>
  </Lazy>
</div>
