import {
    quizListInfoResponseToModel,
    quizListResponseToModel,
    quizInfoResponseToModel,
    quizResponseToModel,
    quizResultResponseToModel,
    quizQuestionResponseToModel,
    QuizListInfoResponse,
    QuizListResponse,
    QuizInfoResponse,
    QuizResponse,
    QuizResultResponse,
    QuizQuestionResponse
} from '../quiz';

describe('quizListInfoResponseToModel', () => {
    it('should convert QuizListInfoResponse to QuizListInfoModel correctly', () => {
        const response: QuizListInfoResponse = {
            uuid: '123',
            description: 'Test description',
        };

        const expectedModel = {
            uuid: '123',
            description: 'Test description',
        };

        const result = quizListInfoResponseToModel(response);
        expect(result).toEqual(expectedModel);
    });
});

describe('quizListResponseToModel', () => {
    it('should convert QuizListResponse to QuizListModel correctly', () => {
        const response: QuizListResponse = {
            quizSessions: [
                { uuid: '123', description: 'Test description 1' },
                { uuid: '456', description: 'Test description 2' },
            ],
        };

        const expectedModel = {
            quizSessions: [
                { uuid: '123', description: 'Test description 1' },
                { uuid: '456', description: 'Test description 2' },
            ],
        };

        const result = quizListResponseToModel(response);
        expect(result).toEqual(expectedModel);
    });
});

describe('quizInfoResponseToModel', () => {
    it('should convert QuizInfoResponse to QuizInfoModel correctly', () => {
        const response: QuizInfoResponse = {
            quizSessionId: '789',
            questionAmount: 10,
            quizDuration: 60,
            quizAttempts: 3,
            quizAttemptsUsed: 1,
            dateCreated: '2023-01-01T00:00:00Z',
        };

        const expectedModel = {
            quizSessionId: '789',
            questionAmount: 10,
            quizDuration: 60,
            quizAttempts: 3,
            quizAttemptsUsed: 1,
            dateCreated: new Date('2023-01-01T00:00:00Z'),
        };

        const result = quizInfoResponseToModel(response);
        expect(result).toEqual(expectedModel);
    });
});

describe('quizResponseToModel', () => {
    it('should convert QuizResponse to QuizModel correctly', () => {
        const response: QuizResponse = {
            quizSession: {
                quizSessionId: '789',
                questionAmount: 10,
                quizDuration: 60,
                quizAttempts: 3,
                quizAttemptsUsed: 1,
                dateCreated: '2023-01-01T00:00:00Z',
            },
        };

        const expectedModel = {
            quizSession: {
                quizSessionId: '789',
                questionAmount: 10,
                quizDuration: 60,
                quizAttempts: 3,
                quizAttemptsUsed: 1,
                dateCreated: new Date('2023-01-01T00:00:00Z'),
            },
        };

        const result = quizResponseToModel(response);
        expect(result).toEqual(expectedModel);
    });
});

describe('quizResultResponseToModel', () => {
    it('should convert QuizResultResponse to QuizResultModel correctly', () => {
        const response: QuizResultResponse = {
            quizSessionId: '123',
            result: 'Passed',
        };

        const expectedModel = {
            quizSessionId: '123',
            result: 'Passed',
        };

        const result = quizResultResponseToModel(response);
        expect(result).toEqual(expectedModel);
    });
});

describe('quizQuestionResponseToModel', () => {
    it('should convert QuizQuestionResponse to QuizQuestionModel correctly', () => {
        const response: QuizQuestionResponse = {
            question: {
                questionId: '321',
                question: 'What is the capital of France?',
                answers: [
                    { id: '1', text: 'Paris' },
                    { id: '2', text: 'Berlin' },
                ],
                quizType: 'multiple-choice',
            },
            dateStarted: '2023-01-01T00:00:00Z',
            dateEnded: '2023-01-01T00:10:00Z',
            currentQuestionCount: 1,
            questionsAmount: 10,
        };

        const expectedModel = {
            question: {
                questionId: '321',
                question: 'What is the capital of France?',
                answers: [
                    { id: '1', text: 'Paris' },
                    { id: '2', text: 'Berlin' },
                ],
                quizType: 'multiple-choice',
            },
            dateStarted: new Date('2023-01-01T00:00:00Z'),
            dateEnded: new Date('2023-01-01T00:10:00Z'),
            currentQuestionCount: 1,
            questionsAmount: 10,
        };

        const result = quizQuestionResponseToModel(response);
        expect(result).toEqual(expectedModel);
    });
});
