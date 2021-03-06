import Shepherd from "shepherd.js";

const tour = new Shepherd.Tour({
  defaultStepOptions: {
    classes: "shepherd-theme-custom", // a separate CSS file
    scrollTo: true,
    useModalOverlay: true,
    keyboardNavigation: false,
  },
});

const triggerContinueTour = () => {
  setTimeout(() => {
    tour.next();
  }, 10);
};

const prepareIdeaButtons = () => {
  triggerContinueTour();
  setTimeout(() => {
    const ideaButtons = document.querySelectorAll(
      ".horizontal-row:first-of-type .idea-button"
    );
    for (let ideaButton of ideaButtons) {
      ideaButton.classList.add("expanded");
    }
  }, 10);
};

const resetIdeaButtons = () => {
  const ideaButtons = document.querySelectorAll(
    ".horizontal-row:first-of-type .idea-button"
  );
  for (let ideaButton of ideaButtons) {
    ideaButton.classList.remove("expanded");
    ideaButton.removeEventListener("click", customEndTour);
  }
};

const addListeners = () => {
  const fnButton = document.querySelector(
    '#shortcut-buttons-group [aria-label="add ES6 function"]'
  );
  if (fnButton) {
    fnButton.addEventListener("click", triggerContinueTour);
  }

  const addIdeaButton = document.querySelector("#add-idea-button");
  if (addIdeaButton) {
    addIdeaButton.addEventListener("click", prepareIdeaButtons);
  }

  document.addEventListener("click", someListener);
};

const removeListeners = () => {
  const fnButton = document.querySelector(
    '#shortcut-buttons-group [aria-label="add ES6 function"]'
  );
  if (fnButton) {
    fnButton.removeEventListener("click", triggerContinueTour);
  }

  const addIdeaButton = document.querySelector("#add-idea-button");
  if (addIdeaButton) {
    addIdeaButton.removeEventListener("click", prepareIdeaButtons);
  }

  document.removeEventListener("click", someListener);

  resetIdeaButtons();
};

function someListener(event) {
  var element = event.target;
  if (element.id === "add-idea-button") {
    prepareIdeaButtons();
  }
}

const customEndTour = () => {
  removeListeners();
  document.body.classList.remove("shepherd-active");
  tour.complete();
  document.getElementById("tour-button").style.display = "none";
};

const stepButtonsBasedOnIndex = (i) => {
  if (stepsArrayOfTextsAndIds.length === 1) {
    return [{ text: "Exit tour", action: customEndTour }];
  } else if (i === stepsArrayOfTextsAndIds.length - 1) {
    return [
      { text: "Exit tour", action: customEndTour },
      // { text: 'Back', action: tour.back },
    ];
  } else if (i === 0) {
    return [
      { text: "Exit tour", action: customEndTour },
      { text: "Next", action: tour.next },
    ];
  } else {
    return [
      { text: "Exit tour", action: customEndTour },
      // { text: 'Back', action: tour.back },
      { text: "Next", action: tour.next },
    ];
  }
};

const createSteps = (stepsArrayOfTextsAndSelectors) => {
  for (let i = 0; i < stepsArrayOfTextsAndSelectors.length; i++) {
    const step = stepsArrayOfTextsAndSelectors[i];
    tour.addStep({
      title: "Step: " + (i + 1),
      text: step.text,
      attachTo: {
        element: step.selector,
        on: step.positionOverride || "bottom",
      },
      buttons: step.buttonsOverride || stepButtonsBasedOnIndex(i),
    });
  }
};

const stepsArrayOfTextsAndIds = [
  {
    text:
      "Type code here. Or a note. <br/><br/>Think of this app like a to-do list. <br/><br/>It also works offline!",
    selector: "#input",
  },
  {
    text: "Here are some convenient buttons for code.",
    selector: "#shortcut-buttons-group",
  },
  {
    text: 'Try clicking on the "fn" button.',
    selector: '#shortcut-buttons-group [aria-label="add ES6 function"]',
    buttonsOverride: [
      { text: "Exit tour", action: customEndTour },
      // { text: 'Back', action: tour.back },
    ],
  },
  {
    text: 'Now click on "Add idea" to add to the list.',
    selector: "#add-idea-button",
    positionOverride: "top",
    buttonsOverride: [
      { text: "Exit tour", action: customEndTour },
      // { text: 'Back', action: tour.back },
    ],
  },
  {
    text:
      'And finally, each idea has powerful buttons. <br/><br/>For example, you can copy and paste existing ideas! <br/><br/>Try this: hover/tap on the code to show the idea buttons. <br/><br/>Then hit the "Reuse" button.',
    selector: "#ideas .idea:first-of-type",
  },
];

createSteps(stepsArrayOfTextsAndIds);

export { tour, addListeners };
