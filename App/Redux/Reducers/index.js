import test from "./TestReducer";
import Auth from "./AuthReducer";
import Api from "./APIReducer";
import Now from "./NowReducer";

import { combineReducers } from "redux";

const rootReducer = combineReducers({ test, Auth, Api, Now });

export default rootReducer;
