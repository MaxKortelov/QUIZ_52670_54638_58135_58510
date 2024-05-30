import request from "supertest";
import app from "../../../app";
import db from "../../../db";
import {userQuizMock,} from "../../mocks/user.mock";
import {findUser} from "../../../db/auth";
import {getQuizQuestions, getQuizTypeList} from "../../../db/quiz";
import {generateQuizSessionPayload, quizSessionData, newQuizTest} from "../../mocks/quiz.mock";
import {QuizData} from "../../../types/quiz";

const rootPath = "/quiz";
const authPath = "/auth";

let generatedQuizSessionId: string;
let quizTypeId: string;
let currentQuestion: QuizData;

describe("Test quiz routes",  () => {
  beforeAll(async () => {
    await db
      .connect()
      .then(() =>
        console.info(`Connected to quiz database on port ${process.env.DB_PORT} successfully`)
      )
      .catch(() => console.error("Failed to connect to quiz database"));
  });

  afterAll(() => {
    db.end().then(() => console.info("DB connection ended"));
  });

  test("It should add quiz to DB", async () => {
    const addQuiz = "/add"

    return request(app)
      .post(rootPath + addQuiz)
      .send(newQuizTest)
      .expect(201, {
        message: "Quiz was successfully added."
      });
  });

  test("It should return list of quizzes", async () => {
    const quizList = "/list"

    const quizSessions = await getQuizTypeList()

    return request(app)
      .get(rootPath + quizList)
      .expect(200, { quizSessions });
  });

  test("It should generate new quiz session", async () => {
    const quizSessionGenerate = "/generate";
    const registerPath = '/user/register';
    const verifyEmailPath = '/user/email/verify';

    await request(app).post(authPath + registerPath).send(userQuizMock);

    const {verify_email_token: token} = await findUser(userQuizMock.email)

    await request(app)
      .post(authPath + verifyEmailPath)
      .send({...userQuizMock, token})
      .expect(200)

    const quizzes = await getQuizTypeList()

    generateQuizSessionPayload.quizTypeId = quizzes[0].uuid;
    quizTypeId = quizzes[0].uuid

    return request(app)
      .post(rootPath + quizSessionGenerate)
      .send(generateQuizSessionPayload)
      .expect(201)
      .then((response) => {
        generatedQuizSessionId = response.body.quizSession.quizSessionId;
      });
  });

  test("It should pass quiz session", async () => {
    const startQuizSession = "/start";
    const nextQuizSessionQuestion = "/question/next";
    quizSessionData.quizSessionId = generatedQuizSessionId;

    const question = await request(app)
      .post(rootPath + startQuizSession)
      .send(quizSessionData)
      .expect(200);

    currentQuestion = question.body;

    const questions = await getQuizQuestions(quizTypeId);

    let counter = 1;

    for await (let _ of questions) {
      if(counter >= questions.length) break;
      let newQuestion = await request(app)
        .post(rootPath + nextQuizSessionQuestion)
        .send({...quizSessionData, questionId: currentQuestion.question.questionId, answerId: currentQuestion.question.answers[0].id})
        .expect(200)
      currentQuestion = newQuestion.body;
      counter ++;
    }
  });

  test("It should save quiz question", async () => {
    const saveQuizQuestion = "/question/save";

    quizSessionData.quizSessionId = generatedQuizSessionId;

    return request(app)
      .post(rootPath + saveQuizQuestion)
      .send({...quizSessionData, questionId: currentQuestion.question.questionId, answerId: currentQuestion.question.answers[0].id})
      .expect(200);
  });

  test("It should return 409 error when trigger next on the last question", async () => {
    const nextQuizSessionQuestion = "/question/next";

    quizSessionData.quizSessionId = generatedQuizSessionId;

    return request(app)
      .post(rootPath + nextQuizSessionQuestion)
      .send({...quizSessionData, questionId: currentQuestion.question.questionId, answerId: currentQuestion.question.answers[0].id})
      .expect(409, {
        errors: [ 'No unanswered questions left in the quiz. Please submit.' ]
      })
  });

  test("It should return quiz result", async () => {
    const submitQuiz = "/submit"

    quizSessionData.quizSessionId = generatedQuizSessionId;

    return request(app)
      .post(rootPath + submitQuiz)
      .send(quizSessionData)
      .expect(200, {
        quizSessionId: generatedQuizSessionId,
        "result": "0%"
      });
  });
});
