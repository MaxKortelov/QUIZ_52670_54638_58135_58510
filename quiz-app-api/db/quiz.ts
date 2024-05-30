import db from "./index";
import {
  Answer, FullQuizTableResultsDb,
  NewAnswer,
  NewQuestion,
  QuestionDB,
  QuestionWithAnswersDB,
  QuizSessionDB, QuizTableResultsDb,
  QuizType,
  SaveQuizQuestion
} from "../types/quiz";
import {toArrayText} from "../utils/db.util";
import {SessionOptions} from "../types/services/quiz.service";
import {asJSONDB} from "../types/db";
import {calculateBestQuizSession} from "../services/quiz.service";

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

export async function getQuizTypeById(questionTypeId: string): Promise<QuizType> {
  const result = await db.query('SELECT * FROM question_type WHERE uuid = $1;', [questionTypeId])
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

export async function addQuizSession({quizTypeId, userId, questionSequence, duration = 30, attempts = 10}: SessionOptions): Promise<QuizSessionDB> {

  const result = await db.query(`INSERT INTO quiz_session (question_sequence, question_type_id, user_id, duration, attempts) VALUES ($1, $2, $3, $4, $5) RETURNING row_to_json(quiz_session)`, [questionSequence, quizTypeId, userId, duration, attempts]);

  return asJSONDB(result.rows[0]).row_to_json as QuizSessionDB;
}

// For quiz that is not started
export async function findEmptyQuizSession(quizTypeId: string, userId: string): Promise<QuizSessionDB | undefined> {
  const result = await db.query(`SELECT * FROM quiz_session WHERE question_type_id = $1 AND user_id = $2 ;`, [quizTypeId, userId]);

  return result.rows[0] as QuizSessionDB;
}

export async function startQuizSession(quizSessionId: string, userId: string): Promise<void> {
  const quizSession = await getQuizSession(quizSessionId, userId);
  if(quizSession.attempts - quizSession.attempts_used <= 0) throw Error("All attempts are used");

  const duration = `${quizSession.duration} minutes`;
  await db.query('UPDATE quiz_session SET date_started = CURRENT_TIMESTAMP, date_ended = CURRENT_TIMESTAMP + $1::INTERVAL, attempts_used = attempts_used + 1, question_answer = $2 WHERE uuid = $3 AND user_id = $4;', [duration, {}, quizSessionId, userId]);

  return;
}

export async function getQuizSession(quizSessionId: string, userId: string): Promise<QuizSessionDB> {
  const quiz = await db.query('SELECT * FROM quiz_session WHERE uuid = $1 AND user_id = $2;', [quizSessionId, userId]);

  if (quiz.rows.length === 0) throw new Error("Quiz not found. Please try again");

  return quiz.rows[0] as QuizSessionDB;
}

export async function getQuizSessionById(quizSessionId: string): Promise<QuizSessionDB> {
  const quiz = await db.query('SELECT * FROM quiz_session WHERE uuid = $1;', [quizSessionId]);

  if (quiz.rows.length === 0) throw new Error("Quiz not found. Please try again");

  return quiz.rows[0] as QuizSessionDB;
}

export async function addQuestionAnswer(quizSessionRequestData: SaveQuizQuestion, userId: string): Promise<void> {
  const {question_answer} = await getQuizSession(quizSessionRequestData.quizSessionId, userId);

  const new_question_answer = {...question_answer, [quizSessionRequestData.questionId]: quizSessionRequestData.answerId};

  await db.query('UPDATE quiz_session SET question_answer = $1 WHERE uuid = $2 AND user_id = $3;', [new_question_answer, quizSessionRequestData.quizSessionId, userId]);

  return;
}

export async function saveAndCountQuizResult(quizSessionId: string, userId: string): Promise<{ correctAnswersCount: number; resultInPercentage: string; }> {
  const {question_answer, question_type_id} = await getQuizSession(quizSessionId, userId);
  const questions = await getQuizQuestions(question_type_id);
  const answersCheckList = questions.map(({correct_answers, uuid: questionId}) => question_answer[questionId] === correct_answers[0]);
  const correctAnswersCount = answersCheckList.filter(it => it).length;
  const result = 100 * answersCheckList.filter(it => it).length / answersCheckList.length;

  await db.query('UPDATE quiz_session SET result = $1, date_ended = CURRENT_TIMESTAMP WHERE uuid = $2 AND user_id = $3 RETURNING quiz_session;', [result, quizSessionId, userId]);

  return {
    correctAnswersCount,
    resultInPercentage: result + "%"
  };
}

export async function createUserQuizTableResults(userId: string): Promise<QuizTableResultsDb>  {
  const result = await db.query('INSERT INTO quiz_table_results (user_id) VALUES ($1) RETURNING row_to_json(quiz_table_results);', [userId])
  return asJSONDB(result.rows[0]).row_to_json as QuizTableResultsDb;
}

export async function updateUserQuizTableResults(userId: string, quizSessionId: string, correctAnswersCount: number): Promise<QuizTableResultsDb>  {
    const currentQuizTableResults = await getUserQuizTableResults(userId);
    const oldQuizSession = currentQuizTableResults.best_quiz_session_id ? await getQuizSessionById(currentQuizTableResults.best_quiz_session_id) : null;
    const newQuizSession = await getQuizSessionById(quizSessionId);

    const bestQuizSession = calculateBestQuizSession(oldQuizSession, newQuizSession).uuid;

    const result = await db.query('UPDATE quiz_table_results SET best_quiz_session_id = $1, quiz_amount_taken = $2, correct_answers = $3 WHERE user_id = $4 RETURNING row_to_json(quiz_table_results);', [bestQuizSession, currentQuizTableResults.quiz_amount_taken + 1, correctAnswersCount, userId]);

    return asJSONDB(result.rows[0]).row_to_json as QuizTableResultsDb;
}

export async function getUserQuizTableResults(userId: string): Promise<QuizTableResultsDb>  {
  const quizTableResult = await db.query('SELECT * FROM quiz_table_results WHERE user_id = $1;', [userId]);
  return quizTableResult.rows[0] as QuizTableResultsDb;
}

export async function getFullUserQuizTableResults(userId: string): Promise<FullQuizTableResultsDb>  {
  const quizTableResult = await getUserQuizTableResults(userId);
  try {
    const best_quiz_session = await getQuizSessionById(quizTableResult.best_quiz_session_id);

    return {
      ...quizTableResult,
      best_quiz_session
    }
  } catch (_) {
    return {
      ...quizTableResult,
      best_quiz_session: null
    }
  }
}