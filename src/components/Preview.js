import React from 'react';
import '../App.css';

function Preview(props) {
  return (
    <pre id="preview"
         className="react-markdown"
         style={{display: props.input !== '' ? 'block' : 'none'}}>
      <code className="language-js">{props.preview}</code>
    </pre>
  );
}

export default Preview;
