<script>
  export let input = "";
  export let preview = "";
  // import SyntaxHighlighter from "react-syntax-highlighter";
  // import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";

  // import PropTypes from "prop-types";

  // Preview.propTypes = {
  //   input: PropTypes.string.isRequired,
  //   preview: PropTypes.string.isRequired
  // };
</script>

<style>
  pre {
    background: black;
    color: lime;
    border-radius: 0.25em;
    padding: 0.5em;
    margin: 0.5em;
    text-align: left;
    height: 100%;
    max-width: 90vw;
  }
</style>

{#if input !== ''}
  <pre id="preview" class="react-markdown">
    <!-- <SyntaxHighlighter language="javascript" style={docco}> -->
    {preview}
    <!-- </SyntaxHighlighter> -->
  </pre>
{/if}
