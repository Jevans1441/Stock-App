import { GET_HOME } from "../actionTypes";

const initialState = [];

function homeReducer(state = initialState, action) {
  if (action.type === GET_HOME) {
    return action.home;
  }
  return state;
}

export default homeReducer;
