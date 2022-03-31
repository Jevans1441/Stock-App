import { combineReducers } from "redux";
import search from "./search";
import currentUser from "./currentUser";

export default combineReducers({ search, currentUser });
