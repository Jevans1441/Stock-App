import { CurrentUser } from "../actions";

const CURRENT_USER = {
  token: "",
  username: "",
};

function authUserReducer(state = CURRENT_USER, action) {
  return state;
}

export default authUserReducer;
