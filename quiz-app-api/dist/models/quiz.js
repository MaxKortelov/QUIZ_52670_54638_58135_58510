"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.quizTypes = exports.mapToQuestionList = void 0;
function mapToQuestionList(dto) {
    return dto.map(it => ({
        id: it.id,
        question: it.question,
        options: it.options
    }));
}
exports.mapToQuestionList = mapToQuestionList;
exports.quizTypes = {
    GENERAL_KNOWLEDGE_FACTFULNESS: '/templates/u_IjFiS6ID-M/data'
};
