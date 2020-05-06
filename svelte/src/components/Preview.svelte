<script>
  export let input = "";
  export let preview = "";

  import Highlight from "svelte-highlight";
  import { javascript } from "svelte-highlight/languages";

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

<div class:hide={input === ''}>
  <Highlight language={javascript} code={preview} />
</div>
