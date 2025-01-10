import db from "./index";
import {ChatQuestion} from "../types/chat";

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