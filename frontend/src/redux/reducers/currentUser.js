import { CURRENT_USER } from "../actionTypes";

const CurrentUser = {
  token: "",
  username: "",
};

function authUserReducer(state = CurrentUser, action) {
    if (action.type === CURRENT_USER) {
    return action.payload;
  }
  return state;
}

export default authUserReducer;
