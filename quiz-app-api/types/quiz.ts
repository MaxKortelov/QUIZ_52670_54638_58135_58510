import "reflect-metadata";
import {ArrayMinSize, IsArray, IsEmail, IsString, MinLength, ValidateNested} from "class-validator";
import {IsValidArrayOfObjects} from "../utils/decorators.util";

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

export class QuizType {
  @IsString()
  uuid: string;

  @IsString()
  description: string;
}

export class StartQuizSession {
  @IsString()
  email: string;

  @IsString()
  @IsEmail()
  quizTypeId: string;
}
