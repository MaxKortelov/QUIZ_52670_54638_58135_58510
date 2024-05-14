import { Dispatch } from 'redux';
import {quizService, quizStart, quizSubmit} from "services/quiz.service";
import {
  quizInfoActions,
  quizInfoIsLoadingActions,
  quizListActions,
  quizListIsLoadingActions,
  quizQuestionActions,
  quizQuestionIsLoading,
  quizQuestionIsLoadingActions,
  quizResult, quizResultActions, quizResultIsLoadingActions
} from './reducer';
import {QuizActionType, QuizGenerateActionType, QuizQuestionActionType} from "utils/api/quiz";

export const getQuizListAction = () => {
  const { setQuizList } = quizListActions;
  const { setIsLoading } = quizListIsLoadingActions;

  return async (dispatch: Dispatch) => {
    try {
      dispatch(setIsLoading(true));
      const quizList = await quizService.getQuizList();
      dispatch(setQuizList(quizList));
    } catch (e) {
      console.log(e);
    } finally {
      dispatch(setIsLoading(false));
    }
  };
};

export const getQuizAction = (values: QuizGenerateActionType) => {
  const { setQuiz } = quizInfoActions;
  const { setIsLoading } = quizInfoIsLoadingActions;

  return async (dispatch: Dispatch) => {
    try {
      dispatch(setIsLoading(true));
      const quiz = await quizService.quizGenerate(values);
      dispatch(setQuiz(quiz));
    } catch (e) {
      throw e;
    } finally {
      dispatch(setIsLoading(false));
    }
  };
};

export const startQuizAction = (values: QuizActionType) => {
  const { setQuizQuestion } = quizQuestionActions;
  const { setIsLoading } = quizQuestionIsLoadingActions;

  return async (dispatch: Dispatch) => {
    try {
      dispatch(setIsLoading(true));
      const quizStart = await quizService.quizStart({
        quizSessionId: values.quizSessionId,
        email: values.email
      })
      dispatch(setQuizQuestion(quizStart));
    } catch (e) {
      console.log(e);
    } finally {
      dispatch(setIsLoading(false));
    }
  };
};

export const clearQuizAction = () => {
  const { setQuiz } = quizInfoActions;

  return (dispatch: Dispatch) => {
    try {
      dispatch(setQuiz({}));
    } catch (e) {
      console.log(e);
    }
  };
};

export const getQuizQuestionAction = (values: QuizQuestionActionType) => {
  const { setQuizQuestion } = quizQuestionActions;
  const { setIsLoading } = quizQuestionIsLoadingActions;

  return async (dispatch: Dispatch) => {
    try {
      dispatch(setIsLoading(true));
      const quizList = await quizService.getQuizQuestion(values);
      dispatch(setQuizQuestion(quizList));
    } catch (e) {
      console.log(e);
    } finally {
      dispatch(setIsLoading(false));
    }
  };
};

export const clearQuizQuestionAction = () => {
  const { setQuizQuestion } = quizQuestionActions;

  return (dispatch: Dispatch) => {
    try {
      dispatch(setQuizQuestion({}));
    } catch (e) {
      console.log(e);
    }
  };
};

export const getQuizResultAction = (values: QuizActionType) => {
  const { setQuizResult } = quizResultActions;
  const { setIsLoading } = quizResultIsLoadingActions;

  return async (dispatch: Dispatch) => {
    try {
      dispatch(setIsLoading(true));
      const result = await quizService.quizSubmit(values);
      dispatch(setQuizResult(result));
    } catch (e) {
      console.log(e);
    } finally {
      dispatch(setIsLoading(false));
    }
  };
};

export const clearQuizQuestionResultAction = () => {
  const { setQuizQuestion } = quizQuestionActions;

  return (dispatch: Dispatch) => {
    try {
      dispatch(setQuizQuestion({}));
    } catch (e) {
      console.log(e);
    }
  };
};
