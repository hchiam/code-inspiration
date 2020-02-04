import React from 'react';
import './App.css';
import Ideas from './components/Ideas';
import ControlPanel from './components/ControlPanel';

function App() {
  const initialIdeas = JSON.parse(localStorage.getItem('ideas')) || [];
  const [ideas, setIdeas] = React.useState(initialIdeas); // also updateIdeasLocalStorage
  return (
    <div className="App">
      <header className="App-header">
        <h1>Capture <code>code</code> ideas:</h1>
        <ControlPanel ideas={ideas}
                      setIdeas={setIdeas}/>
        <Ideas ideas={ideas}
               setIdeas={setIdeas}/>
      </header>
    </div>
  );
}

export default App;
