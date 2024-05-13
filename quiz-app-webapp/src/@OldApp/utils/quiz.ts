import {NO_VALUE} from "../models/store/auth";
import {IQuestion} from "../models/store/quiz";

export function findLastQuestion(answers: Record<string, string>): number {
  const index = Object.values(answers).findIndex(it => it === NO_VALUE)
  return index === -1 ? index + 1 : index;
}

export function findLastestQuestionId(questions: IQuestion[]): string {
  return questions[questions.length - 1].id
}

export function compareQuestionsId(q1: string, q2: string): boolean {
  return q1 === q2;
}
