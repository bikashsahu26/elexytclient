import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import { thunk } from "redux-thunk";
import { courseReducer } from "./Course/Redux";

const rootReducer = combineReducers({
  course: courseReducer,
});
export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));
