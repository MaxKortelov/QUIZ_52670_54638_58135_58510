import { axiosInstance } from './axiosInstance';
import {ChangePasswordRequest, ProfileResponse} from '../dto/profile';

export const getCurrentUser = (email: string) => {
  return axiosInstance.post<ProfileResponse>('/user', { email }).then((res) => res?.data);
};
export const changePassword = (values: ChangePasswordRequest) => {
  return true;
  return axiosInstance.post('/user/change-password', values).then((res) => res?.data);
};
