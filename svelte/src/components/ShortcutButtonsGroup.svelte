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
    onClick={() => addSpecialCharacters('const  = () => {\n  \n};', 16)}
    aria-label="add ES6 function">
    fn
  </button>
  <button
    onClick={() => addSpecialCharacters('()')}
    aria-label="add round brackets">
    ()
  </button>
  <button
    onClick={() => addSpecialCharacters('[]')}
    aria-label="add square brackets">
    []
  </button>
  <button
    onClick={() => addSpecialCharacters('{}')}
    aria-label="add curly brackets">
    &#123;&#125;
  </button>
  <button
    onClick={() => addSpecialCharacters('""')}
    aria-label="add quotation marks">
    ""
  </button>
  <button
    onClick={() => addSpecialCharacters('// ', 0)}
    aria-label="add comment">
    //
  </button>
  <button
    onClick={() => addSpecialCharacters('<>')}
    aria-label="add angular tag brackets">
    &lt;&gt;
  </button>
  <button
    id="suggestion-button"
    onClick={useSuggestion}
    style={{ display: suggestion.suggestion ? 'inline-block' : 'none' }}
    aria-label="use suggestion">
    {suggestion.suggestion}
  </button>
</div>
