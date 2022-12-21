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
exports.UserPrismaRepository = void 0;
const prisma_config_1 = require("../../../../infra/databases/prisma.config");
class UserPrismaRepository {
    findByUsername(username) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield prisma_config_1.prismaClient.user.findUnique({
                where: {
                    username,
                },
            });
            return user || undefined;
        });
    }
    save(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield prisma_config_1.prismaClient.user.create({
                data: {
                    name: data.name,
                    password: data.password,
                    username: data.username,
                },
            });
            return user;
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma_config_1.prismaClient.user.findUnique({
                where: {
                    id,
                },
            });
        });
    }
}
exports.UserPrismaRepository = UserPrismaRepository;
