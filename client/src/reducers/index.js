import { combineReducers } from "redux";
import alert from "./alert";
import auth from "./auth";
import leave from "./leave";

export default combineReducers({
    alert,
    auth,
    leave
});