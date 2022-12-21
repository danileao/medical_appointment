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
exports.CreateDoctorController = void 0;
const zod_1 = require("zod");
const create_doctor_usecase_1 = require("./create-doctor.usecase");
const zod_2 = require("../../../../infra/shared/validator/zod");
const validation_schema_error_1 = require("../../../../errors/validation-schema.error");
class CreateDoctorController {
    constructor(userRepository, doctorRepository, specialityRepository) {
        this.userRepository = userRepository;
        this.doctorRepository = doctorRepository;
        this.specialityRepository = specialityRepository;
    }
    handle(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const { body } = request;
            const doctorSchema = zod_1.z.object({
                username: zod_1.z.string(),
                name: zod_1.z.string(),
                email: zod_1.z.string().email({
                    message: 'You need to insert a valid email',
                }),
                password: zod_1.z.string(),
                crm: zod_1.z.string().length(6, {
                    message: 'CRM must contain 6 characters',
                }),
                specialityId: (0, zod_1.string)().uuid({
                    message: 'You need to insert a valid speciality ID',
                }),
            });
            try {
                (0, zod_2.validatorSchema)(doctorSchema, body);
                const createDoctorUseCase = new create_doctor_usecase_1.CreateDoctorUseCase(this.userRepository, this.doctorRepository, this.specialityRepository);
                const doctorCreated = yield createDoctorUseCase.execute(body);
                return response.json(doctorCreated);
            }
            catch (erro) {
                if (erro instanceof validation_schema_error_1.ValidationSchemaError) {
                    return response.status(erro.statusCode).json(erro.errors);
                }
                return response.status(erro.statusCode).json(erro.message);
            }
        });
    }
}
exports.CreateDoctorController = CreateDoctorController;
