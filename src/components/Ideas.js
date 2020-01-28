import React from 'react';
import '../App.css';
import Draggable from 'react-draggable';

function Ideas(props) {
  // const [ideas, setIdeas] = React.useState(props.ideas);
  const focusTextArea = () => {
    document.querySelector('textarea').focus();
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
                        style={{display: props.displayOptionIndex === index ? 'block' : 'none'}}
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
