import React from 'react';
import '../App.css';
import Draggable from 'react-draggable';
import CollapsingButton from './CollapsingButton';

function Ideas(props) {
  const [displayOptionTimestamp, setDisplayOptionTimestamp] = React.useState(-1);
  const showOptions = (timestamp) => {
    setDisplayOptionTimestamp(timestamp);
  };
  const hideOptions = () => {
    setDisplayOptionTimestamp(-1);
  }
  const focusTextArea = () => {
    document.querySelector('textarea').focus();
  };
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
  const deleteIdea = (idea) => {
    if (!idea.timestamp) {
      alert('Error - could not find timestamp for this idea.');
      return;
    }
    const timestampOfIdeaToDelete = idea.timestamp;
    const newIdeas = props.ideas.filter((e) => e.timestamp !== timestampOfIdeaToDelete);
    props.setIdeas(newIdeas);
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
  const pasteIdea = (idea) => {
    const textarea = document.getElementById('input');
    const input = textarea.value;
    const originalCursorPosition = document.querySelector('textarea').selectionStart;
    let newInput = input.slice(0, originalCursorPosition) + idea.code + input.slice(originalCursorPosition);
    textarea.value = newInput;
    textarea.focus();
    const newCursorPos = originalCursorPosition + idea.code.length;
    textarea.setSelectionRange(originalCursorPosition, newCursorPos);
  };
  const allowListToFillSpace = (e, timestamp) => {
    // allow list to fill space left behind by dragged element
    const dragged = document.querySelector(`div#idea-${timestamp}`);
    dragged.style.position = 'absolute';
  };
  return (
    <div id="ideas">
      <p style={{display: props.ideas.length > 0 ? 'block' : 'none'}}>_____________________</p>
      {
        props.ideas.map((idea) =>
          // (Note: include just one element within Draggable. Use div to show on new line.)
          <Draggable key={idea.timestamp} onStop={(e) => allowListToFillSpace(e, idea.timestamp)}>
            <div id={"idea-" + idea.timestamp}>
              <pre className="react-markdown"
                   onMouseOver={() => showOptions(idea.timestamp)}
                   onMouseLeave={hideOptions}
                   title="Psst! You can drag me around the screen.">
                <div className="vertical-row">
                  <CollapsingButton idea={idea}
                                    buttonText='X'
                                    action={deleteIdea}
                                    label='Delete this idea'
                                    displayOptionTimestamp={displayOptionTimestamp}/>
                  <CollapsingButton idea={idea}
                                    buttonText='Email'
                                    action={emailIdea}
                                    label='Email this idea'
                                    displayOptionTimestamp={displayOptionTimestamp}/>
                  <CollapsingButton idea={idea}
                                    buttonText='Save'
                                    action={saveIdea}
                                    label='Save this idea as a JavaScript file'
                                    displayOptionTimestamp={displayOptionTimestamp}/>
                  <CollapsingButton idea={idea}
                                    buttonText='Reuse'
                                    action={pasteIdea}
                                    label='Reuse this idea in the input area'
                                    displayOptionTimestamp={displayOptionTimestamp}/>
                </div>
                <code className="language-js">{idea.code}</code>
              </pre>
            </div>
          </Draggable>
        )
      }
    </div>
  );
}

export default Ideas;
