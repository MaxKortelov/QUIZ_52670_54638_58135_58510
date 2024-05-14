import { combineReducers, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {QuizListModel, QuizModel, QuizQuestionModel, QuizResultModel} from "utils/dto/quiz";

interface QuizListInitState {
  quizList: QuizListModel;
}

export const { reducer: quizList, actions: quizListActions } = createSlice({
  name: 'quiz/list',
  initialState: {} as QuizListInitState,
  reducers: {
    setQuizList: (state, action) => {
      state.quizList = action.payload;
    },
  },
});

export const { reducer: quizListIsLoading, actions: quizListIsLoadingActions } = createSlice({
  name: 'quiz/list/isLoading',
  initialState: false,
  reducers: {
    setIsLoading: (_, action: PayloadAction<boolean>) => action.payload,
  },
});

interface QuizInitState {
  quizInfo: QuizModel;
}

export const { reducer: quizInfo, actions: quizInfoActions } = createSlice({
  name: 'quiz/info',
  initialState: {} as QuizInitState,
  reducers: {
    setQuiz: (state, action) => {
      state.quizInfo = action.payload;
    },
  },
});

export const { reducer: quizInfoIsLoading, actions: quizInfoIsLoadingActions } = createSlice({
  name: 'quiz/info/isLoading',
  initialState: false,
  reducers: {
    setIsLoading: (_, action: PayloadAction<boolean>) => action.payload,
  },
});

interface QuizQuestionInitState {
  quizQuestion: QuizQuestionModel;
}

export const { reducer: quizQuestion, actions: quizQuestionActions } = createSlice({
  name: 'quiz/question',
  initialState: {} as QuizQuestionInitState,
  reducers: {
    setQuizQuestion: (state, action) => {
      state.quizQuestion = action.payload;
    },
  },
});

export const { reducer: quizQuestionIsLoading, actions: quizQuestionIsLoadingActions } = createSlice({
  name: 'quiz/question/isLoading',
  initialState: false,
  reducers: {
    setIsLoading: (_, action: PayloadAction<boolean>) => action.payload,
  },
});

interface QuizResultInitState {
  quizResult: QuizResultModel;
}

export const { reducer: quizResult, actions: quizResultActions } = createSlice({
  name: 'quiz/result',
  initialState: {} as QuizResultInitState,
  reducers: {
    setQuizResult: (state, action) => {
      state.quizResult = action.payload;
    },
  },
});

export const { reducer: quizResultIsLoading, actions: quizResultIsLoadingActions } = createSlice({
  name: 'quiz/result/isLoading',
  initialState: false,
  reducers: {
    setIsLoading: (_, action: PayloadAction<boolean>) => action.payload,
  },
});

export const quiz = combineReducers({
  quizList,
  quizListIsLoading,
  quizInfo,
  quizInfoIsLoading,
  quizQuestion,
  quizQuestionIsLoading,
  quizResult,
  quizResultIsLoading,
});
