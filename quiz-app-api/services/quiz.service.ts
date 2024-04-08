import {Answer, NewAnswer, NewQuestion} from "../types/quiz";
import {addQuestion, addCorrectAnswersToQuestion, addAnswer} from "../db/quiz"

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