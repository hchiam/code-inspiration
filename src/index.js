import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";

// http -> https
if (
  !String(window.location).startsWith("http://localhost") &&
  window.location.protocol !== "https:"
) {
  window.location.href =
    "https:" + window.location.href.substring(window.location.protocol.length);
}

ReactDOM.render(<App />, document.getElementById("root"));
