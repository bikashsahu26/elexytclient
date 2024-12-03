import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import { thunk } from "redux-thunk";
import { courseReducer } from "./Course/Redux";
import { authReducer } from "./Auth/Redux";

const rootReducer = combineReducers({
  course: courseReducer,
  education: authReducer,
});
export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));
