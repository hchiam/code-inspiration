import React from 'react';
import './App.css';
import IdeasWrapper from './components/IdeasWrapper';
import ControlPanel from './components/ControlPanel';

// import ReactDOMServer from 'react-dom/server';

function App() {
  const initialIdeas = JSON.parse(localStorage.getItem('ideas')) || [];
  const [ideas, setIdeas] = React.useState(initialIdeas); // also updateIdeasLocalStorage
  return (
    <div className="App">
      <header className="App-header">
        <h1>Capture <code>code</code> ideas:</h1>
        <ControlPanel ideas={ideas}
                      setIdeas={setIdeas}/>
        <IdeasWrapper ideas={ideas}
                      setIdeas={setIdeas}/>
      </header>
    </div>
  );
}

// ReactDOMServer.renderToString(<App/>);

export default App;
