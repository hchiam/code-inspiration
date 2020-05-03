<script>
  // import { tour, addListeners } from "../helpers/tour";

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

<button
  id="tour-button"
  on:click={runTour}
  style={{ display: showButton ? 'block' : 'none', background: 'blue' }}>
  What is this?
</button>
