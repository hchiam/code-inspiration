import React from 'react';
import '../App.css';
import Draggable from 'react-draggable';

function Ideas(props) {
  const matchesTimestamp = (timestamp) => {
    return props.displayOptionTimestamp === timestamp;
  };
  return (
    <div id="ideas">
      {
        props.ideas.map((idea) =>
          // (Note: include just one element within Draggable. Use div to show on new line.)
          <Draggable key={idea.timestamp}>
            <div>
              <pre className="react-markdown"
                    onMouseOver={() => props.showOptions(idea.timestamp)}
                    onMouseLeave={props.hideOptions}
                    title="Psst! You can drag me around the screen.">
                <div className="vertical-row">
                  <button onClick={() => props.deleteIdea(idea.timestamp)}className="idea-button"
                          style={{
                            width: matchesTimestamp(idea.timestamp) ? '2.5rem' : 0,
                            height: matchesTimestamp(idea.timestamp) ? '2.5rem' : 0,
                          }}
                          aria-label="Delete this idea"
                          >X</button>
                  <button onClick={() => props.emailIdea(idea.code)}className="idea-button"
                      style={{
                        width: matchesTimestamp(idea.timestamp) ? '2.5rem' : 0,
                        height: matchesTimestamp(idea.timestamp) ? '2.5rem' : 0,
                      }}
                      aria-label="Email this idea"
                      >Email</button>
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
