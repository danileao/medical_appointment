"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DoctorSchedule = void 0;
const custom_error_1 = require("../../../errors/custom.error");
const date_1 = require("../../../utils/date");
const generateUUID_1 = require("../../../utils/generateUUID");
class DoctorSchedule {
    constructor(props) {
        if (!props.schedules) {
            throw new custom_error_1.CustomError('Invalid schedules', 400);
        }
        validDuplicateSchedules(props.schedules);
        validateTimes(props.schedules);
        this.doctorId = props.doctorId;
        this.schedules = createSchedules(props.schedules);
    }
    static create(data) {
        const doctorSchedule = new DoctorSchedule(data);
        return doctorSchedule;
    }
}
exports.DoctorSchedule = DoctorSchedule;
const validDuplicateSchedules = (schedules) => {
    const hasUniqueValue = new Set(schedules.map((value) => value.dayOfWeek));
    if (hasUniqueValue.size < schedules.length) {
        throw new custom_error_1.CustomError('Duplicate Day of Week', 400);
    }
};
const validateTimes = (schedules) => {
    schedules.forEach((schedule) => {
        if (!(0, date_1.validateTime)(schedule.startAt)) {
            throw new custom_error_1.CustomError('Invalid StartAt');
        }
        if (!(0, date_1.validateTime)(schedule.endAt)) {
            throw new custom_error_1.CustomError('Invalid EndAt');
        }
        if (!(0, date_1.compareEndTimeIsAfter)(schedule.startAt, schedule.endAt)) {
            throw new custom_error_1.CustomError('End time cannot be earlier than start time!');
        }
    });
};
const createSchedules = (schedules) => {
    return schedules.map((schedule) => {
        return Object.assign(Object.assign({}, schedule), { id: (0, generateUUID_1.generateUUID)() });
    });
};
