import { api } from 'utils/api';

export const getQuestions = async () => {
  return api.chat.getQuestions();
};

export const sendMessage = async (prompt: string) => {
  return api.chat.sendMessage(prompt);
};

export const chatService = {
  getQuestions,
  sendMessage,
};
