<script>
  import { onMount } from "svelte";

  let showButton = false;
  setTimeout(() => {
    showButton = true;
  }, 3000);

  let tour, addListeners, runTour;

  onMount(async () => {
    // https://sapper.svelte.dev/docs#Making_a_component_SSR_compatible
    const { tour, addListeners } = await import("../helpers/tour.js");

    runTour = () => {
      tour.start();
      addListeners();
      document.body.classList.add("shepherd-active");
    };
  });
</script>

<style>
  #tour-button {
    background: blue;
  }
</style>

{#if showButton}
  <button
    id="tour-button"
    on:click={() => {
      runTour();
    }}>
    What is this?
  </button>
{/if}
