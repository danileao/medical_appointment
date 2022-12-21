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
exports.DoctorSchedulePrismaRepository = void 0;
const prisma_config_1 = require("../../../../../infra/databases/prisma.config");
const doctor_schedule_map_1 = require("../../../mapper/doctor-schedule.map");
class DoctorSchedulePrismaRepository {
    save(data) {
        return __awaiter(this, void 0, void 0, function* () {
            yield prisma_config_1.prismaClient.$transaction([
                prisma_config_1.prismaClient.doctorSchedules.deleteMany({
                    where: {
                        doctor_id: data.doctorId,
                    },
                }),
                prisma_config_1.prismaClient.doctorSchedules.createMany({
                    data: doctor_schedule_map_1.DoctorScheduleMapper.entityToPrisma(data),
                }),
            ]);
        });
    }
    findByDoctorIdAndDayOfWeek(doctorId, dayOfWeek) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield prisma_config_1.prismaClient.doctorSchedules.findFirst({
                where: {
                    day_of_week: dayOfWeek,
                    AND: {
                        doctor_id: doctorId,
                    },
                },
                include: {
                    doctor: {
                        include: {
                            doctorInfo: true,
                        },
                    },
                },
            });
            console.log({ result });
            if (result)
                return doctor_schedule_map_1.DoctorScheduleMapper.prismaToEntity(result);
            return null;
        });
    }
}
exports.DoctorSchedulePrismaRepository = DoctorSchedulePrismaRepository;
