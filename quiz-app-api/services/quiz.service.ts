import {
  Answer,
  mapQuizSessionDBToQuizSessionInfo,
  NewAnswer,
  NewQuestion,
  NewQuiz,
  questionWithAnswersDBToQuizQuestion,
  QuizData,
  QuizQuestion,
  QuizSessionDB,
  QuizSessionInfo,
  SaveQuizQuestion
} from "../types/quiz";
import {
  addAnswer,
  addCorrectAnswersToQuestion,
  addQuestion,
  addQuestionAnswer, addQuestionType,
  addQuizSession,
  findEmptyQuizSession,
  getQuizQuestion,
  getQuizQuestions,
  getQuizSession,
  getQuizType,
  getQuizTypeById,
  startQuizSession
} from "../db/quiz"
import {bufferToJson, listFilesSync, readFileSync} from "../utils/fs.util";
import {SessionOptions} from "../types/services/quiz.service";
import {ATTEMPTS_PER_QUIZ, TIME_PER_QUESTION} from "../@shared/env-vars";
import {dateDifferenceInSeconds} from "../utils/date.util";

export async function addQuestions(questionTypeId: string, questions: Array<NewQuestion>): Promise<void> {
  for await (let question of questions) {
    const questionId = await addQuestion(questionTypeId, question);
    const answers = await addAnswers(questionId, question.answers);
    const newCorrectAnsers = question.answers.filter(it => it.id === question.answerId).map(it => it.text);
    const correctAnswers = answers.filter(it => newCorrectAnsers.includes(it.answer_text));
    await addCorrectAnswersToQuestion(questionId, correctAnswers);
  }
}

export async function addAnswers(questionId: string, answers: Array<NewAnswer>): Promise<Answer[]> {
  let result: Array<Answer> = []
  for await (let answer of answers) {
    const createdAnswer = await addAnswer(questionId, answer);
    result.push(createdAnswer);
  }
  return result;
}

export async function loadInitialQuizzes() {
  const quizzes = listFilesSync("assets/quiz");
  for await (let quizFile of quizzes) {
    const quiz = bufferToJson(readFileSync("assets/quiz/" + quizFile)) as unknown as NewQuiz;
    const quizExists = await checkQuiz(quiz.quizType);
    if(quizExists) continue;
    const quizTypeId = await addQuestionType(quiz.quizType);
    await addQuestions(quizTypeId, quiz.questions);
    console.log(`Quiz ${quiz.quizType} added to database`);
  }
}

async function checkQuiz(quizName: string): Promise<boolean> {
  const quiz = await getQuizType(quizName);
  return !!quiz;
}

export async function createQuizSession(quizTypeId: string, userId: string): Promise<QuizSessionInfo> {
  const existedSession = await findEmptyQuizSession(quizTypeId, userId);
  if (existedSession) return mapQuizSessionDBToQuizSessionInfo(existedSession);

  const questions = await getQuizQuestions(quizTypeId);
  const questionSequence = questions.map(it => it.uuid).sort(() => Math.random() - 0.5);
  const duration = questionSequence.length * TIME_PER_QUESTION;
  const attempts = ATTEMPTS_PER_QUIZ;

  const sessionOptions: SessionOptions = { quizTypeId, userId, questionSequence, duration, attempts };

  const quizSession = await addQuizSession(sessionOptions);

  return mapQuizSessionDBToQuizSessionInfo(quizSession);
}

export async function findNextQuizQuestion(quizSessionId: string, userId: string): Promise<QuizQuestion | undefined> {
  const quizSession = await getQuizSession(quizSessionId, userId);
  const answeredQuestions = Object.keys(quizSession.question_answer);
  const currentQuestionId = quizSession.question_sequence.find(q => !answeredQuestions.includes(q)); // Find first question that is not answered
  const { description: quizType} = await getQuizTypeById(quizSession.question_type_id);

  return currentQuestionId ? questionWithAnswersDBToQuizQuestion(await getQuizQuestion(currentQuestionId), quizType) : undefined;
}

export async function initiateQuizSession(quizSessionId: string, userId: string): Promise<QuizData> {
  await startQuizSession(quizSessionId, userId).catch(() => {throw new Error("Quiz was not started")});

  const question = await findNextQuizQuestion(quizSessionId, userId);
  if (!question) throw new Error("Quiz is not valid");
  const quizSession = await getQuizSession(quizSessionId, userId);

  return {
    question,
    questionsAmount: quizSession.question_sequence.length,
    currentQuestionCount: quizSession.question_sequence.findIndex(it => it === question.questionId) + 1,
    dateStarted: new Date(quizSession.date_started),
    dateEnded: new Date(quizSession.date_ended)
  }
}

export async function addQuizQuestionAnswer(quizSessionRequestData: SaveQuizQuestion, userId: string) {
  await addQuestionAnswer(quizSessionRequestData, userId);
  return;
}

export function calculateBestQuizSession(oldQuizSession: QuizSessionDB | null, newQuizSession: QuizSessionDB | null): QuizSessionDB {
  if(!oldQuizSession && newQuizSession) {
    return newQuizSession;
  }

  if(!newQuizSession && oldQuizSession) {
    return oldQuizSession;
  }

  if(oldQuizSession && newQuizSession) {
    const bestTimeOldQuizSession = dateDifferenceInSeconds(oldQuizSession.date_started, oldQuizSession.date_ended);
    const bestTimeNewQuizSession = dateDifferenceInSeconds(newQuizSession.date_started, newQuizSession.date_ended);

    return bestTimeOldQuizSession < bestTimeNewQuizSession ? oldQuizSession : newQuizSession;
  }

  throw new Error("calculateBestQuizSession - Quiz session wasn't found");
}