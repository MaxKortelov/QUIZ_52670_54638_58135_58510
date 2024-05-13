import { api } from 'utils/api';
import { profileResponseToModel } from 'utils/dto/profile';

export const getCurrentUser = async (email: string) => {
  const user = await api.user.getCurrentUser(email);
  return profileResponseToModel(user);
};

export const userService = {
  getCurrentUser,
};
