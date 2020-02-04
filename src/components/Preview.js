import React from 'react';
import '../App.css';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';

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
