import { api } from 'utils/api';
import { ChangePasswordRequest, profileResponseToModel } from 'utils/dto/profile';

export const getCurrentUser = async (email: string) => {
  const user = await api.user.getCurrentUser(email);
  return profileResponseToModel(user);
};

export const changePassword = (values: ChangePasswordRequest) => {
  return api.user.changePassword(values);
};

export const userService = {
  getCurrentUser,
  changePassword,
};
