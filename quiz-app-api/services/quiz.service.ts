import {Answer, NewAnswer, NewQuestion, NewQuiz} from "../types/quiz";
import * as quizDB from "../db/quiz"
import {addAnswer, addCorrectAnswersToQuestion, addQuestion, getQuizType} from "../db/quiz"
import {bufferToJson, listFilesSync, readFileSync} from "../utils/fs.util";

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
    const quizTypeId = await quizDB.addQuestionType(quiz.quizType);
    await addQuestions(quizTypeId, quiz.questions);
    console.log(`Quiz ${quiz.quizType} added to database`);
  }
}

async function checkQuiz(quizName: string): Promise<boolean> {
  const quiz = await getQuizType(quizName);
  return !!quiz;
}

export async function createQuizSession(quizTypeId: string, userId: string): Promise<void> {
  return;
}