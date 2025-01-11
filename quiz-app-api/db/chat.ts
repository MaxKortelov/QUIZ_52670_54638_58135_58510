import db from "./index";
import {ChatQA, ChatQADB, ChatQAPatterns, ChatQuestion, mapChatQADBToChatQA} from "../types/chat";

export async function addChatQuestions(questions: Array<string>): Promise<boolean> {
  try {
    for await (const question of questions) {
      await db.query('INSERT INTO chat_questions (question) VALUES ($1)', [question])
    }
    return true;
  } catch (error) {
    console.log("addQuestions error", error);
    return false;
  }
}

export async function getChatQuestions(): Promise<ChatQuestion[]> {
  const questions = await db.query('SELECT * FROM chat_questions', []);

  if (questions.rows.length === 0) throw new Error("Questions not found. Please try again");

  return questions.rows as ChatQuestion[];
}

export async function saveQAPatternsToDB(qa: ChatQA[]): Promise<boolean> {
  for await (const pattern of qa) {
    try {
      await db.query('INSERT INTO chat_qa (question_pattern, answer) VALUES ($1, $2)', [pattern.question, pattern.answer])
    } catch (e) {
      console.log(e)
      console.info(`Pattern ${pattern.question} already exists in DB`);
    }
  }

  return true
}

export async function getAllChatQA(): Promise<ChatQAPatterns[]> {
  const questions = await db.query('SELECT * FROM chat_qa', []);

  if (questions.rows.length === 0) throw new Error("QAs not found. Please try again");

  return (questions.rows as ChatQADB[]).map(mapChatQADBToChatQA);
}