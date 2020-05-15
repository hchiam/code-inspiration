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

const updateDraggables = (dragStopCallback) => {
  const renderedIdeas = document.getElementsByClassName("idea");
  if (!ideasChanged()) return;
  Array.from(renderedIdeas).map((idea, i) => {
    const left = idea.style.left;
    const top = idea.style.top;
    idea.style.all = "initial"; // this will reset left and top too
    idea.style.left = left;
    idea.style.top = top;
    idea.style.fontSize = "calc(10px + 2vmin)";
    makeElementDraggable(idea, dragStopCallback);
  });
  flagThatIdeasChanged(false);
};

const updateDraggablesWhenFirstRender = (dragStopCallback) => {
  onMount(async () => {
    flagThatIdeasChanged(true); // to get past the check for the first render only
    await tick();
    updateDraggables(dragStopCallback);
  });
};

const updateDraggablesWhenRenderUpdates = (dragStopCallback) => {
  afterUpdate(() => {
    updateDraggables(dragStopCallback);
  });
};

export {
  flagThatIdeasChanged,
  ideasChanged,
  updateDraggables,
  updateDraggablesWhenFirstRender,
  updateDraggablesWhenRenderUpdates,
};
