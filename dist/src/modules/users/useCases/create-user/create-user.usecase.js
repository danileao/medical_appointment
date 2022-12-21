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
exports.CreateUserUseCase = void 0;
const custom_error_1 = require("../../../../errors/custom.error");
const parameter_required_error_1 = require("../../../../errors/parameter-required.error");
const user_entity_1 = require("../../entities/user.entity");
class CreateUserUseCase {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    execute(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_entity_1.User.create(data);
            if (!data.username || !data.password) {
                throw new parameter_required_error_1.ParameterRequiredError('Username/password is required.', 422);
            }
            const existUser = yield this.userRepository.findByUsername(data.username);
            if (existUser) {
                throw new custom_error_1.CustomError('Username already exists', 400, 'USER_EXISTS_ERROR');
            }
            const userCreated = yield this.userRepository.save(user);
            return userCreated;
        });
    }
}
exports.CreateUserUseCase = CreateUserUseCase;
