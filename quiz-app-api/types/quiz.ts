export interface IQuestion {
  id: string;
  question: string;
  options: IQuestionOptions[];
}

export interface IQuestionAnswer extends IQuestion{
  answerId: string;
}

interface IQuestionOptions {
  id: string;
  text: string;
}

export function mapToQuestionList(dto: IQuestionAnswer[]): IQuestion[] {
  return dto.map(it => ({
    id: it.id,
    question: it.question,
    options: it.options
  }))
}

export type QUIZ = 'GENERAL_KNOWLEDGE_FACTFULNESS'

export const quizTypes: Record<QUIZ, string> = {
  GENERAL_KNOWLEDGE_FACTFULNESS: '/templates/u_IjFiS6ID-M/data'
}
