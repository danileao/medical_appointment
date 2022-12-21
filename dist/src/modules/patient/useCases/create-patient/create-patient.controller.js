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
exports.CreatePatientController = void 0;
const create_patient_usecase_1 = require("./create-patient.usecase");
class CreatePatientController {
    constructor(userRepository, patientRepository) {
        this.userRepository = userRepository;
        this.patientRepository = patientRepository;
    }
    handle(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const createPatientUseCase = new create_patient_usecase_1.CreatePatientUseCase(this.userRepository, this.patientRepository);
                const result = yield createPatientUseCase.execute(request.body);
                return response.json(result);
            }
            catch (err) {
                return response.status(err.statusCode || 400).json(err.message);
            }
        });
    }
}
exports.CreatePatientController = CreatePatientController;
