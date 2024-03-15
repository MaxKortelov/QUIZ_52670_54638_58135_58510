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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const quizService_1 = require("../services/quizService");
exports.router = express_1.default.Router();
exports.router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.query.type);
    yield (0, quizService_1.findQuiz)(req.query.type)
        .then(quiz => {
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Access-Control-Allow-Credentials', 'true');
        res.statusCode = 200;
        res.end(JSON.stringify(quiz, null, 2));
    })
        .catch(err => {
        res.statusCode = 500;
        res.end(JSON.stringify({ message: err }));
    });
}));
exports.router.post('/check', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // No validation applied
    (0, quizService_1.checkAnswers)(req.query.type, req.body).then((answers) => {
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Access-Control-Allow-Credentials', 'true');
        res.statusCode = 200;
        res.end(JSON.stringify(answers, null, 2));
    });
}));
