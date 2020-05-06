<script>
  import ControlPanel from "../components/ControlPanel.svelte";
  import IdeasWrapper from "../components/IdeasWrapper.svelte";
  import TourButton from "../components/TourButton.svelte";

  // wrap lazily loaded components with <Suspense>:
  // const IdeasWrapper = React.lazy(() => import("./components/IdeasWrapper"));
  // const TourButton = React.lazy(() => import("./components/TourButton"));

  let ideas = [];
  const setIdeas = function(newIdeas) {
    ideas = newIdeas;
  };

  import { onMount } from "svelte";
  onMount(() => {
    ideas = JSON.parse(localStorage.getItem("ideas")) || [];
  });
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
  <ControlPanel {ideas} {setIdeas} />
  <!-- <Suspense fallback={<div style={{ display: "none" }}></div>}> -->
  <IdeasWrapper {ideas} {setIdeas} />
  <!-- </Suspense> -->
  <!-- <Suspense fallback={<div style={{ display: "none" }}></div>}> -->
  <TourButton />
  <!-- </Suspense> -->
</div>
