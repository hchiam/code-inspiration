import React, { Suspense } from "react";
import "../App.css";
import ShortcutButtonsGroup from "./ShortcutButtonsGroup";
import expandTextarea from "../helpers/expandTextarea.js";
import store from "../helpers/useRedux";
import PropTypes from "prop-types";

// wrap lazily loaded components with <Suspense>:
const Preview = React.lazy(() => import("./Preview"));

ControlPanel.propTypes = {
  ideas: PropTypes.array.isRequired,
  setIdeas: PropTypes.func.isRequired,
};

ControlPanel.defaultProps = {
  ideas: [],
};

function ControlPanel(props) {
  const initialInput = "";
  const initialSuggestion = { suggestion: "", start: -1, stop: -1 };
  const [input, setInput] = React.useState(initialInput); // also updatePreview and suggestCombinedCamelCase
  const [preview, setPreview] = React.useState("");
  const [suggestion, setSuggestion] = React.useState(initialSuggestion);
  const updateIdeasLocalStorage = (newIdeas) => {
    localStorage.setItem("ideas", JSON.stringify(newIdeas));
  };
  const addIdea = () => {
    const textarea = document.querySelector("textarea");
    textarea.classList.remove("expand");
    // exit early if no input
    if (textarea.value === "") {
      textarea.focus();
      return;
    }
    setInput("");
    setPreview("");
    const newIdeas = props.ideas.concat({
      code: preview,
      timestamp: new Date().getTime(),
      transform: "",
    });
    props.setIdeas(newIdeas);
    updateIdeasLocalStorage(newIdeas);
    textarea.focus();
  };
  const checkCommandEnter = (event) => {
    if ((event.ctrlKey || event.metaKey) && event.keyCode === 13) {
      addIdea();
    }
  };
  const isSpecialWord = (word) => {
    const keyWords = [
      "const",
      "let",
      "var",
      "function",
      "if",
      "for",
      "import",
      "from",
      "export",
      "default",
    ];
    if (keyWords.includes(word)) return true;
    const punctuationExceptAFewThings = /[^\w\s,()]/g;
    if (punctuationExceptAFewThings.test(word)) return true;
    return false;
  };
  const suggestCombinedCamelCase = (overrideInput) => {
    const commentRegex = /^\s*\/\//i;
    let lines = (overrideInput || input).split("\n");
    // start from the bottom line of code:
    for (let i = lines.length - 1; i >= 0; i--) {
      let line = lines[i];
      if (line.match(commentRegex)) continue;
      let words = line.split(" ");
      const atStartOfCode = i === 0;
      // scan word pairs right-to-left:
      for (let w = words.length - 1; w > 0; w--) {
        const right = words[w];
        const left = words[w - 1];
        const alreadySeparateWords = left && /\W$/.test(left);
        if (
          left &&
          right &&
          !alreadySeparateWords &&
          !isSpecialWord(left) &&
          !isSpecialWord(right)
        ) {
          const newSuggestion = left + right[0].toUpperCase() + right.slice(1);
          const atStartOfLine = w === 1;
          const lengthOfPrecedingLines = atStartOfCode
            ? 0
            : lines.slice(0, i).join("\n").length + 1; // + 1 for preceding \n not covered by join
          const lengthOfPrecedingWords = atStartOfLine
            ? 0
            : words.slice(0, w - 1).join(" ").length + 1; // + 1 for preceding space not covered by join
          const startSelection =
            lengthOfPrecedingLines + lengthOfPrecedingWords;
          const stopSelection = startSelection + left.length + 1 + right.length; // + 1 for space between
          setSuggestion({
            suggestion: newSuggestion,
            start: startSelection,
            stop: stopSelection,
          });
          const ariaLabel = `use suggestion: "${newSuggestion}", with no spaces between`;
          document
            .getElementById("suggestion-button")
            .setAttribute("aria-label", ariaLabel);
          return;
        }
      }
    }
  };
  const updatePreview = (overrideInput) => {
    // (overrideInput is optional)
    setPreview(overrideInput || input);
  };
  const replaceRange = (original, start, stop, substitute) => {
    return original.substring(0, start) + substitute + original.substring(stop);
  };
  const getLengthBeforePunctuation = (str) => {
    // ignore first character (in case it's punctuation)
    for (let i = str.length - 1; i > 0; i--) {
      if (/\W/.test(str[i])) return i;
    }
    return str.length;
  };
  const useSuggestion = () => {
    let newInput = replaceRange(
      input,
      suggestion.start,
      suggestion.stop,
      suggestion.suggestion
    );
    setInput(newInput);
    setPreview(newInput);
    const textarea = document.getElementById("input");
    textarea.value = newInput;
    textarea.focus();
    const newCursorPos =
      suggestion.start + getLengthBeforePunctuation(suggestion.suggestion);
    textarea.setSelectionRange(suggestion.start, newCursorPos);
    // reset
    setSuggestion(initialSuggestion);
  };
  const addSpecialCharacters = (characters, putCursorBack) => {
    const cursorPosition = document.querySelector("textarea").selectionStart;
    let newInput = input.split("");
    newInput.splice(cursorPosition, 0, characters);
    newInput = newInput.join("");
    setInput(newInput);
    setPreview(newInput);
    const textarea = document.getElementById("input");
    textarea.value = newInput;
    textarea.focus();
    const start = cursorPosition + characters.length;
    const end = start - (putCursorBack || 1);
    textarea.setSelectionRange(start, end);
    expandTextarea();
  };
  const respondToInput = (newInput) => {
    expandTextarea();
    setInput(newInput);
    updatePreview(newInput);
    suggestCombinedCamelCase(newInput);
  };
  // listen for changes to Redux store:
  store.subscribe(() => {
    const newInput = store.getState().input;
    setInput(newInput);
    updatePreview(newInput);
    suggestCombinedCamelCase(newInput);
  });
  return (
    <div id="split-container" className="wrap-elements-if-too-wide">
      <div id="control-panel">
        <textarea
          id="input"
          onChange={(e) => {
            respondToInput(e.target.value);
          }}
          onKeyDown={(e) => checkCommandEnter(e)}
          value={input}
          placeholder="type code here"
          aria-label="type a new code idea here"
          autoCapitalize="off"
          autoFocus
        />
        <ShortcutButtonsGroup
          addSpecialCharacters={addSpecialCharacters}
          useSuggestion={useSuggestion}
          suggestion={suggestion}
        />
        <button
          id="add-idea-button"
          onClick={addIdea}
          style={{ display: input !== "" ? "block" : "none", margin: "auto" }}
        >
          Add idea
        </button>
      </div>
      <Suspense fallback={<div style={{ display: "none" }}></div>}>
        <Preview input={input} preview={preview} />
      </Suspense>
    </div>
  );
}

export default ControlPanel;
