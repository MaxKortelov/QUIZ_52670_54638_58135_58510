import { api } from 'utils/api';
import { LoginModel, makeLoginRequest, ResetPasswordRequest, VerifyEmailModel } from 'utils/dto/authorization';
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

const verifyEmail = async (values: VerifyEmailModel) => {
  try {
    await api.authorization.verifyEmail(values);
  } catch (e: any) {
    throw e;
  }
};

const resetPasswordGenerateToken = async (email: string) => {
  try {
    await api.authorization.resetPasswordGenerateToken(email);
  } catch (e: any) {
    throw e;
  }
};

const resetPassword = async (values: ResetPasswordRequest) => {
  try {
    await api.authorization.resetPassword(values);
  } catch (e: any) {
    throw e;
  }
};

export const authService = {
  login,
  register,
  verifyEmail,
  resetPasswordGenerateToken,
  resetPassword
};
