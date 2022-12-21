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
exports.ensureAdmin = void 0;
const user_prisma_repository_1 = require("../../../../modules/users/repositories/implementations/user.prisma.repository");
const ensureAdmin = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userRepository = new user_prisma_repository_1.UserPrismaRepository();
    const user = yield userRepository.findById(request.userId);
    if (!user) {
        return response.status(400).json({ message: 'User does not exists!' });
    }
    if (!user.isAdmin) {
        return response.status(401).json({ message: 'User is not admin!' });
    }
    return next();
});
exports.ensureAdmin = ensureAdmin;
