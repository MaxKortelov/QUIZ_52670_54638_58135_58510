import {IsString, MinLength} from "class-validator";

export interface ChatQA {
  question: string;
  answer: string;
}

export interface ChatQuestion {
  uuid: string;
  question: string;
}

export class Prompt {
  @IsString()
  @MinLength(3)
  prompt: string;
}