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
exports.userRouter = void 0;
const express_1 = require("express");
const authenticate_user_1 = require("../modules/users/useCases/authenticate-user");
const create_user_1 = require("../modules/users/useCases/create-user");
const userRouter = (0, express_1.Router)();
exports.userRouter = userRouter;
userRouter.post('/login', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    yield authenticate_user_1.authenticateUserController.handle(request, response);
}));
userRouter.post('/users', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    yield create_user_1.createUserController.handle(request, response);
}));
