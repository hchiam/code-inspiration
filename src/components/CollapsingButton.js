import React from 'react';
import '../App.css';

function CollapsingButton(props) {
  const matchesTimestamp = (timestamp) => {
    return props.displayOptionTimestamp === timestamp;
  };
  return (
    <button onClick={() => props.action(props.idea)}
            className="idea-button"
            style={{
              width: matchesTimestamp(props.idea.timestamp) ? '2.5rem' : 0,
              height: matchesTimestamp(props.idea.timestamp) ? '2.5rem' : 0,
              color: matchesTimestamp(props.idea.timestamp) ? 'whitesmoke' : 'transparent',
            }}
            aria-label={props.label}
            title={props.label}
            >{props.buttonText}</button>
);
}

export default CollapsingButton;
