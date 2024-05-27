import request from "supertest";
import app from "../../../app";
import db from "../../../db";
import {userMock, userEmailVerify, userPasswordUpdate, user2Mock} from "../../mocks/user.mock";
import {findUser} from "../../../db/auth";
import {mapDbUserToUser} from "../../../types/user";
import {getFullUserQuizTableResults} from "../../../db/quiz";

const rootPath = "/user"
const authPath = "/auth"

describe("Test user routes",  () => {
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

  test("It should get user info", async () => {
    const registerUserPath = '/user/register'

    const user = await request(app).post(authPath + registerUserPath).send(user2Mock).then(async () => findUser(user2Mock.email))

    const userResult = mapDbUserToUser(user, await getFullUserQuizTableResults(user.uuid));

    return request(app)
      .post(rootPath)
      .send(user2Mock)
      .expect(200, JSON.stringify(userResult));
  });
});
