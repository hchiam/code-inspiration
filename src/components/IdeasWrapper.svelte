<script>
  export let ideas = [];
  export let setIdeas;

  import Idea from "./Idea.svelte";
  import { updateDraggablesWhenFirstRender } from "../helpers/updateDraggables";
  import expandTextarea from "../helpers/expandTextarea";
  import store from "../helpers/useRedux";
  import { onMount } from "svelte";

  // import PropTypes from "prop-types";

  let displayOptionTimestamp = -1;
  let showOptions = timestamp => {
    displayOptionTimestamp = timestamp;
  };
  const hideOptions = () => {
    displayOptionTimestamp = -1;
  };
  const focusTextArea = () => {
    document.querySelector("textarea").focus();
  };
  const urlAcceptableString = code => {
    const preprocessedCode = code
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/\n/g, "<br/>");
    return encodeURIComponent(preprocessedCode) // handles most
      .replace(/!/g, "%21") // handle technically OK but may have meanings depending on context
      .replace(/"/g, "%22")
      .replace(/#/g, "%23")
      .replace(/\$/g, "%24")
      .replace(/%/g, "%25")
      .replace(/&/g, "%26")
      .replace(/'/g, "%27")
      .replace(/\(/g, "%28")
      .replace(/\)/g, "%29")
      .replace(/\*/g, "%2A")
      .replace(/-/g, "%2D")
      .replace(/\./g, "%2E")
      .replace(/</g, "%3C")
      .replace(/>/g, "%3E")
      .replace(/_/g, "%3F")
      .replace(/~/g, "%7E");
  };
  const updateIdeasLocalStorage = newIdeas => {
    localStorage.setItem("ideas", JSON.stringify(newIdeas));
  };
  const deleteIdea = idea => {
    if (!idea.timestamp) {
      alert("Error - could not find timestamp for this idea.");
      return;
    }
    if (!window.confirm("Are you sure you want to delete this idea?")) return;
    const timestampOfIdeaToDelete = idea.timestamp;
    const newIdeas = ideas.filter(e => e.timestamp !== timestampOfIdeaToDelete);
    ideas = newIdeas;
    setIdeas(newIdeas);
    updateIdeasLocalStorage(newIdeas);
    displayOptionTimestamp = -1;
    focusTextArea();
  };
  const emailIdea = idea => {
    if (!idea.code || idea.code === "") {
      alert("Error - could not find code for this idea.");
      return;
    }
    const processedCode = urlAcceptableString(idea.code);
    window.open("mailto:test@example.com?subject=Idea&body=" + processedCode);
  };
  const saveIdea = idea => {
    if (!idea.code || idea.code === "") {
      alert("Error - could not find code for this idea.");
      return;
    } else if (!idea.timestamp) {
      alert("Error - could not find timestamp for this idea.");
      return;
    }
    const code = idea.code;
    try {
      const fileName = `idea-${idea.timestamp}.js`;
      const tempElem = document.createElement("a");
      // use encodeURIComponent instead of urlAcceptableString since saving to file
      tempElem.setAttribute(
        "href",
        "data:text/plain;charset=utf-8," + encodeURIComponent(code)
      );
      tempElem.setAttribute("download", fileName);
      if (document.createEvent) {
        const event = document.createEvent("MouseEvents");
        event.initEvent("click", true, true);
        tempElem.dispatchEvent(event);
      } else {
        tempElem.click();
      }
    } catch (err) {
      window.open("data:text/txt;charset=utf-8," + escape(code), "newdoc");
    }
  };
  const pasteIdea = idea => {
    const textarea = document.getElementById("input");
    const input = textarea.value;
    const originalCursorPosition = document.querySelector("textarea")
      .selectionStart;
    let newInput =
      input.slice(0, originalCursorPosition) +
      idea.code +
      input.slice(originalCursorPosition);
    textarea.value = newInput;
    textarea.focus();
    const newCursorPos = originalCursorPosition + idea.code.length;
    textarea.setSelectionRange(originalCursorPosition, newCursorPos);
    expandTextarea();
    // update Redux store:
    store.dispatch({ type: "UPDATE_INPUT", input: newInput });
  };
  const allowListToFillSpace = timestamp => {
    // allow list to fill space left behind by dragged element:
    const dragged = document.querySelector(`div#idea-${timestamp}`);
    dragged.style.position = "absolute";
  };
  const saveTransform = elementId => {
    const timestamp = elementId.replace("idea-", ""); //idea.timestamp;
    const newIdeas = [...ideas];
    for (let i = 0; i < ideas.length; i++) {
      if (ideas[i].timestamp.toString() === timestamp) {
        const dragged = document.querySelector(`div#idea-${timestamp}`);
        const left = dragged.style.left;
        const top = dragged.style.top;
        newIdeas[i].left = left;
        newIdeas[i].top = top;
      }
    }
    ideas = newIdeas;
    setIdeas(newIdeas);
    updateIdeasLocalStorage(newIdeas);
  };
  const applyTransforms = () => {
    for (let i = 0; i < ideas.length; i++) {
      const idea = ideas[i];
      const ideaElement = document.querySelector(`div#idea-${idea.timestamp}`);
      if (idea.left || idea.top) {
        // set transform from props:
        ideaElement.style.left = idea.left;
        ideaElement.style.top = idea.top;
        ideaElement.style.position = "absolute";
      } else {
        ideaElement.style.position = "static";
      }
    }
  };

  onMount(() => {
    applyTransforms();
  });

  updateDraggablesWhenFirstRender(saveTransform);

  const likelyOnMobile = window.screen.width <= 420;
</script>

<style>
  #ideas-heading {
    padding: 0;
    margin: 0;
  }

  .idea {
    position: absolute;
  }
</style>

{#if likelyOnMobile}
  <!-- mobile version (no Draggable): -->
  <div id="ideas">
    {#if ideas.length > 0}
      <p>_____________________</p>
      <p id="ideas-heading">Ideas:</p>
    {/if}
    {#each ideas as idea}
      <div key={idea.timestamp}>
        <div id={'idea-' + idea.timestamp}>
          <Idea
            {displayOptionTimestamp}
            {idea}
            {showOptions}
            {hideOptions}
            {deleteIdea}
            {emailIdea}
            {saveIdea}
            {pasteIdea} />
        </div>
      </div>
    {/each}
  </div>
{:else}
  <!-- desktop version (has Draggable): -->
  <div id="ideas">
    {#if ideas.length > 0}
      <p>_____________________</p>
      <p id="ideas-heading">Ideas:</p>
    {/if}
    {#each ideas as idea}
      <!-- <Draggable
        onStop={() => {
          allowListToFillSpace(idea.timestamp);
        }}
        handle=".react-markdown>*:not(.vertical-row)"> -->
      <div key={idea.timestamp}>
        <div id={'idea-' + idea.timestamp} class="idea">
          <Idea
            {displayOptionTimestamp}
            {idea}
            {showOptions}
            {hideOptions}
            {deleteIdea}
            {emailIdea}
            {saveIdea}
            {pasteIdea} />
        </div>
      </div>
    {/each}
  </div>
{/if}
