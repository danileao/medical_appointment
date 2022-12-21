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
exports.CreateUserController = void 0;
const logger_1 = require("../../../../utils/logger");
const create_user_usecase_1 = require("./create-user.usecase");
class CreateUserController {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    handle(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.logger.info('Usuário sendo criado!');
            try {
                const data = request.body;
                const useCase = new create_user_usecase_1.CreateUserUseCase(this.userRepository);
                const result = yield useCase.execute(data);
                return response.json(result);
            }
            catch (err) {
                logger_1.logger.error(err.stack);
                return response.status(err.statusCode).json({
                    error: err.message,
                });
            }
        });
    }
}
exports.CreateUserController = CreateUserController;
