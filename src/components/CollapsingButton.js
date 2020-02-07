import React from 'react';
import '../App.css';

import PropTypes from 'prop-types';

CollapsingButton.propTypes = {
  displayOptionTimestamp: PropTypes.number.isRequired,
  idea: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
  buttonText: PropTypes.string.isRequired,
};

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
