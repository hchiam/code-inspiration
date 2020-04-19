import React, { Suspense } from "react";
import "./App.css";
import ControlPanel from "./components/ControlPanel";
// import ReactDOMServer from 'react-dom/server';

// wrap lazily loaded components with <Suspense>:
const IdeasWrapper = React.lazy(() => import("./components/IdeasWrapper"));
const TourButton = React.lazy(() => import("./components/TourButton"));

function App() {
  const initialIdeas = JSON.parse(localStorage.getItem("ideas")) || [];
  const [ideas, setIdeas] = React.useState(initialIdeas); // also updateIdeasLocalStorage
  return (
    <div className="App">
      <h1>
        Capture <code>code</code> ideas:
      </h1>
      <ControlPanel ideas={ideas} setIdeas={setIdeas} />
      <Suspense fallback={<div style={{ display: "none" }}></div>}>
        <IdeasWrapper ideas={ideas} setIdeas={setIdeas} />
      </Suspense>
      <Suspense fallback={<div style={{ display: "none" }}></div>}>
        <TourButton />
      </Suspense>
    </div>
  );
}

// ReactDOMServer.renderToString(<App/>);

export default App;
