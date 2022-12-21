"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDoctorScheduleController = void 0;
const doctor_schedule_prisma_repository_1 = require("../../repositories/implementations/prisma/doctor-schedule.prisma.repository");
const doctor_prisma_repository_1 = require("../../repositories/implementations/prisma/doctor.prisma.repository");
const create_doctor_schedule_controller_1 = require("./create-doctor-schedule.controller");
const doctorPrismaRepository = new doctor_prisma_repository_1.DoctorPrismaRepository();
const doctorSchedulePrismaRepository = new doctor_schedule_prisma_repository_1.DoctorSchedulePrismaRepository();
const createDoctorScheduleController = new create_doctor_schedule_controller_1.CreateDoctorScheduleController(doctorPrismaRepository, doctorSchedulePrismaRepository);
exports.createDoctorScheduleController = createDoctorScheduleController;
