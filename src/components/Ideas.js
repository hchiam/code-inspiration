import React from 'react';
import '../App.css';
import Draggable from 'react-draggable';
import CollapsingButton from './CollapsingButton';

function Ideas(props) {
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
                  <CollapsingButton idea={idea}
                                    buttonText='X'
                                    action={props.deleteIdea}
                                    label='Delete this idea'
                                    displayOptionTimestamp={props.displayOptionTimestamp}/>
                  <CollapsingButton idea={idea}
                                    buttonText='Email'
                                    action={props.emailIdea}
                                    label='Email this idea'
                                    displayOptionTimestamp={props.displayOptionTimestamp}/>
                  <CollapsingButton idea={idea}
                                    buttonText='Save'
                                    action={props.saveIdea}
                                    label='Save this idea as a JavaScript file'
                                    displayOptionTimestamp={props.displayOptionTimestamp}/>
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
