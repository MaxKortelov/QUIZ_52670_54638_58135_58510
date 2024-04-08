import "reflect-metadata";
import {ArrayMinSize, IsArray, IsString, MinLength, ValidateNested} from "class-validator";
import {IsValidArrayOfObjects} from "../utils/decorators";

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

export class NewAnswer {
  @IsString()
  id: string;

  @IsString()
  text: string;
}

export class NewQuestion {
  @IsString()
  @MinLength(8)
  question: string;

  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(2)
  @IsValidArrayOfObjects(NewAnswer)
  answers: Array<NewAnswer>;

  @IsString()
  answerId: string;
}

export class Question extends NewQuestion{
  @IsString()
  @MinLength(2)
  quizType: string;
}

export class NewQuiz {
  @IsString()
  @MinLength(2)
  quizType: string;

  @IsArray()
  @ValidateNested({each: true})
  @ArrayMinSize(1)
  @IsValidArrayOfObjects(NewQuestion)
  questions: Array<NewQuestion>;
}

export class Answer {
  @IsString()
  uuid: string;

  @IsString()
  answer_text: string;

  @IsString()
  question_id: string;
}
