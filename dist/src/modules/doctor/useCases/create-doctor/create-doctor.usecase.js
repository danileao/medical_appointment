"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateDoctorUseCase = void 0;
const custom_error_1 = require("../../../../errors/custom.error");
const user_entity_1 = require("../../../users/entities/user.entity");
const doctor_entity_1 = require("../../entities/doctor.entity");
class CreateDoctorUseCase {
    constructor(userRepository, doctorRepository, specialityRepository) {
        this.userRepository = userRepository;
        this.doctorRepository = doctorRepository;
        this.specialityRepository = specialityRepository;
    }
    execute(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_entity_1.User.create({
                name: data.name,
                password: data.password,
                username: data.username,
            });
            const speciality = yield this.specialityRepository.findById(data.specialityId);
            if (!speciality) {
                throw new custom_error_1.CustomError('Speciality does not exists!', 400);
            }
            const existUser = yield this.userRepository.findByUsername(data.username);
            if (existUser) {
                throw new custom_error_1.CustomError('Username already exists', 400, 'USER_EXISTS_ERROR');
            }
            const userCreated = yield this.userRepository.save(user);
            // Verificação da especialidade
            const doctor = doctor_entity_1.Doctor.create({
                crm: data.crm,
                email: data.email,
                specialityId: data.specialityId,
                userId: userCreated.id,
            });
            const crmExists = yield this.doctorRepository.findByCRM(data.crm);
            if (crmExists) {
                throw new custom_error_1.CustomError('CRM already exists', 400);
            }
            const doctorCreated = yield this.doctorRepository.save(doctor);
            return doctorCreated;
        });
    }
}
exports.CreateDoctorUseCase = CreateDoctorUseCase;
