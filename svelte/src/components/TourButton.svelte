<script>
  // import { tour, addListeners } from "../helpers/tour.js";

  let showButton = false;
  setTimeout(() => {
    showButton = true;
  }, 3000);

  const runTour = () => {
    tour.start();
    addListeners();
    document.body.classList.add("shepherd-active");
  };
</script>

<style>
  #tour-button {
    background: blue;
  }
</style>

{#if showButton}
  <button id="tour-button" on:click={runTour}>What is this?</button>
{/if}
