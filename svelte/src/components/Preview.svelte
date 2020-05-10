<script>
  export let input = "";
  export let preview = "";

  import Highlight from "svelte-highlight";
  import { javascript } from "svelte-highlight/languages";
  import { github } from "svelte-highlight/styles";

  // import PropTypes from "prop-types";

  // Preview.propTypes = {
  //   input: PropTypes.string.isRequired,
  //   preview: PropTypes.string.isRequired
  // };
</script>

<style>
  .hide {
    display: none;
  }
</style>

<svelte:head>
  {@html github}
</svelte:head>
<div class:hide={input === ''}>
  <Highlight language={javascript} code={preview} />
</div>
