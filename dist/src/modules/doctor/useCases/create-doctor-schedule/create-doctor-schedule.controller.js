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
exports.CreateDoctorScheduleController = void 0;
const create_doctor_schedule_usecase_1 = require("./create-doctor-schedule.usecase");
class CreateDoctorScheduleController {
    constructor(doctorRepository, doctorScheduleRepository) {
        this.doctorRepository = doctorRepository;
        this.doctorScheduleRepository = doctorScheduleRepository;
    }
    handle(request, response) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const createDoctorScheduleUseCase = new create_doctor_schedule_usecase_1.CreateDoctorScheduleUseCase(this.doctorRepository, this.doctorScheduleRepository);
            try {
                yield createDoctorScheduleUseCase.execute(request.body, request.userId);
                return response.status(204).end();
            }
            catch (err) {
                return response.status((_a = err.statusCode) !== null && _a !== void 0 ? _a : 500).json(err.message);
            }
        });
    }
}
exports.CreateDoctorScheduleController = CreateDoctorScheduleController;
