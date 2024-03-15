import {IQuestion} from "./store/quiz";

export interface IQuestionForm {
  question: IQuestion;
  isLast: boolean;
  applyAnswer: (question: IQuestion, answerId: string) => void;
  answer: string;
}