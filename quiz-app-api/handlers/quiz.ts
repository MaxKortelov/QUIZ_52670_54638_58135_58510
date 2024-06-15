import {Request, Response} from "express";
import {validateBody} from "../validators/entity.validator";
import {GenerateQuizSession, NewQuiz, QuizData, SaveQuizQuestion, StartQuizSession, SubmitQuiz} from "../types/quiz";
import errorService from "../services/error.service";
import * as quizDB from "../db/quiz";
import {getQuizSession, getQuizTypeList, saveAndCountQuizResult, updateUserQuizTableResults} from "../db/quiz";
import {
  addQuestions,
  addQuizQuestionAnswer,
  createQuizSession,
  findNextQuizQuestion,
  initiateQuizSession,
} from "../services/quiz.service";
import {findUser} from "../db/auth";
import {responseMessage} from "../utils/api.util";

export async function addQuizToDB(req: Request, res: Response) {
  await validateBody(req, NewQuiz).then((result) => result as NewQuiz)
    .then(async (quiz) => {
      try {
        const quizTypeId = await quizDB.addQuestionType(quiz.quizType).catch((errors: Array<string>) => errorService.validationError(res, errors));
        if (quizTypeId) {
          await addQuestions(quizTypeId, quiz.questions)
        } else {
          errorService.serverError(res, ["Server error - questionType"])
        }
        res.statusCode = 201;
        res.send(responseMessage("Quiz was successfully added."));
      } catch (_) {
        errorService.serverError(res, ["Something went wrong"])
      }
    }).catch(e => {
      errorService.validationError(res, e);
    })
}

export async function quizSessions(_req: Request, res: Response) {
    try {
      const quizSessions = await getQuizTypeList();
      res.statusCode = 200
      res.send({quizSessions});
    } catch (_) {
      errorService.serverError(res, ["Something went wrong"])
    }
}

export async function generateQuizSession(req: Request, res: Response) {
    try {
      const quizSessionRequestData = await validateBody(req, GenerateQuizSession) as GenerateQuizSession;
      const user = await findUser(quizSessionRequestData.email);
      const quizSession = await createQuizSession(quizSessionRequestData.quizTypeId, user.uuid);
      res.statusCode = 201;
      res.send({ quizSession })
    } catch (_) {
      errorService.serverError(res, ["Something went wrong"])
    }
}

export async function startQuizSession(req: Request, res: Response) {
  try {
    const quizSessionRequestData = await validateBody(req, StartQuizSession) as StartQuizSession;
    const user = await findUser(quizSessionRequestData.email);
    const quizData = await initiateQuizSession(quizSessionRequestData.quizSessionId, user.uuid)
    res.statusCode = 200;
    res.send(quizData);
  } catch (_) {
    errorService.serverError(res, ["Something went wrong"])
  }
}

  export async function saveQuizQuestion(req: Request, res: Response) {
  try {
    const quizSessionRequestData = await validateBody(req, SaveQuizQuestion) as SaveQuizQuestion;
    const user = await findUser(quizSessionRequestData.email);
    await addQuizQuestionAnswer(quizSessionRequestData, user.uuid).then(() => findNextQuizQuestion(quizSessionRequestData.quizSessionId, user.uuid));

    res.statusCode = 200;
    res.send({ message: "Answer is saved successfully" });
  } catch (_) {
    errorService.serverError(res, ["Something went wrong"])
  }
}

export async function nextQuizQuestion(req: Request, res: Response) {
  try {
    const quizSessionRequestData = await validateBody(req, SaveQuizQuestion) as SaveQuizQuestion;
    const user = await findUser(quizSessionRequestData.email);
    await addQuizQuestionAnswer(quizSessionRequestData, user.uuid).then(() => findNextQuizQuestion(quizSessionRequestData.quizSessionId, user.uuid));
    const question = await findNextQuizQuestion(quizSessionRequestData.quizSessionId, user.uuid);

    if (!question) return errorService.conflict(res, [`No unanswered questions left in the quiz. Please submit.`])

    const quizSession = await getQuizSession(quizSessionRequestData.quizSessionId, user.uuid);
    const data: QuizData = {
      question,
      questionsAmount: quizSession.question_sequence.length,
      currentQuestionCount: quizSession.question_sequence.findIndex(it => it === question.questionId) + 1,
      dateStarted: new Date(quizSession.date_started),
      dateEnded: new Date(quizSession.date_ended)
    };

    res.statusCode = 200;
    res.send(data);
  } catch (_) {
    errorService.serverError(res, ["Something went wrong"])
  }
}

export async function submitQuiz(req: Request, res: Response) {
  try {
    const submitQuizData = await validateBody(req, SubmitQuiz) as SubmitQuiz;
    const user = await findUser(submitQuizData.email);
    const quizSessionResult = await saveAndCountQuizResult(submitQuizData.quizSessionId, user.uuid);
    await updateUserQuizTableResults(user.uuid, submitQuizData.quizSessionId, quizSessionResult.correctAnswersCount)

    const data = {
      quizSessionId: submitQuizData.quizSessionId,
      result: quizSessionResult.resultInPercentage
    }

    res.statusCode = 200;
    res.send(data);
  } catch (e) {
    errorService.serverError(res, ["Something went wrong"])
  }
}