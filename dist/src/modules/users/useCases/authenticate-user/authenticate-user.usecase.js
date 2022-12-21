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
exports.AuthenticateUserUseCase = void 0;
const custom_error_1 = require("../../../../errors/custom.error");
class AuthenticateUserUseCase {
    /*
    * username
      password
      validar se o usuário existe no sistema
      validar se a senha está correta
  
      mariana
      12345678
      $jsdf92349234jsdfsdf9234j234
  
    */
    constructor(userRepository, passwordCrypto, token) {
        this.userRepository = userRepository;
        this.passwordCrypto = passwordCrypto;
        this.token = token;
    }
    execute({ username, password }) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!username || !password) {
                throw new custom_error_1.CustomError('Username/password incorrect', 401);
            }
            const user = yield this.userRepository.findByUsername(username);
            if (!user) {
                throw new custom_error_1.CustomError('Username/password incorrect', 401);
            }
            const comparePasswordEquals = yield this.passwordCrypto.compare(password, user.password);
            if (!comparePasswordEquals) {
                throw new custom_error_1.CustomError('Username/password incorrect', 401);
            }
            const tokenGenerated = this.token.create(user);
            return tokenGenerated;
        });
    }
}
exports.AuthenticateUserUseCase = AuthenticateUserUseCase;
