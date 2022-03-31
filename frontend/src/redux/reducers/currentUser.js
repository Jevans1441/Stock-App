import { CurrentUser } from "./actions";

const CURRENT_USER = {
  token: "",
  user: [],
};

function authUserReducer(state = CURRENT_USER, action) {
  console.log(action.CURRENT_USER);
  return state;
}

export default authUserReducer;
