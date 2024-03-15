import {useTypedSelector} from "../../hooks/useTypedSelector";

export function useQuizSelectors() {
  const quiz = useTypedSelector(s => s.quiz);

  const questions = quiz.questions;
  const answers = quiz.answers;
  const quizErrorMessage = quiz.errorMessage;

  return {
    questions,
    answers,
    quizErrorMessage
  }
}