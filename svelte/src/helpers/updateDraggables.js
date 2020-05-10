import makeElementDraggable from "../helpers/makeElementDraggable.js";
import { onMount, afterUpdate, tick } from "svelte";

const flagThatIdeasChanged = (trueOrFalse) => {
  sessionStorage.setItem("ideasChanged", !!trueOrFalse);
};

const ideasChanged = (setTrueOrFalse) => {
  if (typeof setTrueOrFalse !== "undefined") {
    flagThatIdeasChanged(setTrueOrFalse);
  } else {
    return JSON.parse(sessionStorage.getItem("ideasChanged")) === true;
  }
};

const updateDraggables = () => {
  const renderedIdeas = document.getElementsByClassName("idea");
  if (!ideasChanged()) return;
  Array.from(renderedIdeas).map((idea) => {
    idea.style.all = "initial";
    idea.style.fontSize = "calc(10px + 2vmin)";
    makeElementDraggable(idea);
  });
  flagThatIdeasChanged(false);
};

const updateDraggablesWhenFirstRender = () => {
  onMount(async () => {
    flagThatIdeasChanged(true); // to get past the check for the first render only
    await tick();
    updateDraggables();
  });
};

const updateDraggablesWhenRenderUpdates = () => {
  afterUpdate(() => {
    updateDraggables();
  });
};

export {
  flagThatIdeasChanged,
  ideasChanged,
  updateDraggables,
  updateDraggablesWhenFirstRender,
  updateDraggablesWhenRenderUpdates,
};
