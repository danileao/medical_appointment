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
const vitest_1 = require("vitest");
const create_doctor_usecase_1 = require("../create-doctor.usecase");
const user_memory_repository_1 = require("../../../../users/repositories/implementations/user.memory.repository");
const doctor_memory_repository_1 = require("../../../repositories/implementations/in-memory/doctor-memory.repository");
const speciality_memory_repository_1 = require("../../../../speciality/repositories/implementations/speciality.memory.repository");
const speciality_entity_1 = require("../../../../speciality/entities/speciality.entity");
let specialityRepository;
let speciality;
(0, vitest_1.beforeAll)(() => __awaiter(void 0, void 0, void 0, function* () {
    specialityRepository = new speciality_memory_repository_1.SpecialityMemoryRepository();
    speciality = speciality_entity_1.Speciality.create({
        description: 'DESC_TEST',
        name: 'NAME_TEST',
    });
    yield specialityRepository.save(speciality);
}));
(0, vitest_1.describe)('Create Doctor Use Case', () => {
    (0, vitest_1.test)('Should be able to create a new Doctor', () => __awaiter(void 0, void 0, void 0, function* () {
        const userRepository = new user_memory_repository_1.UserMemoryRepository();
        const doctorRepository = new doctor_memory_repository_1.DoctorMemoryRepository();
        const doctorMock = {
            username: 'username_test',
            name: 'name_test',
            password: 'password_test',
            email: 'email@email.com.br',
            crm: '123456',
            specialityId: speciality.id,
        };
        console.log({ doctorMock });
        const createDoctorUseCase = new create_doctor_usecase_1.CreateDoctorUseCase(userRepository, doctorRepository, specialityRepository);
        const doctorCreated = yield createDoctorUseCase.execute(doctorMock);
        (0, vitest_1.expect)(doctorCreated).toHaveProperty('id');
    }));
    (0, vitest_1.test)('Should not be able to create a new Doctor with exists CRM', () => __awaiter(void 0, void 0, void 0, function* () {
        const userRepository = new user_memory_repository_1.UserMemoryRepository();
        const doctorRepository = new doctor_memory_repository_1.DoctorMemoryRepository();
        const doctorMock = {
            username: 'username_test',
            name: 'name_test',
            password: 'password_test',
            email: 'email@email.com.br',
            crm: '123456',
            specialityId: speciality.id,
        };
        const doctorMockDuplicated = {
            username: 'username_duplicated',
            name: 'name_test',
            password: 'password_test',
            email: 'emailDuplicated@email.com.br',
            crm: '123456',
            specialityId: speciality.id,
        };
        const createDoctorUseCase = new create_doctor_usecase_1.CreateDoctorUseCase(userRepository, doctorRepository, specialityRepository);
        yield createDoctorUseCase.execute(doctorMock);
        (0, vitest_1.expect)(() => __awaiter(void 0, void 0, void 0, function* () {
            yield createDoctorUseCase.execute(doctorMockDuplicated);
        })).rejects.toThrow('CRM already exists');
    }));
    (0, vitest_1.test)('Should not be able to create a new Doctor with exists CRM length invalid', () => __awaiter(void 0, void 0, void 0, function* () {
        const doctorMock = {
            username: 'username_test',
            name: 'name_test',
            password: 'password_test',
            email: 'email@email.com.br',
            crm: '12345',
            specialityId: speciality.id,
        };
        const userRepository = new user_memory_repository_1.UserMemoryRepository();
        const doctorRepository = new doctor_memory_repository_1.DoctorMemoryRepository();
        const createDoctorUseCase = new create_doctor_usecase_1.CreateDoctorUseCase(userRepository, doctorRepository, specialityRepository);
        (0, vitest_1.expect)(() => __awaiter(void 0, void 0, void 0, function* () {
            yield createDoctorUseCase.execute(doctorMock);
        })).rejects.toThrow('CRM length is incorrect!');
    }));
});
