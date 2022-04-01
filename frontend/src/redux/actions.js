import axios from "axios";
import {
  SET_INITIAL_STATE,
  SET_SEARCH_VALUE,
  CURRENT_USER,
} from "./actionTypes";

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

export const doSearch = (value) => {
  return {
    type: SET_SEARCH_VALUE,
    payload: value,
  };
};
