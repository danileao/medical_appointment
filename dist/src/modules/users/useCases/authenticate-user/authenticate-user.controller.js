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
exports.AuthenticateUserController = void 0;
const authenticate_user_usecase_1 = require("./authenticate-user.usecase");
class AuthenticateUserController {
    constructor(userRepository, passwordCrypt, token) {
        this.userRepository = userRepository;
        this.passwordCrypt = passwordCrypt;
        this.token = token;
    }
    handle(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = request.body;
                const authenticateUserUseCase = new authenticate_user_usecase_1.AuthenticateUserUseCase(this.userRepository, this.passwordCrypt, this.token);
                const result = yield authenticateUserUseCase.execute(data);
                return response.json(result);
            }
            catch (err) {
                return response.status(err.statusCode).json({
                    error: err.message,
                });
            }
        });
    }
}
exports.AuthenticateUserController = AuthenticateUserController;
