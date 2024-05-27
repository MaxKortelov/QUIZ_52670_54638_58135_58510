import request from "supertest";
import app from "../../../app";
import db from "../../../db";
import {userMock, userEmailVerify, userPasswordUpdate} from "../../mocks/user.mock";
import {findUser} from "../../../db/auth";
import {mapDbUserToUser} from "../../../types/user";
import {getFullUserQuizTableResults} from "../../../db/quiz";

const rootPath = "/auth"

describe("Test the auth routes in sequence register -> verify email -> login -> request to change password -> change password",  () => {
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

  test("It should return error for register user with empty body", async () => {
    const path = '/user/register';

    return request(app).post(rootPath + path,).send({}).expect(400);
  });

  test("It should return message that user is registered", () => {
    const path = '/user/register';

    return request(app)
      .post(rootPath + path)
      .send(userMock)
      .expect(201, {
        message: "Message was successfully sent to email"
      });
  });

  test("It should return error message if the user is registered", () => {
    const path = '/user/register';

    return request(app)
      .post(rootPath + path)
      .send(userMock)
      .expect(400);
  });

  test("It should confirm user email", async () => {
    const path = '/user/email/verify';

    const user = await findUser(userEmailVerify.email)

    userEmailVerify.token = user.verify_email_token;

    return request(app)
      .post(rootPath + path)
      .send(userEmailVerify)
      .expect(200);
  });

  test("It should login user", async () => {
    const path = '/user/login';

    const user = await findUser(userMock.email);

    const userResult = mapDbUserToUser(user, await getFullUserQuizTableResults(user.uuid));

    return request(app)
      .post(rootPath + path)
      .send(userMock)
      .expect(200, JSON.stringify(userResult));
  });

  test("It should send an email to update password", async () => {
    const path = '/user/email_action_password_reset';

    return request(app)
      .post(rootPath + path)
      .send(userMock)
      .expect(200, {
        message: "Message was successfully sent"
      });
  });

  test("It should update user password", async () => {
    const path = '/user/password_update';

    const user = await findUser(userMock.email);

    userPasswordUpdate.token = user.reset_password_token;

    return request(app)
      .post(rootPath + path)
      .send(userPasswordUpdate)
      .expect(200);
  });
});
