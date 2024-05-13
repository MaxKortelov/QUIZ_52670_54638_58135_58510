import {initialQuizData, IQuizState, QuizActions, QuizActionTypes} from "../../models/store/quiz";
import {NO_VALUE} from "../../models/store/auth";

export const initialQuizState: IQuizState = initialQuizData();

export const quizReducer = (state = initialQuizState, action: QuizActions): IQuizState => {
  switch (action.type) {
    case QuizActionTypes.LOAD_QUESTIONS:
      return {...state, questions: action.payload, errorMessage: NO_VALUE};
    case QuizActionTypes.LOAD_RESULT:
      return {...state, answers: action.payload, errorMessage: NO_VALUE};
    case QuizActionTypes.QUIZ_ERROR:
      return {...state, errorMessage: action.payload};
    case QuizActionTypes.RESET_QUIZ_STATE:
      return initialQuizData();
    default:
      return state;
  }
};
