import db from "./index";
import {
  Answer,
  NewAnswer,
  NewQuestion,
  QuestionDB,
  QuestionWithAnswersDB,
  QuizSessionDB,
  QuizType
} from "../types/quiz";
import {toArrayText} from "../utils/db.util";
import {SessionOptions} from "../types/services/quiz.service";
import {asJSONDB} from "../types/db";

export async function addQuestionType(value: string): Promise<string> {
  const {rows} = await db.query('SELECT * FROM question_type WHERE description = $1', [value]);
  const questionType = rows.length > 0 ? rows[0] : null;

  if (questionType) return questionType.uuid as string;

  const result = await db.query('INSERT INTO question_type (description) VALUES ($1) RETURNING uuid', [value])
  return result.rows[0].uuid as string;
}

export async function addQuestion(questionTypeId: string, question: NewQuestion): Promise<string> {
  const result = await db.query('INSERT INTO question (question_text, question_type_id, correct_answers) VALUES ($1, $2, null) RETURNING uuid', [question.question, questionTypeId]);
  return result.rows[0].uuid as string;
}

export async function addCorrectAnswersToQuestion(questionId: string, correctAnswers: Array<Answer>): Promise<void> {
  const answers = toArrayText(correctAnswers.map(it => it.uuid));
  await db.query('UPDATE question SET correct_answers = $1 WHERE uuid = $2', [answers, questionId]);
}

export async function addAnswer(questionId: string, answer: NewAnswer): Promise<Answer> {
  const result = await db.query('INSERT INTO answer (answer_text, question_id) VALUES ($1, $2) RETURNING row_to_json(answer);', [answer.text, questionId])
  return asJSONDB(result.rows[0]).row_to_json as Answer;
}

export async function getQuizType(quizName: string): Promise<QuizType> {
  const result = await db.query('SELECT * FROM question_type WHERE description = $1;', [quizName])
  return result.rows[0] as QuizType;
}

export async function getQuizTypeList(): Promise<QuizType[]> {
  const result = await db.query('SELECT * FROM question_type;')
  return result.rows as QuizType[];
}

export async function getQuizQuestions(questionTypeId: string): Promise<QuestionDB[]> {
    const result = await db.query('SELECT * FROM question WHERE question_type_id = $1;', [questionTypeId]);
    return result.rows as QuestionDB[];
}

export async function getQuizQuestion(questionId: string): Promise<QuestionWithAnswersDB> {
  const questionResult = await db.query('SELECT * FROM question WHERE uuid = $1;', [questionId]);
  const question = questionResult.rows[0];
  const answersResult = await db.query('SELECT * FROM answer WHERE question_id = $1;', [questionId]);
  question.answers = answersResult.rows;

  return question as QuestionWithAnswersDB;
}

export async function addQuizSession({quizTypeId, userId, questionSequence, duration = 30}: SessionOptions): Promise<QuizSessionDB> {
  //@ts-ignore
  const result = await db.query(`INSERT INTO quiz_session (question_sequence, question_type_id, user_id, duration, date_ended) VALUES ($1, $2, $3, $4, CURRENT_TIMESTAMP + $5::INTERVAL) RETURNING row_to_json(quiz_session)`, [questionSequence, quizTypeId, userId, duration, `${duration} minutes`]);

  return asJSONDB(result.rows[0]).row_to_json as QuizSessionDB;
}
