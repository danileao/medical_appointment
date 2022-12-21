"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const doctor_entity_1 = require("../doctor.entity");
(0, vitest_1.describe)('Doctor entity', () => {
    (0, vitest_1.test)('Should be able to create a new doctor', () => {
        const doctor = doctor_entity_1.Doctor.create({
            crm: '123456',
            email: 'email@email.com',
            specialityId: 'SPEC_ID',
            userId: 'USER_ID',
        });
        (0, vitest_1.expect)(doctor).toBeInstanceOf(doctor_entity_1.Doctor);
        (0, vitest_1.expect)(doctor).toHaveProperty('id');
    });
    (0, vitest_1.test)('Should not be able to create a new doctor with CRM invalid', () => {
        (0, vitest_1.expect)(() => {
            doctor_entity_1.Doctor.create({
                crm: '',
                email: 'email@email.com',
                specialityId: 'SPEC_ID',
                userId: 'USER_ID',
            });
        }).toThrow('CRM is required!');
    });
    (0, vitest_1.test)('Should not be able to create a new doctor with CRM length invalid', () => {
        (0, vitest_1.expect)(() => {
            doctor_entity_1.Doctor.create({
                crm: '12345',
                email: 'email@email.com',
                specialityId: 'SPEC_ID',
                userId: 'USER_ID',
            });
        }).toThrow('CRM length is incorrect!');
    });
    (0, vitest_1.test)('Should not be able to create a new doctor with Email invalid', () => {
        (0, vitest_1.expect)(() => {
            doctor_entity_1.Doctor.create({
                crm: '123456',
                email: '',
                specialityId: 'SPEC_ID',
                userId: 'USER_ID',
            });
        }).toThrow('Email is required!');
    });
});
