import { TStore } from 'store/index';

export const getQuizList = (store: TStore) => store.quiz.quizList?.quizList;
export const getQuizListIsLoading = (store: TStore) => store.quiz.quizListIsLoading;

export const getQuiz = (store: TStore) => store.quiz.quizInfo?.quizInfo;
export const getQuizIsLoading = (store: TStore) => store.quiz.quizInfoIsLoading;

export const getQuizQuestion = (store: TStore) => store.quiz.quizQuestion?.quizQuestion;
export const getQuizQuestionIsLoading = (store: TStore) => store.quiz.quizQuestionIsLoading;

export const getQuizResult = (store: TStore) => store.quiz.quizResult.quizResult;
export const getQuizResultIsLoading = (store: TStore) => store.quiz.quizResultIsLoading;
