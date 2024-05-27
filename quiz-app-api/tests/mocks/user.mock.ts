import {NewUser} from "../../types/user";

const email = "test@test.com";
const password =  "12+5_*RF8";

export const userMock: NewUser = {
  username: "ivan",
  email,
  password
}

export const userEmailVerify = {
  email,
  token: ""
}

export const userPasswordUpdate = {
  email,
  token: "",
  password
}

export const user2Mock: NewUser = {
  username: "user routes",
  email: "user-routes@test.com",
  password: "test_#Jbvt*"
}

export const userQuizMock: NewUser = {
  username: "user quiz",
  email: "user-quiz@test.com",
  password: "test_#Jbvt*123"
}

