import { axiosInstance } from './axiosInstance';
import { Answer, Questions } from "../dto/chat";

export const getQuestions = () => {
  return axiosInstance.get<Questions>('/chat/getQuestions').then((res) => res?.data);
};

export const sendMessage = (prompt: string) => {
  return axiosInstance.post<Answer>('/chat/send', { prompt }).then((res) => res?.data);
};
