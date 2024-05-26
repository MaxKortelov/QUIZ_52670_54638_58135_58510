import request from "supertest";
import app from "../../../app";
import db from "../../../db";
import {after} from "node:test";

const rootPath = "/auth"

describe("Test the auth route",  () => {
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
    const payload = {
      "username": "ivan",
      "email": "test@test.com",
      "password": "12+5_*RF8"
    }

    return request(app)
      .post(rootPath + path)
      .send(payload)
      .expect(201, {
        message: "Message was successfully sent to email"
      });
  });
});