<script>
  import Highlight from "svelte-highlight";
  import { javascript } from "svelte-highlight/languages";

  // import PropTypes from "prop-types";

  // wrap lazily loaded components with <Suspense>:
  // const CollapsingButton = React.lazy(() =>
  //   import("./CollapsingButton.svelte")
  // );
  import CollapsingButton from "./CollapsingButton.svelte";

  // Idea.propTypes = {
  //   displayOptionTimestamp: PropTypes.number.isRequired,
  //   idea: PropTypes.object.isRequired,
  //   showOptions: PropTypes.func.isRequired,
  //   hideOptions: PropTypes.func.isRequired,
  //   deleteIdea: PropTypes.func.isRequired,
  //   emailIdea: PropTypes.func.isRequired,
  //   saveIdea: PropTypes.func.isRequired,
  //   pasteIdea: PropTypes.func.isRequired
  // };

  export let displayOptionTimestamp;
  export let idea;
  export let showOptions;
  export let hideOptions;
  export let deleteIdea;
  export let emailIdea;
  export let saveIdea;
  export let pasteIdea;
</script>

<div>
  <div
    class="react-markdown"
    on:mouseover={() => showOptions(idea.timestamp)}
    on:mouseleave={hideOptions}
    title="Psst! You can drag me around the screen.">
    <Highlight language={javascript} code={idea.code} />
    <!-- <Suspense fallback={<div style={{ display: "none" }}></div>}> -->
    <div class="horizontal-row">
      <CollapsingButton
        {idea}
        buttonText="X"
        action={deleteIdea}
        label="Delete this idea"
        {displayOptionTimestamp} />
      <CollapsingButton
        {idea}
        buttonText="Email"
        action={emailIdea}
        label="Email this idea"
        {displayOptionTimestamp} />
      <CollapsingButton
        {idea}
        buttonText="Save"
        action={saveIdea}
        label="Save this idea as a JavaScript file"
        {displayOptionTimestamp} />
      <CollapsingButton
        {idea}
        buttonText="Reuse"
        action={pasteIdea}
        label="Reuse this idea in the input area"
        {displayOptionTimestamp} />
    </div>
    <!-- </Suspense> -->
  </div>
</div>
