"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSpecialityController = void 0;
const speciality_prisma_repository_1 = require("../../repositories/implementations/speciality.prisma.repository");
const create_speciality_controller_1 = require("./create-speciality.controller");
const specialityPrismaRepository = new speciality_prisma_repository_1.SpecialityPrismaRepository();
const createSpecialityController = new create_speciality_controller_1.CreateSpecialityController(specialityPrismaRepository);
exports.createSpecialityController = createSpecialityController;
