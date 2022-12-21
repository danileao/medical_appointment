"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Patient = void 0;
const custom_error_1 = require("../../../errors/custom.error");
const generateUUID_1 = require("../../../utils/generateUUID");
class Patient {
    constructor(props) {
        if (!props.email) {
            throw new custom_error_1.CustomError('Email is required!');
        }
        if (!props.document || props.document.length <= 5) {
            throw new custom_error_1.CustomError('Invalid Document');
        }
        this.userId = props.userId;
        this.email = props.email;
        this.document = props.document;
        this.id = (0, generateUUID_1.generateUUID)();
    }
    static create(data) {
        const patient = new Patient(data);
        return patient;
    }
}
exports.Patient = Patient;
