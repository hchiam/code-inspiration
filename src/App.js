import React from 'react';
import './App.css';
import Draggable from 'react-draggable';

function App() {
  const initialInput = '';
  const [input, setInput] = React.useState(initialInput);
  const [ideas, setIdeas] = React.useState([]);
  const [displayOptionIndex, setDisplayOptionIndex] = React.useState(-1);
  const focusTextArea = () => {
    document.querySelector('textarea').focus();
  };
  const updateInput = () => {
    const textarea = document.querySelector('textarea');
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
    setTimeout(() => {
      setDisplayOptionIndex(-1);
    }, 1000);
  };
  const deleteIdea = (index) => {
    setIdeas(ideas.filter((e, id) => id !== index));
    setDisplayOptionIndex(-1);
    focusTextArea();
  };
  const saveIdea = (index) => {
    // TODO
  };
  return (
    <div className="App">
      <header className="App-header">
        <h1>Capture <code>code</code> inspiration:</h1>
        <div id="split-container">
          <div>
            <textarea onInput={(e) => setInput(e.target.value)}
                      value={input}
                      placeholder="type code here"
                      autoFocus/>
            <button onClick={updateInput}
                    style={{display: input !== '' ? 'block' : 'none', margin: 'auto'}}>Add idea</button>
          </div>
          <pre className="react-markdown"
              style={{display: input !== '' ? 'block' : 'none'}}>
            <code class="language-js">{input}</code>
          </pre>
        </div>
        <p style={{display: ideas.length > 0 ? 'block' : 'none'}}>_____________________</p>
        <div id="ideas">
          {
            ideas.map((idea, index) =>
              // (note: include just one element within Draggable)
              <Draggable>
                <pre className="react-markdown"
                     key={index}
                     onMouseEnter={(e) => showOptions(e, index)}
                     title="Psst! You can drag me around the screen.">
                  <button className="idea-button"
                          style={{display: displayOptionIndex === index ? 'block' : 'none'}}
                          onClick={() => deleteIdea(index)}>X</button>
                  <code class="language-js">{idea}</code>
                </pre>
              </Draggable>
            )
          }
        </div>
      </header>
    </div>
  );
}

export default App;
