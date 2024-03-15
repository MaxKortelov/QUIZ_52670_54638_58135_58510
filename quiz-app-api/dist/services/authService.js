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
exports.verifyToken = exports.findUser = void 0;
const api_1 = require("../api");
function findUser(userData) {
    return __awaiter(this, void 0, void 0, function* () {
        // const user = await getUsers().then(({data: users}) => {
        //   return users.find(user => user.email === userData.email && user.password === userData.password)
        // });
        return {
            id: "123",
            email: userData.email,
            roles: [],
            apiKey: "123",
            password: "123",
            profile: {
                "name": "Max",
                "company": "Test",
                "dob": "123",
                "address": "123",
                "location": {
                    "lat": 123,
                    "long": 123,
                },
                password: "123",
                username: "123",
                createdAt: "123",
                updatedAt: "123", // Date
            }
        };
        // if (user) {
        //   return user
        // }
        // throw new Error("User doesn't exist")
    });
}
exports.findUser = findUser;
function verifyToken(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
            const user = yield (0, api_1.getUsers)().then(({ data: users }) => {
                // @ts-ignore
                return users.find(user => user.apiKey === req.headers.authorization.split(' ')[1]);
            });
            if (user) {
                req.user = user;
                next();
            }
            else {
                res.status(401)
                    .send({
                    message: 'No user found'
                });
            }
        }
        else {
            res.status(401)
                .send({
                message: 'No auth data'
            });
        }
    });
}
exports.verifyToken = verifyToken;
