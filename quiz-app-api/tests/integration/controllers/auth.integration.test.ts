import request from "supertest";
import app from "../../../app";

const rootPath = "/auth"

describe("Test the auth route", () => {
  test("It should return error for register user with empty body", () => {
    const path = '/user/register';
    return request(app)
      .post(rootPath + path)
      .expect(404);
  });
});