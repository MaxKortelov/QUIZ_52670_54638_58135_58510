import request from "supertest";
import app from "../../../app";
import db from "../../../db";
import {
  userMock,
  userEmailVerify,
  userPasswordUpdate,
  user2Mock,
  userQuizMock,
  generateQuizSessionPayload
} from "../../mocks/user.mock";
import {findUser} from "../../../db/auth";
import {mapDbUserToUser} from "../../../types/user";
import {getFullUserQuizTableResults, getQuizTypeList} from "../../../db/quiz";
import {quizTest} from "../../mocks/quiz.mock";

const rootPath = "/quiz";
const authPath = "/auth";

let generatedQuizSessionId: string;

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
      .send(quizTest)
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

    const quizSessions = await getQuizTypeList()

    generateQuizSessionPayload.quizTypeId = quizSessions[0].uuid;

    return request(app)
      .post(rootPath + quizSessionGenerate)
      .send(generateQuizSessionPayload)
      .expect(201)
      .then((response) => {
        generatedQuizSessionId = response.body.quizSession.quizSessionId;
      });
  });
});
