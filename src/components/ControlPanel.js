import React from 'react';
import '../App.css';
import ShortcutButtonsGroup from './ShortcutButtonsGroup';
import Preview from './Preview';

function ControlPanel(props) {
  // TODO: move most props here
  return (
    <div id="split-container" className="wrap-elements-if-too-wide">
      <div id="control-panel">
        <textarea id="input"
                  onChange={(e) => {props.expandTextarea();props.setInput(e.target.value);props.updatePreview(e.target.value);}}
                  onKeyDown={(e) => props.checkCommandEnter(e)}
                  value={props.input}
                  placeholder="type code here"
                  autoFocus/>
        <ShortcutButtonsGroup addSpecialCharacters={props.addSpecialCharacters}
                              useSuggestion={props.useSuggestion}
                              suggestion={props.suggestion}/>
        <button id="add-idea-button"
                onClick={props.addIdea}
                style={{display: props.input !== '' ? 'block' : 'none', margin: 'auto'}}
                >Add idea</button>
      </div>
      <Preview input={props.input}
               preview={props.preview}/>
    </div>
  );
}

export default ControlPanel;
