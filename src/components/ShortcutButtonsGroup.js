import React from 'react';
import '../App.css';

function ShortcutButtonsGroup(props) {
  // TODO: suggestion should be in control panel
  return (
    <div id="shortcut-buttons-group">
      <button onClick={() => props.addSpecialCharacters('const  = () => {\n  \n};', 16)}
              aria-label="add ES6 function">fn</button>
      <button onClick={() => props.addSpecialCharacters('()')}
              aria-label="add round brackets">()</button>
      <button onClick={() => props.addSpecialCharacters('[]')}
              aria-label="add square brackets">[]</button>
      <button onClick={() => props.addSpecialCharacters('{}')}
              aria-label="add curly brackets">&#123;&#125;</button>
      <button onClick={() => props.addSpecialCharacters('""')}
              aria-label="add quotation marks">""</button>
      <button id="suggestion-button"
              onClick={props.useSuggestion}
              style={{display: props.suggestion.suggestion ? 'inline-block' : 'none'}}
              aria-label="use suggestion">{props.suggestion.suggestion}</button>
    </div>
  );
}

export default ShortcutButtonsGroup;
