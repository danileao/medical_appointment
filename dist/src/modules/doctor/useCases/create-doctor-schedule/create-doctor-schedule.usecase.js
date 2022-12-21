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
exports.CreateDoctorScheduleUseCase = void 0;
const custom_error_1 = require("../../../../errors/custom.error");
const doctor_schedule_entity_1 = require("../../entities/doctor-schedule.entity");
class CreateDoctorScheduleUseCase {
    constructor(doctorRepository, doctorScheduleRepository) {
        this.doctorRepository = doctorRepository;
        this.doctorScheduleRepository = doctorScheduleRepository;
    }
    execute(data, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const doctor = yield this.doctorRepository.findByUserID(userId);
            if (!doctor) {
                throw new custom_error_1.CustomError('Doctor does not exists!', 400);
            }
            const doctorSchedule = doctor_schedule_entity_1.DoctorSchedule.create({
                schedules: data.schedules,
                doctorId: doctor.id,
            });
            yield this.doctorScheduleRepository.save(doctorSchedule);
        });
    }
}
exports.CreateDoctorScheduleUseCase = CreateDoctorScheduleUseCase;
