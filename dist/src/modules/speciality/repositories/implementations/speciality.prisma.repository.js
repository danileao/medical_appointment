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
exports.SpecialityPrismaRepository = void 0;
const prisma_config_1 = require("../../../../infra/databases/prisma.config");
class SpecialityPrismaRepository {
    save(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const speciality = yield prisma_config_1.prismaClient.speciality.create({
                data: {
                    name: data.name,
                    description: data.description,
                    id: data.id,
                },
            });
            return speciality;
        });
    }
    findByName(name) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma_config_1.prismaClient.speciality.findUnique({
                where: {
                    name,
                },
            });
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma_config_1.prismaClient.speciality.findUnique({
                where: {
                    id,
                },
            });
        });
    }
}
exports.SpecialityPrismaRepository = SpecialityPrismaRepository;
