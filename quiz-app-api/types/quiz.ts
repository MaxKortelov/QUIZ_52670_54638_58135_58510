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
  @MinLength(2)
  question: string;

  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(2)
  @IsValidArrayOfObjects(NewAnswer)
  answers: Array<NewAnswer>;

  @IsString()
  answerId: string;
}

export class QuizQuestion{
  @IsString()
  questionId: string;

  @IsString()
  @MinLength(8)
  question: string;

  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(2)
  @IsValidArrayOfObjects(NewAnswer)
  answers: Array<NewAnswer>;

  @IsString()
  @MinLength(2)
  quizType: string;
}

export class QuestionDB {
  uuid: string;
  question_text: string;
  correct_answers: string[];
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

export class GenerateQuizSession {
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  quizTypeId: string;
}

export class StartQuizSession {
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  quizSessionId: string;
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
  date_created: string;
  date_started: string;
  date_ended: string;
  attempts: number;
  attempts_used: number;
  result: number | null;
}

export class QuizSessionInfo {
  quizSessionId: string;
  questionAmount: number;
  quizDuration: number;
  quizAttempts: number;
  quizAttemptsUsed: number;
  dateCreated: Date;
}

export function mapQuizSessionDBToQuizSessionInfo(data: QuizSessionDB): QuizSessionInfo {
  return {
    quizSessionId: data.uuid,
    questionAmount: data.question_sequence.length,
    quizDuration: data.duration,
    quizAttempts: data.attempts,
    quizAttemptsUsed: data.attempts_used,
    dateCreated: new Date(data.date_created)
  }
}

export class QuizData {
  question: QuizQuestion;
  dateStarted: Date;
  dateEnded: Date;
  currentQuestionCount: number;
  questionsAmount: number;
}

export function questionWithAnswersDBToQuizQuestion(data: QuestionWithAnswersDB, quizType: string): QuizQuestion {
  return {
    questionId: data.uuid,
    question: data.question_text,
    answers: data.answers.map(answerDBToNewAnswer),
    quizType
  }
}

export function answerDBToNewAnswer(data: AnswerDB): NewAnswer {
  return {
    id: data.uuid,
    text: data.answer_text
  }
}

export class SaveQuizQuestion {
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  quizSessionId: string;

  @IsString()
  questionId: string;

  @IsString()
  answerId: string;
}

export class SubmitQuiz {
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  quizSessionId: string;
}

export class QuizTableResultsDb {
  uuid: string;
  quiz_amount_taken: number;
  correct_answers: number;
  best_quiz_session_id: string;
  user_id: string;
}

export class FullQuizTableResultsDb extends QuizTableResultsDb {
  best_quiz_session: QuizSessionDB | null;
}