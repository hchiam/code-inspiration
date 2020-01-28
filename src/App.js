import React from 'react';
import './App.css';
import Ideas from './components/Ideas';

function App() {
  const initialInput = '';
  const [input, setInput] = React.useState(initialInput);
  const [ideas, setIdeas] = React.useState([]);
  const [displayOptionIndex, setDisplayOptionIndex] = React.useState(-1);
  const focusTextArea = () => {
    document.querySelector('textarea').focus();
  };
  const resetInput = () => {
    const textarea = document.querySelector('textarea');
    textarea.classList.remove('expand');
    // exit early if no input
    if (textarea.value === '') {
      textarea.focus();
      return;
    }
    setInput('');
    setIdeas(ideas.concat(input));
    textarea.focus();
  };
  const showOptions = (e, index) => {
    setDisplayOptionIndex(index);
  };
  const hideOptions = () => {
    setDisplayOptionIndex(-1);
  }
  const deleteIdea = (index) => {
    setIdeas(ideas.filter((e, id) => id !== index));
    setDisplayOptionIndex(-1);
    focusTextArea();
  };
  const saveIdea = (idea) => {
    window.open('mailto:test@example.com?subject=Idea&body=' + idea);
  };
  const checkCommandEnter = (event) => {
    if ((event.ctrlKey || event.metaKey) && event.keyCode === 13) {
      resetInput();
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
            <button onClick={resetInput}
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
               displayOptionIndex={displayOptionIndex}
               showOptions={showOptions}
               hideOptions={hideOptions}
               deleteIdea={deleteIdea}
               saveIdea={saveIdea}/>
      </header>
    </div>
  );
}

export default App;
