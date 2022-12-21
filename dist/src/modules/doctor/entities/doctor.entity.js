"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Doctor = void 0;
const crypto_1 = require("crypto");
const custom_error_1 = require("../../../errors/custom.error");
class Doctor {
    constructor(props) {
        if (!props.crm) {
            throw new custom_error_1.CustomError('CRM is required!');
        }
        if (props.crm.length !== 6) {
            throw new custom_error_1.CustomError('CRM length is incorrect!');
        }
        if (!props.email) {
            throw new custom_error_1.CustomError('Email is required!');
        }
        this.id = (0, crypto_1.randomUUID)();
        this.crm = props.crm;
        this.email = props.email;
        this.userId = props.userId;
        this.specialityId = props.specialityId;
    }
    static create(props) {
        const doctor = new Doctor(props);
        return doctor;
    }
}
exports.Doctor = Doctor;
