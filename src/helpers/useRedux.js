import { createStore } from "redux";

const reducer = (state = { input: "", preview: "" }, action) => {
  switch (action.type) {
    case "UPDATE_INPUT":
      return Object.assign({}, state, { input: action.input });
    case "UPDATE_PREVIEW":
      return Object.assign({}, state, { preview: action.preview });
    default:
      return state;
  }
};

const store = createStore(reducer);

export default store;
