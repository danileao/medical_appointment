"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Appointment = void 0;
const generateUUID_1 = require("../../../utils/generateUUID");
class Appointment {
    constructor(props) {
        this.id = (0, generateUUID_1.generateUUID)();
        this.patientId = props.patientId;
        this.doctorId = props.doctorId;
        this.date = props.date;
    }
    static create(data) {
        const appointmnet = new Appointment(data);
        return appointmnet;
    }
}
exports.Appointment = Appointment;
