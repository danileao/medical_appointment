"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DoctorScheduleMapper = void 0;
const generateUUID_1 = require("../../../utils/generateUUID");
class DoctorScheduleMapper {
}
exports.DoctorScheduleMapper = DoctorScheduleMapper;
DoctorScheduleMapper.entityToPrisma = (data) => {
    const doctorSchedulePrisma = [];
    data.schedules.forEach((schedule) => {
        var _a;
        doctorSchedulePrisma.push({
            day_of_week: schedule.dayOfWeek,
            doctor_id: data.doctorId,
            end_at: schedule.endAt,
            start_at: schedule.startAt,
            id: (_a = schedule.id) !== null && _a !== void 0 ? _a : (0, generateUUID_1.generateUUID)(),
        });
    });
    return doctorSchedulePrisma;
};
DoctorScheduleMapper.prismaToEntity = (schedule) => {
    var _a;
    return {
        doctorId: schedule.doctor_id,
        startAt: schedule.start_at,
        endAt: schedule.end_at,
        dayOfWeek: schedule.day_of_week,
        doctor: {
            doctorInfo: {
                duration: ((_a = schedule.doctor.doctorInfo) === null || _a === void 0 ? void 0 : _a.duration) || 0,
            },
        },
    };
};
