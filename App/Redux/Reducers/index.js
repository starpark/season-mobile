import test from "./TestReducer";
import Auth from "./AuthReducer";
import API from "./APIReducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({ test, Auth, API });

export default rootReducer;
