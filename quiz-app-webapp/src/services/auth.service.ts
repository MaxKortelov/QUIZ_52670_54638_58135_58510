import { api } from 'utils/api';
import { LoginModel, makeLoginRequest } from 'utils/dto/authorization';
import { QUIZ_EMAIL, QUIZ_IS_LOGGED } from "utils/constants";
import { profileResponseToModel } from "utils/dto/profile";

const login = async (params: LoginModel) => {
  try {
    const data = makeLoginRequest(params);

    const authResponse = await api.authorization.login(data);

    const authData = profileResponseToModel(authResponse);

    localStorage.setItem(QUIZ_IS_LOGGED, JSON.stringify(true));
    localStorage.setItem(QUIZ_EMAIL, JSON.stringify(authData.email));
    return authData;
  } catch (e: any) {
    throw e;
  }
};
const register = async (params: LoginModel) => {
  try {
    const data = makeLoginRequest(params);
    await api.authorization.register(data);
  } catch (e: any) {
    throw e;
  }
};

const resendVerifyEmail = async (email: string) => {
  try {
    await api.authorization.resendVerifyEmail(email);
  } catch (e: any) {
    throw e;
  }
};

export const authService = {
  login,
  register,
  resendVerifyEmail,
};
