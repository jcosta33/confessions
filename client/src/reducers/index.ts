import {combineReducers} from "redux";

import userReducer from "./userRedoucer";

export default combineReducers({
  user: userReducer
})