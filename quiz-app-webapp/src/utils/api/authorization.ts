import { axiosInstance } from './axiosInstance';
import { LoginRequest, ResetPasswordRequest, VerifyEmailModel } from '../dto/authorization';
import { ProfileResponse } from "../dto/profile";

export const login = (values: LoginRequest) => {
  return axiosInstance.post<ProfileResponse>(
      '/auth/user/login',
      values,
  ).then(res => res?.data);
};

export const register = (values: LoginRequest) => {
  return axiosInstance.post(
      '/auth/user/register',
      values,
  ).then(res => res?.data);
};

export const verifyEmail = (values: VerifyEmailModel) => {
  return axiosInstance.post(
      '/auth/user/email/verify',
      values,
  )
};

export const resetPasswordGenerateToken = (email: string) => {
  return axiosInstance.post(
      '/auth/user/email_action_password_reset',
      { email },
  )
};

export const resetPassword = (values: ResetPasswordRequest) => {
  return axiosInstance.post(
      '/auth/user/password_update',
      values,
  )
};
