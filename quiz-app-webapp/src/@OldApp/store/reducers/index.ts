import {combineReducers} from "redux";
import {authReducer} from "./auth";
import {quizReducer} from "./quiz";

export const rootReducer = combineReducers({
  auth: authReducer,
  quiz: quizReducer,
});

export type RootState = ReturnType<typeof rootReducer>;