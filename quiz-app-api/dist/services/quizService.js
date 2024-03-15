"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkAnswers = exports.findQuiz = void 0;
const api_1 = require("../api");
const quiz_1 = require("../models/quiz");
function findQuiz(type) {
    return __awaiter(this, void 0, void 0, function* () {
        if (quiz_1.quizTypes[type]) {
            return yield (0, api_1.getQuiz)(quiz_1.quizTypes[type])
                .then(({ data: questionsAnswers }) => (0, quiz_1.mapToQuestionList)(questionsAnswers))
                .catch(() => new Error("Internal Server error"));
        }
        else {
            return new Error('No quiz type found');
        }
    });
}
exports.findQuiz = findQuiz;
function checkAnswers(type, answers) {
    return __awaiter(this, void 0, void 0, function* () {
        if (quiz_1.quizTypes[type]) {
            return yield (0, api_1.getQuiz)(quiz_1.quizTypes[type])
                .then(({ data: questionsAnswers }) => {
                return questionsAnswers.reduce((acc, it) => {
                    const question = Object.entries(answers).find(([key]) => key === it.id);
                    if (question) {
                        return Object.assign(Object.assign({}, acc), { [question[0]]: it.answerId === question[1] });
                    }
                    return acc;
                }, {});
            })
                .catch(() => new Error("Internal Server error"));
        }
        else {
            return new Error('No quiz type found');
        }
    });
}
exports.checkAnswers = checkAnswers;
