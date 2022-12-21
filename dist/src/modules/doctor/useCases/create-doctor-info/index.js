"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDoctorInfoController = void 0;
const doctor_info_prisma_repository_1 = require("../../repositories/implementations/prisma/doctor-info.prisma.repository");
const doctor_prisma_repository_1 = require("../../repositories/implementations/prisma/doctor.prisma.repository");
const create_doctor_info_controller_1 = require("./create-doctor-info.controller");
const doctorRepository = new doctor_prisma_repository_1.DoctorPrismaRepository();
const doctorInfoRepository = new doctor_info_prisma_repository_1.DoctorInfoPrismaRepository();
const createDoctorInfoController = new create_doctor_info_controller_1.CreateDoctorInfoController(doctorRepository, doctorInfoRepository);
exports.createDoctorInfoController = createDoctorInfoController;
