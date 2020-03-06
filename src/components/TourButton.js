import React from 'react';
import '../App.css';
import {tour, addListeners} from '../helpers/tour';

function TourButton() {
  const [showButton, setShowButton] = React.useState(false);
  setTimeout(() => {
    setShowButton(true);
    document.getElementById('tour-button').focus();
    addListeners();
  }, 3000);
  const runTour = () => {
    tour.start();
    document.body.classList.add('shepherd-active');
  };
  return (
    <button id="tour-button" onClick={runTour} style={{
      'display': (showButton ? 'block' : 'none'),
      'background': 'blue',
    }}>What is this?</button>
  );
}

export default TourButton;
