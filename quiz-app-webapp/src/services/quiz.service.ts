import { api } from 'utils/api';
import {
  CreateQuizModel,
  createQuizModelToRequest,
  quizListResponseToModel,
  quizQuestionResponseToModel,
  quizResponseToModel,
  quizResultResponseToModel
} from "utils/dto/quiz";
import { QuizActionType, QuizGenerateActionType, QuizQuestionActionType } from "utils/api/quiz";

export const getQuizList = async () => {
  const quizList = await api.quiz.getQuizList();
  return quizListResponseToModel(quizList);
};

export const quizGenerate = async (values: QuizGenerateActionType) => {
  const quiz = await api.quiz.quizGenerate(values);
  return quizResponseToModel(quiz);
};

export const quizStart = async (values: QuizActionType) => {
  const quizQuestion = await api.quiz.quizStart(values);
  return quizQuestionResponseToModel(quizQuestion);
};

export const quizSubmit = async (values: QuizActionType) => {
  const quiz = await api.quiz.quizSubmit(values);
  return quizResultResponseToModel(quiz);
};

export const getQuizQuestion = async (values: QuizQuestionActionType) => {
  const quizQuestion = await api.quiz.getQuizQuestion(values);
  return quizQuestionResponseToModel(quizQuestion);
};

export const quizQuestionSave = async (values: QuizQuestionActionType) => {
  const quizQuestion = await api.quiz.quizQuestionSave(values);
  return quizQuestionResponseToModel(quizQuestion);
};

export const createQuiz = async (values: CreateQuizModel) => {
  const data = createQuizModelToRequest(values)
  return api.quiz.createQuiz(data);
};

export const quizService = {
  getQuizList,
  quizGenerate,
  quizStart,
  quizSubmit,
  getQuizQuestion,
  quizQuestionSave,
  createQuiz,
};
