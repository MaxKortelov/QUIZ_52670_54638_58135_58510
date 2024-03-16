import axios, {AxiosError, AxiosInstance, AxiosResponse} from "axios";
import {IUser, NO_VALUE} from "../models/store/auth";
import {ILoginDTO} from "../models/login";
import {IQuestion, quizTypes} from "../models/store/quiz";


const protocol = (process.env.REACT_APP_BACKEND_PROTOCOL || "").toString() ?? "http://";
const host = (process.env.REACT_APP_BACKEND_HOST || "").toString() ?? "localhost";
const port = process.env.REACT_APP_BACKEND_PORT ? ":" + (process.env.REACT_APP_BACKEND_PORT || "").toString() : "";
export const baseURL = protocol + host + port;
console.log("Base url: ", protocol, host, port);

function createAxiosInstance(token: string): AxiosInstance {
  return axios.create({
    baseURL,
    withCredentials: true,
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}

export let api = createAxiosInstance(NO_VALUE);

export const authApi = axios.create({
  baseURL,
  withCredentials: true,
});

export function responseInterceptor(axios: AxiosInstance): void {
  axios.interceptors.response.use(
    function (response): AxiosResponse {
      return response;
    },
    async function (error): Promise<AxiosError> {
      return Promise.reject(error.response)
    })
}

export async function login(params: ILoginDTO): Promise<IUser> {
  responseInterceptor(authApi);
  return authApi.post<IUser>('/auth', params).then(({data}) => {
    api = createAxiosInstance(data.apiKey)
    return data
  })
}

export async function getQiuz(quizType: quizTypes): Promise<IQuestion[]> {
  return api.get<IQuestion[]>('/quiz', {params: {type: quizType}}).then(({data}) => data)
}

export async function checkAnswers(answers: Record<string, string>, quizType: quizTypes): Promise<Record<string, string>> {
  return api.post<Record<string, string>>('/quiz/check', answers, {params: {type: quizType}}).then(({data}) => data)
}
