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