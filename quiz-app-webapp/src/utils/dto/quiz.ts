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
    dateCreated: Date,
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
    dateCreated: new Date(data?.dateCreated)
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
    dateStarted: Date,
    dateEnded: Date,
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
    dateStarted: new Date(data?.dateStarted),
    dateEnded: new Date(data?.dateEnded),
});

export type CreateQuizQuestionAnswer = {
    id: string,
    text: string,
}

export type CreateQuizQuestion = {
    answers: CreateQuizQuestionAnswer[],
    answerId?: string,
    question: string,
}

export type CreateQuizRequest = {
    quizType: string,
    questions: CreateQuizQuestion[]
}


export type CreateQuizQuestionAnswerModel = {
    id: number,
    answer: string,
    correctAnswer: number,
}

export type CreateQuizQuestionModel = {
    answers: CreateQuizQuestionAnswerModel[],
    question: string,
}

export type CreateQuizModel = {
    quizName: string,
    questions: CreateQuizQuestionModel[]
}

const createQuizQuestionModelToRequest = (data: CreateQuizQuestionModel): CreateQuizQuestion  => ({
    question: data.question,
    answerId: String((data.answers.find(({ correctAnswer }) => correctAnswer)?.correctAnswer || 0) + 1),
    answers: data.answers.map(({ answer}, index) =>  ({ id: String(index+1), text: answer }))
})

export const createQuizModelToRequest = (data: CreateQuizModel): CreateQuizRequest => ({
    quizType: data?.quizName,
    questions: data.questions.map((i) => createQuizQuestionModelToRequest(i))
});
