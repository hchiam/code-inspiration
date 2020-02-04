const expandTextarea = () => {
  const textarea = document.querySelector('textarea');
  if (textarea.value) {
    textarea.classList.add('expand');
  } else {
    textarea.classList.remove('expand');
  }
};

export default expandTextarea;
