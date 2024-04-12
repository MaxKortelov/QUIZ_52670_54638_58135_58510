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

export class QuestionDB {
  uuid: string;
  question_text: string;
  correct_answers: string;
  question_type_id: string;
}

export class AnswerDB {
  uuid: string;
  answer_text: string;
  question_id: string;
}

export class QuestionWithAnswersDB extends QuestionDB {
  answers: Array<AnswerDB>;
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
  @IsEmail()
  email: string;

  @IsString()
  quizTypeId: string;
}

export class QuizSession {
  @IsString()
  userId: string;

  @IsString()
  quizTypeId: string;

  @IsArray()
  questionSequence: Array<string>;
}

export class QuizSessionDB {
  uuid: string;
  question_sequence: Array<string>;
  question_answer: Record<string, string>;
  question_type_id: string;
  user_id: string;
  duration: number;
  date_started: string;
  date_ended: string;
}