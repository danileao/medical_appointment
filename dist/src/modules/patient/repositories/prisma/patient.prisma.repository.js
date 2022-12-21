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
exports.PatientPrismaRepository = void 0;
const prisma_config_1 = require("../../../../infra/databases/prisma.config");
const patient_map_1 = require("../../mapper/patient.map");
class PatientPrismaRepository {
    save(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const patient = yield prisma_config_1.prismaClient.patient.create({
                data: patient_map_1.PatientMapper.entityToPrisma(data),
            });
            return patient_map_1.PatientMapper.prismaToEntity(patient);
        });
    }
    findByDocumentOrEmail(document, email) {
        return __awaiter(this, void 0, void 0, function* () {
            const patient = yield prisma_config_1.prismaClient.patient.findFirst({
                where: {
                    OR: [
                        {
                            email: {
                                equals: email,
                            },
                        },
                        {
                            document: {
                                equals: document,
                            },
                        },
                    ],
                },
            });
            if (patient) {
                return patient_map_1.PatientMapper.prismaToEntity(patient);
            }
            return null;
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const patient = yield prisma_config_1.prismaClient.patient.findFirst({
                where: {
                    id,
                },
            });
            if (patient) {
                return patient_map_1.PatientMapper.prismaToEntity(patient);
            }
            return null;
        });
    }
    findByUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const patient = yield prisma_config_1.prismaClient.patient.findFirst({
                where: {
                    user_id: userId,
                },
                include: {
                    user: true,
                },
            });
            if (patient) {
                return patient_map_1.PatientMapper.prismaToEntityIncludesUser(patient);
            }
            return null;
        });
    }
}
exports.PatientPrismaRepository = PatientPrismaRepository;
