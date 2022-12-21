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
exports.CreateDoctorInfoController = void 0;
const create_doctor_info_usecase_1 = require("./create-doctor-info.usecase");
class CreateDoctorInfoController {
    constructor(doctorRepository, doctorInfoRepository) {
        this.doctorRepository = doctorRepository;
        this.doctorInfoRepository = doctorInfoRepository;
    }
    handle(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const { body, userId } = request;
            const createDoctorInfoUseCase = new create_doctor_info_usecase_1.CreateDoctorInfoUseCase(this.doctorRepository, this.doctorInfoRepository);
            const result = yield createDoctorInfoUseCase.execute(body, userId);
            return response.json(result);
        });
    }
}
exports.CreateDoctorInfoController = CreateDoctorInfoController;
