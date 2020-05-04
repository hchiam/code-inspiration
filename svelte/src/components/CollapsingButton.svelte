<script>
  export let displayOptionTimestamp;
  export let idea;
  export let label;
  export let buttonText;
  export let action;

  // import PropTypes from "prop-types";

  // CollapsingButton.propTypes = {
  //   displayOptionTimestamp: PropTypes.number.isRequired,
  //   idea: PropTypes.object.isRequired,
  //   label: PropTypes.string.isRequired,
  //   buttonText: PropTypes.string.isRequired
  // };

  let matchesTimestamp = false;
  $: matchesTimestamp = displayOptionTimestamp === idea.timestamp;
</script>

<style>
  .idea-button {
    width: 0;
    height: 0;
    color: transparent;
  }

  .isHovered {
    width: 2.5rem;
    height: 2.5rem;
    color: whitesmoke;
  }
</style>

<button
  on:click={() => action(idea)}
  class="idea-button"
  class:isHovered={matchesTimestamp}
  aria-label={label}
  title={label}>
  {buttonText}
</button>
