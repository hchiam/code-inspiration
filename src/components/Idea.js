import React from 'react';
import '../App.css';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import CollapsingButton from './CollapsingButton';

import PropTypes from 'prop-types';

Idea.propTypes = {
  displayOptionTimestamp: PropTypes.number.isRequired,
  idea: PropTypes.object.isRequired,
  showOptions: PropTypes.func.isRequired,
  hideOptions: PropTypes.func.isRequired,
  deleteIdea: PropTypes.func.isRequired,
  emailIdea: PropTypes.func.isRequired,
  saveIdea: PropTypes.func.isRequired,
  pasteIdea: PropTypes.func.isRequired,
};

function Idea(props) {
  return (
    <div>
      <pre className="react-markdown"
            onMouseOver={() => props.showOptions(props.idea.timestamp)}
            onMouseLeave={props.hideOptions}
            title="Psst! You can drag me around the screen.">
        <div className="vertical-row">
          <CollapsingButton idea={props.idea}
                            buttonText='X'
                            action={props.deleteIdea}
                            label='Delete this idea'
                            displayOptionTimestamp={props.displayOptionTimestamp}/>
          <CollapsingButton idea={props.idea}
                            buttonText='Email'
                            action={props.emailIdea}
                            label='Email this idea'
                            displayOptionTimestamp={props.displayOptionTimestamp}/>
          <CollapsingButton idea={props.idea}
                            buttonText='Save'
                            action={props.saveIdea}
                            label='Save this idea as a JavaScript file'
                            displayOptionTimestamp={props.displayOptionTimestamp}/>
          <CollapsingButton idea={props.idea}
                            buttonText='Reuse'
                            action={props.pasteIdea}
                            label='Reuse this idea in the input area'
                            displayOptionTimestamp={props.displayOptionTimestamp}/>
        </div>
        <SyntaxHighlighter language="javascript" style={docco}>
          {props.idea.code}
        </SyntaxHighlighter>
      </pre>
    </div>
  );
}

export default Idea;
