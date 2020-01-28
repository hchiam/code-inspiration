import React from 'react';
import './App.css';
import Ideas from './components/Ideas';

function App() {
  const initialInput = '';
  const initialIdeas = JSON.parse(localStorage.getItem('ideas')) || [];
  const [input, setInput] = React.useState(initialInput);
  const [ideas, setIdeas] = React.useState(initialIdeas); // also updateIdeasLocalStorage
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
    const newIdeas = ideas.concat({code: input, timestamp: new Date().getTime()});
    setIdeas(newIdeas);
    updateIdeasLocalStorage(newIdeas);
    textarea.focus();
  };
  const deleteIdea = (timestamp) => {
    const newIdeas = ideas.filter((e) => e.timestamp !== timestamp);
    setIdeas(newIdeas);
    updateIdeasLocalStorage(newIdeas);
    setDisplayOptionTimestamp(-1);
    focusTextArea();
  };
  const emailIdea = (code) => {
    window.open('mailto:test@example.com?subject=Idea&body=' + urlAcceptableString(code));
  };
  const saveIdea = (code) => {
    if (code === '') return;
    try {
      const fileName = 'idea.js';
      const tempElem = document.createElement('a');
      tempElem.setAttribute('href', 'data:text/plain;charset=utf-8,' + urlAcceptableString(code));
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
  const addSpecialCharacters = (characters) => {
    const cursorPosition = document.querySelector('textarea').selectionStart;
    const newInput = input.split('');
    newInput.splice(cursorPosition, 0, characters);
    setInput(newInput.join(''));
    const textarea = document.getElementById('input');
    textarea.value = newInput.join('');
    textarea.focus();
    const start = cursorPosition + characters.length;
    const end = start - 1;
    textarea.setSelectionRange(start, end);
  };
  return (
    <div className="App">
      <header className="App-header">
        <h1>Capture <code>code</code> ideas:</h1>
        <div id="split-container" className="wrap-elements-if-too-wide">
          <div>
            <textarea id="input"
                      onChange={(e) => {expandTextarea();setInput(e.target.value)}}
                      onKeyDown={checkCommandEnter}
                      value={input}
                      placeholder="type code here"
                      autoFocus/>
            <div>
              <button onClick={() => addSpecialCharacters('const  = () => ;')}
                      aria-label="add ES6 function">fn</button>
              <button onClick={() => addSpecialCharacters('()')}
                      aria-label="add round brackets">()</button>
              <button onClick={() => addSpecialCharacters('[]')}
                      aria-label="add square brackets">[]</button>
              <button onClick={() => addSpecialCharacters('{}')}
                      aria-label="add curly brackets">&#123;&#125;</button>
              <button onClick={() => addSpecialCharacters('""')}
                      aria-label="add quotation marks">""</button>
            </div>
            <button onClick={addIdea}
                    style={{display: input !== '' ? 'block' : 'none', margin: 'auto'}}
                    >Add idea</button>
          </div>
          <pre className="react-markdown"
              style={{display: input !== '' ? 'block' : 'none'}}>
            <code className="language-js">{input}</code>
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
