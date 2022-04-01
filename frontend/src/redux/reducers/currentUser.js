import { CurrentUser } from "../actions";

const CURRENT_USER = {
  token: "",
  user: [],
};

function authUserReducer(state = CURRENT_USER, action) {
  return state;
}

export default authUserReducer;
