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
exports.DoctorPrismaRepository = void 0;
const prisma_config_1 = require("../../../../../infra/databases/prisma.config");
const doctor_map_1 = require("../../../mapper/doctor.map");
class DoctorPrismaRepository {
    save(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const doctor = yield prisma_config_1.prismaClient.doctor.create({
                data: {
                    crm: data.crm,
                    email: data.email,
                    speciality_id: data.specialityId,
                    user_id: data.userId,
                },
            });
            return doctor_map_1.DoctorMapper.prismaToEntityDoctor(doctor);
        });
    }
    findByCRM(crm) {
        return __awaiter(this, void 0, void 0, function* () {
            const doctor = yield prisma_config_1.prismaClient.doctor.findUnique({
                where: {
                    crm,
                },
            });
            if (doctor)
                return doctor_map_1.DoctorMapper.prismaToEntityDoctor(doctor);
            return null;
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const doctor = yield prisma_config_1.prismaClient.doctor.findUnique({
                where: {
                    id,
                },
                include: {
                    user: true,
                },
            });
            if (doctor)
                return doctor_map_1.DoctorMapper.prismaToEntityDoctorWithUser(doctor);
            return null;
        });
    }
    findByUserID(userID) {
        return __awaiter(this, void 0, void 0, function* () {
            const doctor = yield prisma_config_1.prismaClient.doctor.findUnique({
                where: {
                    user_id: userID,
                },
            });
            if (doctor)
                return doctor_map_1.DoctorMapper.prismaToEntityDoctor(doctor);
            return null;
        });
    }
}
exports.DoctorPrismaRepository = DoctorPrismaRepository;
