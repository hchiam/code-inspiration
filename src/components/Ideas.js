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
          <Draggable key={index}>
            <div>
              <pre className="react-markdown"
                    onMouseOver={(e) => props.showOptions(e, index)}
                    onMouseLeave={props.hideOptions}
                    title="Psst! You can drag me around the screen.">
                <div className="vertical-row">
                  <button onClick={() => props.deleteIdea(index)}className="idea-button"
                          style={{
                            width: matchesIndex(index) ? '2.5rem' : 0,
                            height: matchesIndex(index) ? '2.5rem' : 0,
                          }}
                          aria-label="Delete this idea"
                          >X</button>
                  <button onClick={() => props.saveIdea(idea)}className="idea-button"
                      style={{
                        width: matchesIndex(index) ? '2.5rem' : 0,
                        height: matchesIndex(index) ? '2.5rem' : 0,
                      }}
                      aria-label="Email this idea"
                      >Email</button>
                </div>
                <code className="language-js">{idea}</code>
              </pre>
            </div>
          </Draggable>
        )
      }
    </div>
  );
}

export default Ideas;
