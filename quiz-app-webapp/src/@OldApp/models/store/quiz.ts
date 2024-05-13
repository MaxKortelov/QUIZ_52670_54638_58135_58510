import {NO_VALUE} from "./auth";

export interface IQuestion {
  id: string;
  question: string;
  options: IQuestionOptions[];
}

interface IQuestionOptions {
  id: string;
  text: string;
}

export interface IQuizState {
  questions: IQuestion[];
  answers: Record<string, string>;
  errorMessage: string;
}

export function initialQuizData(): IQuizState {
  return {
    questions: [],
    answers: {},
    errorMessage: NO_VALUE
  }
}

export enum quizTypes {
  GENERAL_KNOWLEDGE_FACTFULNESS = 'GENERAL_KNOWLEDGE_FACTFULNESS'
}

export interface IQuestion {
  id: string;
  question: string;
  options: IQuestionOptions[];
}

export interface IQuestionAnswer extends IQuestion {
  answerId: string;
}

//actions

export enum QuizActionTypes {
  LOAD_QUESTIONS = "LOAD_QUESTIONS",
  LOAD_RESULT = "LOAD_RESULT",
  QUIZ_ERROR = "QUIZ_ERROR",
  RESET_QUIZ_STATE = "RESET_QUIZ_STATE",
}

export interface IQuiz {
  type: QuizActionTypes.LOAD_QUESTIONS;
  payload: IQuestion[];
}

export interface IAnswers {
  type: QuizActionTypes.LOAD_RESULT;
  payload: Record<string, string>;
}

export interface IQuizError {
  type: QuizActionTypes.QUIZ_ERROR;
  payload: string;
}

export interface IQuizResetState {
  type: QuizActionTypes.RESET_QUIZ_STATE;
}

export type QuizActions = IQuiz | IAnswers | IQuizError | IQuizResetState