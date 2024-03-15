"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setControllers = void 0;
const auth_1 = require("./auth");
const quiz_1 = require("./quiz");
const authService_1 = require("../services/authService");
function setControllers(app) {
    app.use('/auth', auth_1.router);
    app.use('/quiz', authService_1.verifyToken, quiz_1.router);
}
exports.setControllers = setControllers;
