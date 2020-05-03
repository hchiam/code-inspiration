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

<pre
  id="preview"
  className="react-markdown"
  style={{ display: input !== '' ? 'block' : 'none' }}>
  <!-- <SyntaxHighlighter language="javascript" style={docco}> -->
  {preview}
  <!-- </SyntaxHighlighter> -->
</pre>
