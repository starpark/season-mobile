import test from "./TestReducer";
import Auth from "./AuthReducer";
import Api from "./APIReducer";

import { combineReducers } from "redux";

const rootReducer = combineReducers({ test, Auth, Api });

export default rootReducer;
