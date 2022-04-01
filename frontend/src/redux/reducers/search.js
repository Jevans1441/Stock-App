import { SET_SEARCH_VALUE } from "../actionTypes";

const initialState = "";

function searchReducer(state = initialState, action) {
  if (action.type === SET_SEARCH_VALUE) {
    return action.payload;
  }
  return state;
}

export default searchReducer;
