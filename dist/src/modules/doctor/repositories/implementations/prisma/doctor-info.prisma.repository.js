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
exports.DoctorInfoPrismaRepository = void 0;
const prisma_config_1 = require("../../../../../infra/databases/prisma.config");
const doctor_info_map_1 = require("../../../mapper/doctor-info.map");
class DoctorInfoPrismaRepository {
    saveOrUpdate(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const doctor = yield prisma_config_1.prismaClient.doctorInfo.upsert({
                where: { doctor_id: data.doctorId },
                create: {
                    duration: data.duration,
                    price: data.price,
                    doctor_id: data.doctorId,
                    id: data.id,
                },
                update: {
                    duration: data.duration,
                    price: data.price,
                },
            });
            return doctor_info_map_1.DoctorInfoMapper.prismaToEntityDoctorInfo(doctor);
        });
    }
}
exports.DoctorInfoPrismaRepository = DoctorInfoPrismaRepository;
