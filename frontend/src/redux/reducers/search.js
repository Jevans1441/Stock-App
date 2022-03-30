import { SET_INITIAL_STATE } from "../actionTypes";

const initialState = { search: "search" };

function searchReducer(state = initialState, action) {
  if (action.type === "SET_IMAGE") {
    return [...state, action.imageURL];
  } else if (action.type === SET_INITIAL_STATE) {
    console.log("set state");
    return initialState;
  }
  console.log("asodifjasodifjoasji");
  return state;
}

export default searchReducer;
