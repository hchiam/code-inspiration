import React from 'react';
import '../App.css';
import Draggable from 'react-draggable';
import Idea from './Idea';
import expandTextarea from '../helpers/expandTextarea';
import store from '../helpers/useRedux';

import PropTypes from 'prop-types';

IdeasWrapper.propTypes = {
  ideas: PropTypes.array.isRequired,
  setIdeas: PropTypes.func.isRequired,
};

function IdeasWrapper(props) {
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
    const preprocessedCode = code
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/\n/g, '<br/>')
    return encodeURIComponent(preprocessedCode) // handles most
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
    if (!window.confirm('Are you sure you want to delete this idea?')) return;
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
    const processedCode = urlAcceptableString(idea.code);
    window.open('mailto:test@example.com?subject=Idea&body=' + processedCode);
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
    expandTextarea();
    // update Redux store:
    store.dispatch({type: 'UPDATE_INPUT', input: newInput});
  };
  const allowListToFillSpace = (timestamp) => {
    // allow list to fill space left behind by dragged element:
    const dragged = document.querySelector(`div#idea-${timestamp}`);
    dragged.style.position = 'absolute';
  };
  const saveTransform = (idea) => {
    const timestamp = idea.timestamp
    const newIdeas = [...props.ideas];
    for (let i = 0; i < props.ideas.length; i++) {
      if (props.ideas[i].timestamp === timestamp) {
        const dragged = document.querySelector(`div#idea-${timestamp}`);
        const transformRegex = /^translate\((.+?)px, (.+?)px\).*/i;
        let transform = dragged.style.transform.match(transformRegex);
        if (!transform) continue;
        let translateX = transform[1];
        let translateY = transform[2];
        // newIdeas[i].transform = dragged.style.transform;
        newIdeas[i].translateX = translateX;
        newIdeas[i].translateY = translateY;
        if (translateX < -window.innerWidth/2 + dragged.offsetWidth/2) {
          translateX = -window.innerWidth/2 + dragged.offsetWidth/2;
        } else if (translateX > window.innerWidth/2 - dragged.offsetWidth/2) {
          translateX = window.innerWidth/2 - dragged.offsetWidth/2;
        }
        if (translateY < -window.innerHeight/2 + dragged.offsetHeight/2) {
          translateY = -window.innerHeight/2 + dragged.offsetHeight/2;
        } else if (translateY > window.innerHeight/2 - dragged.offsetHeight/2) {
          translateY = window.innerHeight/2 - dragged.offsetHeight/2;
        }
        transform = `translate(${translateX}px, ${translateY}px)`;
        newIdeas[i].transform = transform;
        dragged.style.transform = transform;
      }
    }
    props.setIdeas(newIdeas);
    updateIdeasLocalStorage(newIdeas);
  };
  const applyTransforms = () => {
    for (let i = 0; i < props.ideas.length; i++) {
      const idea = props.ideas[i];
      const ideaElement = document.querySelector(`div#idea-${idea.timestamp}`);
      if (idea.transform) {
        // remove <Draggable> default transform:
        ideaElement.style.removeProperty('transform');
        // set transform from props:
        ideaElement.style.transform = idea.transform;
        ideaElement.style.position = 'absolute';
      } else {
        ideaElement.style.position = 'static';
      }
    }
  };

  React.useEffect(() => {
    applyTransforms();
  });

  // prevent dragging in mobile:
  const likelyOnMobile = window.screen.width <= 420;

  if (likelyOnMobile) {

    // mobile version (no Draggable):
    return (
      <div id="ideas">
        <p style={{display: props.ideas.length > 0 ? 'block' : 'none'}}>_____________________</p>
        <p style={{display: props.ideas.length > 0 ? 'block' : 'none', padding: 0, margin: 0}}>Ideas:</p>
        {
          props.ideas.map((idea) =>
            <div key={idea.timestamp}>
              <div id={"idea-" + idea.timestamp}>
                <Idea displayOptionTimestamp={displayOptionTimestamp}
                      idea={idea}
                      showOptions={showOptions}
                      hideOptions={hideOptions}
                      deleteIdea={deleteIdea}
                      emailIdea={emailIdea}
                      saveIdea={saveIdea}
                      pasteIdea={pasteIdea}/>
              </div>
            </div>
          )
        }
      </div>
    );

  } else {

    // desktop version (has Draggable):
    return (
      <div id="ideas">
        <p style={{display: props.ideas.length > 0 ? 'block' : 'none'}}>_____________________</p>
        <p style={{display: props.ideas.length > 0 ? 'block' : 'none', padding: 0, margin: 0}}>Ideas:</p>
        {
          props.ideas.map((idea) =>
            // (Note: wrap in a div inside Draggable.)
            <Draggable key={idea.timestamp}
                       onStop={() => {allowListToFillSpace(idea.timestamp);saveTransform(idea);}}
                       handle=".react-markdown>*:not(.vertical-row)">
              <div id={"idea-" + idea.timestamp}>
                <Idea displayOptionTimestamp={displayOptionTimestamp}
                      idea={idea}
                      showOptions={showOptions}
                      hideOptions={hideOptions}
                      deleteIdea={deleteIdea}
                      emailIdea={emailIdea}
                      saveIdea={saveIdea}
                      pasteIdea={pasteIdea}/>
              </div>
            </Draggable>
          )
        }
      </div>
    );

  }

}

export default IdeasWrapper;
