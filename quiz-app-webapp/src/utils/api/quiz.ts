import { axiosInstance } from './axiosInstance';
import {QuizListResponse, QuizResponse, QuizQuestionResponse, QuizResultResponse, CreateQuizRequest} from '../dto/quiz';

export const getQuizList = () => {
  return axiosInstance.get<QuizListResponse>('/quiz/list').then((res) => res?.data);
};

export type QuizGenerateActionType = {
  email: string,
  quizTypeId: string,
}

export const quizGenerate = (values: QuizGenerateActionType) => {
  return axiosInstance.post<QuizResponse>('/quiz/generate', values)
      .then((res) => res?.data);
};

export type QuizActionType = {
  email: string,
  quizSessionId: string,
}

export const quizStart = (values: QuizActionType) => {
  return axiosInstance.post<QuizQuestionResponse>('/quiz/start', values)
      .then((res) => res?.data);
};

export const quizSubmit = (values: QuizActionType) => {
  return axiosInstance.post<QuizResultResponse>('/quiz/submit', values)
      .then((res) => res?.data);
};

export type QuizQuestionActionType = {
  email: string,
  quizSessionId: string,
  questionId: string,
  answerId: string,
}

export const getQuizQuestion = (values: QuizQuestionActionType) => {
  return axiosInstance.post<QuizQuestionResponse>('/quiz/question/next', values)
      .then((res) => res?.data);
};

export const quizQuestionSave = (values: QuizQuestionActionType) => {
  return axiosInstance.post<QuizQuestionResponse>('/quiz/question/save', values)
      .then((res) => res?.data);
};

export const createQuiz = (values: CreateQuizRequest) => {
  return axiosInstance.post('/quiz/add', values)
      .then((res) => res?.data);
};
