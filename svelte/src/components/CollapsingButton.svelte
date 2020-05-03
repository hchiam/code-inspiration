<script>
  export let displayOptionTimestamp;
  export let idea;
  export let label;
  export let buttonText;
  export let action;

  // import PropTypes from "prop-types";

  // CollapsingButton.propTypes = {
  //   displayOptionTimestamp: PropTypes.number.isRequired,
  //   idea: PropTypes.object.isRequired,
  //   label: PropTypes.string.isRequired,
  //   buttonText: PropTypes.string.isRequired
  // };

  const matchesTimestamp = timestamp => {
    return displayOptionTimestamp === timestamp;
  };
</script>

<button
  on:click={() => action(idea)}
  className="idea-button"
  style={{ width: matchesTimestamp(idea.timestamp) ? '2.5rem' : 0, height: matchesTimestamp(idea.timestamp) ? '2.5rem' : 0, color: matchesTimestamp(idea.timestamp) ? 'whitesmoke' : 'transparent' }}
  aria-label={label}
  title={label}>
  {buttonText}
</button>
