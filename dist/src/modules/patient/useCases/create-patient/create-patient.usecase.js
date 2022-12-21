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
exports.CreatePatientUseCase = void 0;
const custom_error_1 = require("../../../../errors/custom.error");
const user_entity_1 = require("../../../users/entities/user.entity");
const patient_entity_1 = require("../../entities/patient.entity");
class CreatePatientUseCase {
    constructor(userRepository, patientRepository) {
        this.userRepository = userRepository;
        this.patientRepository = patientRepository;
    }
    execute(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_entity_1.User.create({
                name: data.name,
                password: data.password,
                username: data.username,
            });
            const existUser = yield this.userRepository.findByUsername(data.username);
            if (existUser) {
                throw new custom_error_1.CustomError('Username already exists', 400, 'USER_EXISTS_ERROR');
            }
            const existPatient = yield this.patientRepository.findByDocumentOrEmail(data.document, data.email);
            if (existPatient) {
                throw new custom_error_1.CustomError('Patient already exists!');
            }
            const userCreated = yield this.userRepository.save(user);
            const patient = patient_entity_1.Patient.create({
                document: data.document,
                email: data.email,
                userId: userCreated.id,
            });
            const patientCreated = yield this.patientRepository.save(patient);
            return patientCreated;
        });
    }
}
exports.CreatePatientUseCase = CreatePatientUseCase;
