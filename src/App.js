import React from 'react';
import './App.css';
import Ideas from './components/Ideas';
import ControlPanel from './components/ControlPanel';

function App() {
  const initialInput = '';
  const initialIdeas = JSON.parse(localStorage.getItem('ideas')) || [];
  const initialSuggestion = {suggestion: '', start: -1, stop: -1};
  const [input, setInput] = React.useState(initialInput); // also updatePreview
  const [preview, setPreview] = React.useState('');
  const [ideas, setIdeas] = React.useState(initialIdeas); // also updateIdeasLocalStorage
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
    const newIdeas = ideas.concat({code: preview, timestamp: new Date().getTime()});
    setIdeas(newIdeas);
    updateIdeasLocalStorage(newIdeas);
    textarea.focus();
  };
  const checkCommandEnter = (event) => {
    if ((event.ctrlKey || event.metaKey) && event.keyCode === 13) {
      addIdea();
    }
  };
  const expandTextarea = () => {
    const textarea = document.querySelector('textarea');
    if (textarea.value) {
      textarea.classList.add('expand');
    } else {
      textarea.classList.remove('expand');
    }
  };
  const isSpecialWord = (word) => {
    const keyWords = [
      'const', 'let', 'var', 'function', 'if', 'for',
    ];
    if (keyWords.includes(word)) return true;
    if (/^\W+$/.test(word)) return true;
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
  const useSuggestion = () => {
    let newInput = replaceRange(input, suggestion.start, suggestion.stop, suggestion.suggestion);
    setInput(newInput);
    setPreview(newInput);
    const textarea = document.getElementById('input');
    textarea.focus();
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
    <div className="App">
      <header className="App-header">
        <h1>Capture <code>code</code> ideas:</h1>
        <ControlPanel expandTextarea={expandTextarea}
                      setInput={setInput}
                      updatePreview={updatePreview}
                      checkCommandEnter={checkCommandEnter}
                      input={input}
                      addSpecialCharacters={addSpecialCharacters}
                      useSuggestion={useSuggestion}
                      suggestion={suggestion}
                      addIdea={addIdea}
                      input={input}
                      input={input}
                      preview={preview}/>
        <Ideas ideas={ideas}
               setIdeas={setIdeas}/>
      </header>
    </div>
  );
}

export default App;
