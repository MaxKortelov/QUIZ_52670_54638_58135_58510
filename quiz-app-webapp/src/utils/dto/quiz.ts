import { Moment } from "moment";
import { createNewDate } from "../helpers/formatValues";

export type QuizListInfoModel = {
    uuid: string;
    description: string;
};

export type QuizListInfoResponse = {
    uuid: string;
    description: string;
};

export const quizListInfoResponseToModel = (data: QuizListInfoResponse): QuizListInfoModel => ({
    ...data
});

export type QuizListModel = {
    quizSessions: QuizListInfoModel[]
};

export type QuizListResponse = {
    quizSessions: QuizListInfoResponse[]
};

export const quizListResponseToModel = (data: QuizListResponse): QuizListModel => ({
    quizSessions: data?.quizSessions?.map(i => quizListInfoResponseToModel(i))
});



export type QuizInfoModel = {
    quizSessionId: string,
    questionAmount: number,
    quizDuration: number,
    quizAttempts: number,
    quizAttemptsUsed: number,
    dateCreated: Moment | undefined,
};

export type QuizInfoResponse = {
    quizSessionId: string,
    questionAmount: number,
    quizDuration: number,
    quizAttempts: number,
    quizAttemptsUsed: number,
    dateCreated: string,
};

export const quizInfoResponseToModel = (data: QuizInfoResponse): QuizInfoModel => ({
    ...data,
    dateCreated: createNewDate(data?.dateCreated)
});

export type QuizModel = {
    quizSession: QuizInfoModel
};

export type QuizResponse = {
    quizSession: QuizInfoResponse
};

export const quizResponseToModel = (data: QuizResponse): QuizModel => ({
    quizSession: quizInfoResponseToModel(data.quizSession)
});

export type QuizResultModel = {
    quizSessionId: string,
    result: string,
};

export type QuizResultResponse = {
    quizSessionId: string,
    result: string,
};

export const quizResultResponseToModel = (data: QuizResultResponse): QuizResultModel => ({
    ...data,
});




export type QuizAnswer = {
    id: string,
    text: string,
};

export type QuizQuestionModel = {
    question: {
        questionId: string,
        question: string,
        answers: QuizAnswer[],
        quizType: string
    },
    dateStarted: Moment | undefined,
    dateEnded: Moment | undefined,
    currentQuestionCount: number,
    questionsAmount: number,
};

export type QuizQuestionResponse = {
    question: {
        questionId: string,
        question: string,
        answers: QuizAnswer[],
        quizType: string
    },
    dateStarted: string,
    dateEnded: string,
    currentQuestionCount: number,
    questionsAmount: number,
};

export const quizQuestionResponseToModel = (data: QuizQuestionResponse): QuizQuestionModel => ({
    ...data,
    dateStarted: createNewDate(data?.dateStarted),
    dateEnded: createNewDate(data?.dateEnded),
});