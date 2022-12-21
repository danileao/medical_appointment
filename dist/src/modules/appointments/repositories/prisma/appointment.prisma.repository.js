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
exports.AppointmentPrismaRepository = void 0;
const prisma_config_1 = require("../../../../infra/databases/prisma.config");
class AppointmentPrismaRepository {
    findAllSchedulesByDoctorAndDate(doctorId, date) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma_config_1.prismaClient.$queryRaw `
      SELECT ap.date from appointments ap  where to_char(ap.date, 'YYYY-MM-DD') = ${date} 
      and doctor_id = ${doctorId}
    `;
        });
    }
    findAppointmentByDoctorAndDatetime(doctorId, date) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield prisma_config_1.prismaClient.$queryRaw `
    SELECT ap.date from appointments ap  where to_char(ap.date, 'YYYY-MM-DD HH24:MI') = ${date} 
    and doctor_id = ${doctorId} limit 1
  `;
            return result[0];
        });
    }
    findAppointmentByPatientAndDatetime(patientId, date) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield prisma_config_1.prismaClient.$queryRaw `
    SELECT ap.date from appointments ap  where to_char(ap.date, 'YYYY-MM-DD HH24:MI') = ${date} 
    and patient_id = ${patientId} limit 1
  `;
            return result[0];
        });
    }
    save(data) {
        return __awaiter(this, void 0, void 0, function* () {
            yield prisma_config_1.prismaClient.appointment.create({
                data: {
                    date: data.date,
                    doctor_id: data.doctorId,
                    patient_id: data.patientId,
                    id: data.id,
                },
            });
        });
    }
}
exports.AppointmentPrismaRepository = AppointmentPrismaRepository;
