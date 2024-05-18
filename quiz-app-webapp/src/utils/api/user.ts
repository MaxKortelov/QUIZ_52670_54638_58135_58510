import { axiosInstance } from './axiosInstance';
import { ProfileResponse } from '../dto/profile';

export const getCurrentUser = (email: string) => {
  return axiosInstance.post<ProfileResponse>('/user', { email }).then((res) => res?.data);
};
