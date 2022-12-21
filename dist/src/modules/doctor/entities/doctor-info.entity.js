"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DoctorInfo = void 0;
const custom_error_1 = require("../../../errors/custom.error");
const generateUUID_1 = require("../../../utils/generateUUID");
class DoctorInfo {
    constructor(props) {
        if (!props.doctorId) {
            throw new custom_error_1.CustomError('Doctor does not exists!');
        }
        if (props.duration <= 0) {
            throw new custom_error_1.CustomError('Invalid duration!');
        }
        this.id = (0, generateUUID_1.generateUUID)();
        this.duration = props.duration;
        this.price = props.price;
        this.doctorId = props.doctorId;
    }
    static create(data) {
        const doctorInfo = new DoctorInfo(data);
        return doctorInfo;
    }
}
exports.DoctorInfo = DoctorInfo;
