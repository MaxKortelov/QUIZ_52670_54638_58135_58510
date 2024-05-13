import { axiosInstance } from './axiosInstance';
import { LoginRequest, ResetPasswordRequest } from '../dto/authorization';
import {ProfileResponse} from "../dto/profile";

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

export const resendVerifyEmail = (email: string) => {
  return true;
  return axiosInstance.post(
      '/auth/user/',
      { email },
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
