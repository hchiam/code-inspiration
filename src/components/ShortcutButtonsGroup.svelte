<script>
  export let addSpecialCharacters;
  export let useSuggestion;
  export let suggestion;

  // import PropTypes from "prop-types";

  // ShortcutButtonsGroup.propTypes = {
  //   addSpecialCharacters: PropTypes.func.isRequired,
  //   useSuggestion: PropTypes.func.isRequired,
  //   suggestion: PropTypes.object.isRequired
  // };
</script>

<div id="shortcut-buttons-group">
  <button
    on:click={() => addSpecialCharacters('const  = () => {\n  \n};', 16)}
    aria-label="add ES6 function">
    fn
  </button>
  <button
    on:click={() => addSpecialCharacters('()')}
    aria-label="add round brackets">
    ()
  </button>
  <button
    on:click={() => addSpecialCharacters('[]')}
    aria-label="add square brackets">
    []
  </button>
  <button
    on:click={() => addSpecialCharacters('{}')}
    aria-label="add curly brackets">
    &#123;&#125;
  </button>
  <button
    on:click={() => addSpecialCharacters('""')}
    aria-label="add quotation marks">
    ""
  </button>
  <button
    on:click={() => addSpecialCharacters('// ', 0)}
    aria-label="add comment">
    //
  </button>
  {#if suggestion.suggestion}
    <button
      id="suggestion-button"
      on:click={useSuggestion}
      aria-label="use suggestion">
      {suggestion.suggestion}
    </button>
  {/if}
</div>
