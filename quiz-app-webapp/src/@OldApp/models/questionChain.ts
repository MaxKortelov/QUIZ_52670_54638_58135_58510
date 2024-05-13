import {IQuestion} from "./store/quiz";

export function initialAnswers(questions: IQuestion[]): Record<string, string> {
  return Object.fromEntries(questions.map(it => [it.id, '']))
}
