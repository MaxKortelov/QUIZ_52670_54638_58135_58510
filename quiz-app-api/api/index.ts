import axios, {AxiosResponse} from "axios";
import {token} from "../@shared/env-vars";
import {IUser} from "../models/user";
import {IQuestionAnswer} from "../models/quiz";

const api = axios.create({
  baseURL: 'https://api.json-generator.com',
  headers: {
    Authorization: 'Bearer ' + token,
  }
});

export const getUsers: () => Promise<AxiosResponse<IUser[]>> = async () => await api.get('/templates/O2sVLuWG2aLT/data');

export const getQuiz: (url: string) => Promise<AxiosResponse<IQuestionAnswer[]>> = async (url) => await api.get(url);

