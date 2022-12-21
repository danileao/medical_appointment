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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FreeSchedulesUseCase = void 0;
const dayjs_1 = __importDefault(require("dayjs"));
const custom_error_1 = require("../../../../errors/custom.error");
const date_1 = require("../../../../utils/date");
class FreeSchedulesUseCase {
    constructor(doctorScheduleRepository, appointmentRepository) {
        this.doctorScheduleRepository = doctorScheduleRepository;
        this.appointmentRepository = appointmentRepository;
    }
    execute(data) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!data.doctorId) {
                throw new custom_error_1.CustomError('Doctor is required', 400);
            }
            if (!data.date) {
                throw new custom_error_1.CustomError('You need to select a date', 400);
            }
            const dayOfWeek = (0, date_1.getDayOfWeek)(data.date);
            const doctorSchedule = yield this.doctorScheduleRepository.findByDoctorIdAndDayOfWeek(data.doctorId, dayOfWeek);
            if (!doctorSchedule) {
                throw new custom_error_1.CustomError('Doctor does not attend that day!');
            }
            const appointmentsByDoctorAndDate = yield this.appointmentRepository.findAllSchedulesByDoctorAndDate(data.doctorId, data.date);
            // 09:00
            /** Duração - 30 minutos
             *
             * [] - 09:00
             *
             * [] - 10:00
             */
            // 18:00
            const startAt = doctorSchedule.startAt;
            const endAt = doctorSchedule.endAt;
            const duration = doctorSchedule.doctor.doctorInfo.duration;
            let timeNow = startAt;
            const freeTime = [];
            while (timeNow <= endAt) {
                // 2022-12-18 09:00
                const existsAppointment = appointmentsByDoctorAndDate.find((appointment) => {
                    const appointmentDateFormat = (0, date_1.formatDate)(appointment.date, 'HH:mm');
                    return appointmentDateFormat === timeNow;
                });
                if (!existsAppointment) {
                    freeTime.push({
                        time: timeNow,
                    });
                }
                timeNow = (0, dayjs_1.default)(data.date + timeNow)
                    .add(duration, 'minute')
                    .format('HH:mm');
            }
            return {
                doctorId: data.doctorId,
                freeTime,
            };
        });
    }
}
exports.FreeSchedulesUseCase = FreeSchedulesUseCase;
