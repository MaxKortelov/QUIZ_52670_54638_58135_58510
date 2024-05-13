import {Dispatch} from "redux";
import {checkAnswers, getQiuz} from "../../api";
import {IQuestion, QuizActions, QuizActionTypes, quizTypes} from "../../models/store/quiz";


// effects
export const getQuestions = (quizType: quizTypes) => async (dispatch: Dispatch<QuizActions>) => {
  return await getQiuz(quizType).then((quiz) => {
    dispatch(setQuizState(quiz))
  }).catch((err) => {
    dispatch(setQuizError(err.data.message))
  })
}

export const checkQuiz = (answers: Record<string, string>, quizType: quizTypes) => async (dispatch: Dispatch<QuizActions>) => {
  checkAnswers(answers, quizType).then(answers => {
    dispatch(setQuizAnswers(answers))
  }).catch((err) => {
    dispatch(setQuizError(err.data.message))
  })
}

// actions
export const setQuizState = (quiz: IQuestion[]): QuizActions => {
  return {
    type: QuizActionTypes.LOAD_QUESTIONS,
    payload: quiz
  }
}

export const setQuizError = (errorMessage: string): QuizActions => {
  return {
    type: QuizActionTypes.QUIZ_ERROR,
    payload: errorMessage
  }
}

export const setQuizAnswers = (answers: Record<string, string>): QuizActions => {
  return {
    type: QuizActionTypes.LOAD_RESULT,
    payload: answers
  }
}

export const resetQuizState = (): QuizActions => {
  return {
    type: QuizActionTypes.RESET_QUIZ_STATE,
  }
}