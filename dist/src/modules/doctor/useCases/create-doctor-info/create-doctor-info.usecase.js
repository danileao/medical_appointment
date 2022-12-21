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
exports.CreateDoctorInfoUseCase = void 0;
const custom_error_1 = require("../../../../errors/custom.error");
const doctor_info_entity_1 = require("../../entities/doctor-info.entity");
class CreateDoctorInfoUseCase {
    constructor(doctorRepository, doctorInfoRepository) {
        this.doctorRepository = doctorRepository;
        this.doctorInfoRepository = doctorInfoRepository;
    }
    execute(data, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const doctorByUserID = yield this.doctorRepository.findByUserID(userId);
            if (!doctorByUserID) {
                throw new custom_error_1.CustomError('Doctor does not exists!');
            }
            const doctorInfo = doctor_info_entity_1.DoctorInfo.create(Object.assign(Object.assign({}, data), { doctorId: doctorByUserID.id }));
            const doctorCreated = yield this.doctorInfoRepository.saveOrUpdate(doctorInfo);
            return doctorCreated;
        });
    }
}
exports.CreateDoctorInfoUseCase = CreateDoctorInfoUseCase;
