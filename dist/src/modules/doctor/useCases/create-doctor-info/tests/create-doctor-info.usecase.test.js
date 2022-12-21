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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const dayjs_1 = __importDefault(require("dayjs"));
const create_doctor_info_usecase_1 = require("../create-doctor-info.usecase");
const doctor_memory_repository_1 = require("../../../repositories/implementations/in-memory/doctor-memory.repository");
const generateUUID_1 = require("../../../../../utils/generateUUID");
const doctor_info_memory_repository_1 = require("../../../repositories/implementations/in-memory/doctor-info-memory.repository");
(0, vitest_1.describe)('Create Doctor Info', () => {
    (0, vitest_1.test)('Should not be able to create a doctor info if doctor does not exists!', () => {
        const doctorRepository = new doctor_memory_repository_1.DoctorMemoryRepository();
        const doctorInfoRepository = new doctor_info_memory_repository_1.DoctorInfoMemoryRepository();
        const createDoctorInfoUseCase = new create_doctor_info_usecase_1.CreateDoctorInfoUseCase(doctorRepository, doctorInfoRepository);
        const doctorInfo = {
            startAt: (0, dayjs_1.default)().startOf('day').add(10, 'hour').format('HH:mm'),
            endAt: (0, dayjs_1.default)().startOf('day').add(18, 'hour').format('HH:mm'),
            price: 150,
            duration: 10,
        };
        (0, vitest_1.expect)(() => __awaiter(void 0, void 0, void 0, function* () {
            yield createDoctorInfoUseCase.execute(doctorInfo, 'INVALID_USER_ID');
        })).rejects.toThrow('Doctor does not exists!');
    });
    (0, vitest_1.test)('Should not be able to create a doctor info if endAt is before startAt', () => __awaiter(void 0, void 0, void 0, function* () {
        const doctorRepository = new doctor_memory_repository_1.DoctorMemoryRepository();
        const doctorInfoRepository = new doctor_info_memory_repository_1.DoctorInfoMemoryRepository();
        const createDoctorInfoUseCase = new create_doctor_info_usecase_1.CreateDoctorInfoUseCase(doctorRepository, doctorInfoRepository);
        const userId = (0, generateUUID_1.generateUUID)();
        yield doctorRepository.save({
            crm: '123456',
            email: 'doctor@test.com.br',
            id: (0, generateUUID_1.generateUUID)(),
            specialityId: (0, generateUUID_1.generateUUID)(),
            userId,
        });
        const doctorInfo = {
            startAt: (0, dayjs_1.default)().startOf('day').add(18, 'hour').format('HH:mm'),
            endAt: (0, dayjs_1.default)().startOf('day').add(10, 'hour').format('HH:mm'),
            price: 150,
            duration: 10,
        };
        (0, vitest_1.expect)(() => __awaiter(void 0, void 0, void 0, function* () {
            yield createDoctorInfoUseCase.execute(doctorInfo, userId);
        })).rejects.toThrow('End time cannot be earlier than start time!');
    }));
    (0, vitest_1.test)('Should not be able to create a doctor info if endAt is invalid', () => __awaiter(void 0, void 0, void 0, function* () {
        const doctorRepository = new doctor_memory_repository_1.DoctorMemoryRepository();
        const doctorInfoRepository = new doctor_info_memory_repository_1.DoctorInfoMemoryRepository();
        const createDoctorInfoUseCase = new create_doctor_info_usecase_1.CreateDoctorInfoUseCase(doctorRepository, doctorInfoRepository);
        const userId = (0, generateUUID_1.generateUUID)();
        yield doctorRepository.save({
            crm: '123456',
            email: 'doctor@test.com.br',
            id: (0, generateUUID_1.generateUUID)(),
            specialityId: (0, generateUUID_1.generateUUID)(),
            userId,
        });
        const doctorInfo = {
            endAt: '99:99',
            startAt: (0, dayjs_1.default)().startOf('day').add(18, 'hour').format('HH:mm'),
            price: 150,
            duration: 10,
        };
        (0, vitest_1.expect)(() => __awaiter(void 0, void 0, void 0, function* () {
            yield createDoctorInfoUseCase.execute(doctorInfo, userId);
        })).rejects.toThrow('Invalid EndAt');
    }));
    (0, vitest_1.test)('Should not be able to create a doctor info if startAt is invalid', () => __awaiter(void 0, void 0, void 0, function* () {
        const doctorRepository = new doctor_memory_repository_1.DoctorMemoryRepository();
        const doctorInfoRepository = new doctor_info_memory_repository_1.DoctorInfoMemoryRepository();
        const createDoctorInfoUseCase = new create_doctor_info_usecase_1.CreateDoctorInfoUseCase(doctorRepository, doctorInfoRepository);
        const userId = (0, generateUUID_1.generateUUID)();
        yield doctorRepository.save({
            crm: '123456',
            email: 'doctor@test.com.br',
            id: (0, generateUUID_1.generateUUID)(),
            specialityId: (0, generateUUID_1.generateUUID)(),
            userId,
        });
        const doctorInfo = {
            endAt: '18:00',
            startAt: '99:00',
            price: 150,
            duration: 10,
        };
        (0, vitest_1.expect)(() => __awaiter(void 0, void 0, void 0, function* () {
            yield createDoctorInfoUseCase.execute(doctorInfo, userId);
        })).rejects.toThrow('Invalid StartAt');
    }));
    (0, vitest_1.test)('Should be able to create a new doctor info', () => __awaiter(void 0, void 0, void 0, function* () {
        const doctorRepository = new doctor_memory_repository_1.DoctorMemoryRepository();
        const doctorInfoRepository = new doctor_info_memory_repository_1.DoctorInfoMemoryRepository();
        const createDoctorInfoUseCase = new create_doctor_info_usecase_1.CreateDoctorInfoUseCase(doctorRepository, doctorInfoRepository);
        const userId = (0, generateUUID_1.generateUUID)();
        yield doctorRepository.save({
            crm: '123456',
            email: 'doctor@test.com.br',
            id: (0, generateUUID_1.generateUUID)(),
            specialityId: (0, generateUUID_1.generateUUID)(),
            userId,
        });
        const doctorInfo = {
            endAt: '18:00',
            startAt: '10:00',
            price: 150,
            duration: 10,
        };
        const doctorCreated = yield createDoctorInfoUseCase.execute(doctorInfo, userId);
        (0, vitest_1.expect)(doctorCreated).toHaveProperty('id');
    }));
    (0, vitest_1.test)('Should be able to update a exist doctor info', () => __awaiter(void 0, void 0, void 0, function* () {
        const doctorRepository = new doctor_memory_repository_1.DoctorMemoryRepository();
        const doctorInfoRepository = new doctor_info_memory_repository_1.DoctorInfoMemoryRepository();
        const createDoctorInfoUseCase = new create_doctor_info_usecase_1.CreateDoctorInfoUseCase(doctorRepository, doctorInfoRepository);
        const userId = (0, generateUUID_1.generateUUID)();
        yield doctorRepository.save({
            crm: '123456',
            email: 'doctor@test.com.br',
            id: (0, generateUUID_1.generateUUID)(),
            specialityId: (0, generateUUID_1.generateUUID)(),
            userId,
        });
        const doctorInfo = {
            endAt: '18:00',
            startAt: '10:00',
            price: 150,
            duration: 10,
        };
        const doctorCreated = yield createDoctorInfoUseCase.execute(doctorInfo, userId);
        const doctorUpdated = yield createDoctorInfoUseCase.execute(doctorInfo, userId);
        (0, vitest_1.expect)(doctorCreated).toHaveProperty('id');
        (0, vitest_1.expect)(doctorCreated.id).toBe(doctorUpdated.id);
    }));
});
