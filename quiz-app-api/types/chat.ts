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

export interface ChatQAPatterns {
  uuid: string;
  questionPattern: string;
  answer: string;
}

export interface ChatQADB {
  uuid: string;
  question_pattern: string;
  answer: string;
}

export function mapChatQADBToChatQA(chatQADB: ChatQADB): ChatQAPatterns {
  return {
    uuid: chatQADB.uuid,
    questionPattern: chatQADB.question_pattern,
    answer: chatQADB.answer
  }
}
