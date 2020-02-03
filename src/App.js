import React from 'react';
import './App.css';
import Ideas from './components/Ideas';

function App() {
  const initialInput = '';
  const initialIdeas = JSON.parse(localStorage.getItem('ideas')) || [];
  const initialSuggestion = {suggestion: '', start: -1, stop: -1};
  const [input, setInput] = React.useState(initialInput); // also updatePreview
  const [preview, setPreview] = React.useState('');
  const [ideas, setIdeas] = React.useState(initialIdeas); // also updateIdeasLocalStorage
  const [suggestion, setSuggestion] = React.useState(initialSuggestion);
  const [displayOptionTimestamp, setDisplayOptionTimestamp] = React.useState(-1);
  const focusTextArea = () => {
    document.querySelector('textarea').focus();
  };
  const showOptions = (timestamp) => {
    setDisplayOptionTimestamp(timestamp);
  };
  const hideOptions = () => {
    setDisplayOptionTimestamp(-1);
  }
  const urlAcceptableString = (code) => {
    return encodeURIComponent(code) // handles most
      .replace(/!/g, '%21') // handle technically OK but may have meanings depending on context
      .replace(/"/g, '%22')
      .replace(/#/g, '%23')
      .replace(/\$/g, '%24')
      .replace(/%/g, '%25')
      .replace(/&/g, '%26')
      .replace(/'/g, '%27')
      .replace(/\(/g, '%28')
      .replace(/\)/g, '%29')
      .replace(/\*/g, '%2A')
      .replace(/-/g, '%2D')
      .replace(/\./g, '%2E')
      .replace(/</g, '%3C')
      .replace(/>/g, '%3E')
      .replace(/_/g, '%3F')
      .replace(/~/g, '%7E')
  };
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
  const deleteIdea = (idea) => {
    if (!idea.timestamp) {
      alert('Error - could not find timestamp for this idea.');
      return;
    }
    const timestampOfIdeaToDelete = idea.timestamp;
    const newIdeas = ideas.filter((e) => e.timestamp !== timestampOfIdeaToDelete);
    setIdeas(newIdeas);
    updateIdeasLocalStorage(newIdeas);
    setDisplayOptionTimestamp(-1);
    focusTextArea();
  };
  const emailIdea = (idea) => {
    if (!idea.code || idea.code === '') {
      alert('Error - could not find code for this idea.');
      return;
    }
    window.open('mailto:test@example.com?subject=Idea&body=' + urlAcceptableString(idea.code));
  };
  const saveIdea = (idea) => {
    if (!idea.code || idea.code === '') {
      alert('Error - could not find code for this idea.');
      return;
    } else if (!idea.timestamp) {
      alert('Error - could not find timestamp for this idea.');
      return;
    }
    const code = idea.code;
    try {
      const fileName = `idea-${idea.timestamp}.js`;
      const tempElem = document.createElement('a');
      // use encodeURIComponent instead of urlAcceptableString since saving to file
      tempElem.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(code));
      tempElem.setAttribute('download', fileName);
      if (document.createEvent) {
        const event = document.createEvent('MouseEvents');
        event.initEvent('click', true, true);
        tempElem.dispatchEvent(event);
      } else {
        tempElem.click();
      }
    } catch(err) {
      window.open('data:text/txt;charset=utf-8,' + escape(code), 'newdoc');
    }
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
        <div id="split-container" className="wrap-elements-if-too-wide">
          <div>
            <textarea id="input"
                      onChange={(e) => {expandTextarea();setInput(e.target.value);updatePreview(e.target.value);}}
                      onKeyDown={(e) => checkCommandEnter(e)}
                      value={input}
                      placeholder="type code here"
                      autoFocus/>
            <div>
              <button onClick={() => addSpecialCharacters('const  = () => {\n  \n};', 16)}
                      aria-label="add ES6 function">fn</button>
              <button onClick={() => addSpecialCharacters('()')}
                      aria-label="add round brackets">()</button>
              <button onClick={() => addSpecialCharacters('[]')}
                      aria-label="add square brackets">[]</button>
              <button onClick={() => addSpecialCharacters('{}')}
                      aria-label="add curly brackets">&#123;&#125;</button>
              <button onClick={() => addSpecialCharacters('""')}
                      aria-label="add quotation marks">""</button>
              <button id="suggestion-button"
                      onClick={useSuggestion}
                      style={{display: suggestion.suggestion ? 'inline-block' : 'none'}}
                      aria-label="use suggestion">{suggestion.suggestion}</button>
            </div>
            <button onClick={addIdea}
                    style={{display: input !== '' ? 'block' : 'none', margin: 'auto'}}
                    >Add idea</button>
          </div>
          <pre className="react-markdown"
              style={{display: input !== '' ? 'block' : 'none'}}>
            <code className="language-js">{preview}</code>
          </pre>
        </div>
        <p style={{display: ideas.length > 0 ? 'block' : 'none'}}>_____________________</p>
        <Ideas ideas={ideas}
               displayOptionTimestamp={displayOptionTimestamp}
               showOptions={showOptions}
               hideOptions={hideOptions}
               deleteIdea={deleteIdea}
               emailIdea={emailIdea}
               saveIdea={saveIdea}/>
      </header>
    </div>
  );
}

export default App;
