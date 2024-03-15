import * as AuthAction from "./auth";
import * as QuizAction from "./quiz";

// Add new action-creators to the object - mkortelov
const actions = {
  ...AuthAction,
  ...QuizAction,

};

export default actions;