import React from 'react';
import '../App.css';
import Draggable from 'react-draggable';

function Ideas(props) {
  const matchesIndex = (index) => {
    return props.displayOptionIndex === index;
  };
  return (
    <div id="ideas">
      {
        props.ideas.map((idea, index) =>
          // (Note: include just one element within Draggable. Use div to show on new line.)
          <Draggable>
            <div>
              <pre className="react-markdown"
                    key={index}
                    onMouseEnter={(e) => props.showOptions(e, index)}
                    onMouseLeave={props.hideOptions}
                    title="Psst! You can drag me around the screen.">
                <button onClick={() => props.deleteIdea(index)}className="idea-button"
                        style={{width: matchesIndex(index) ? '3em' : 0}}
                        >X</button>
                <code class="language-js"
                      >{idea}</code>
              </pre>
            </div>
          </Draggable>
        )
      }
    </div>
  );
}

export default Ideas;
