import React from 'react';
import '../App.css';
import ShortcutButtonsGroup from './ShortcutButtonsGroup';
import Preview from './Preview';
import expandTextarea from '../helpers/expandTextarea.js';

import PropTypes from 'prop-types';

ControlPanel.propTypes = {
  ideas: PropTypes.array.isRequired,
  setIdeas: PropTypes.func.isRequired,
};

ControlPanel.defaultProps = {
  ideas: [],
};

function ControlPanel(props) {
  const initialInput = '';
  const initialSuggestion = {suggestion: '', start: -1, stop: -1};
  const [input, setInput] = React.useState(initialInput); // also updatePreview
  const [preview, setPreview] = React.useState('');
  const [suggestion, setSuggestion] = React.useState(initialSuggestion);
  const updateIdeasLocalStorage = (newIdeas) => {
    localStorage.setItem('ideas', JSON.stringify(newIdeas));
  };
  const addIdea = () => {
    const textarea = document.querySelector('textarea');
    textarea.classList.remove('expand');
    // exit early if no input
    if (textarea.value === '') {
      textarea.focus();
      return;
    }
    setInput('');
    setPreview('');
    const newIdeas = props.ideas.concat({code: preview, timestamp: new Date().getTime()});
    props.setIdeas(newIdeas);
    updateIdeasLocalStorage(newIdeas);
    textarea.focus();
  };
  const checkCommandEnter = (event) => {
    if ((event.ctrlKey || event.metaKey) && event.keyCode === 13) {
      addIdea();
    }
  };
  const isSpecialWord = (word) => {
    const keyWords = [
      'const', 'let', 'var', 'function', 'if', 'for', 'import', 'from', 'export', 'default',
    ];
    if (keyWords.includes(word)) return true;
    const punctuationExceptAFewThings = /[^\w\s,()]/g;
    if (punctuationExceptAFewThings.test(word)) return true;
    return false;
  };
  const combineCamelCase = (overrideInput) => {
    const words = (overrideInput || input).split(' ');
    if (words.length < 2) return;
    // TODO: search around where user typed, not blindly through the whole thing
    for (let i = 0; i < words.length - 1; i++) {
      const left = words[i];
      const right = words[i+1];
      const alreadySeparateWords = left && /\W$/.test(left);
      if (left && right && !alreadySeparateWords && !isSpecialWord(left) && !isSpecialWord(right)) {
        const newSuggestion = left + right[0].toUpperCase() + right.slice(1);
        const startSelection = words.slice(0, i).join(' ').length + (i===0 ? 0 : 1);
        const stopSelection = startSelection + words[i].length + 1 + words[i+1].length;
        setSuggestion({
          suggestion: newSuggestion,
          start: startSelection,
          stop: stopSelection,
        });
        const ariaLabel = `use suggestion: "${newSuggestion}", with no spaces between`
        document.getElementById('suggestion-button').setAttribute('aria-label', ariaLabel);
      }
    }
  };
  const updatePreview = (overrideInput) => { // (overrideInput is optional)
    combineCamelCase(overrideInput);
    setPreview(overrideInput || input);
  };
  const replaceRange = (original, start, stop, substitute) => {
    return original.substring(0, start) + substitute + original.substring(stop);
  }
  const getLengthBeforePunctuation = (str) => {
    // ignore first character (in case it's punctuation)
    for (let i = str.length - 1; i > 0; i--) {
      if (/\W/.test(str[i])) return i;
    }
    return str.length;
  };
  const useSuggestion = () => {
    let newInput = replaceRange(input, suggestion.start, suggestion.stop, suggestion.suggestion);
    setInput(newInput);
    setPreview(newInput);
    const textarea = document.getElementById('input');
    textarea.value = newInput;
    textarea.focus();
    const newCursorPos = suggestion.start + getLengthBeforePunctuation(suggestion.suggestion);
    textarea.setSelectionRange(suggestion.start, newCursorPos);
    // reset
    setSuggestion(initialSuggestion);
  };
  const addSpecialCharacters = (characters, putCursorBack) => {
    const cursorPosition = document.querySelector('textarea').selectionStart;
    let newInput = input.split('');
    newInput.splice(cursorPosition, 0, characters);
    newInput = newInput.join('');
    setInput(newInput);
    setPreview(newInput);
    const textarea = document.getElementById('input');
    textarea.value = newInput;
    textarea.focus();
    const start = cursorPosition + characters.length;
    const end = start - (putCursorBack || 1);
    textarea.setSelectionRange(start, end);
    expandTextarea();
  };
  return (
    <div id="split-container" className="wrap-elements-if-too-wide">
      <div id="control-panel">
        <textarea id="input"
                  onChange={(e) => {expandTextarea();setInput(e.target.value);updatePreview(e.target.value);}}
                  onKeyDown={(e) => checkCommandEnter(e)}
                  value={input}
                  placeholder="type code here"
                  autoFocus/>
        <ShortcutButtonsGroup addSpecialCharacters={addSpecialCharacters}
                              useSuggestion={useSuggestion}
                              suggestion={suggestion}/>
        <button id="add-idea-button"
                onClick={addIdea}
                style={{display: input !== '' ? 'block' : 'none', margin: 'auto'}}
                >Add idea</button>
      </div>
      <Preview input={input}
               preview={preview}/>
    </div>
  );
}

export default ControlPanel;
