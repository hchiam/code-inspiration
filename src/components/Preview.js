import React from 'react';
import '../App.css';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';

import PropTypes from 'prop-types';

Preview.propTypes = {
  input: PropTypes.string.isRequired,
  preview: PropTypes.string.isRequired,
};

function Preview(props) {
  return (
    <pre id="preview"
         className="react-markdown"
         style={{display: props.input !== '' ? 'block' : 'none'}}>
      <SyntaxHighlighter language="javascript" style={docco}>
        {props.preview}
      </SyntaxHighlighter>
    </pre>
  );
}

export default Preview;
