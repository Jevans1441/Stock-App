import { SET_INITIAL_STATE } from "../actionTypes";
import { CURRENT_USER } from "../actionTypes";

export const setInitialState = () => {
  return {
    type: SET_INITIAL_STATE,
  };
};

export const CurrentUser = () => {
  return {
    type: CURRENT_USER,
  };
};
