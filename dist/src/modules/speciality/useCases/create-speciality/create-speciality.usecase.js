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
exports.CreateSpecialityUseCase = void 0;
const custom_error_1 = require("../../../../errors/custom.error");
const speciality_entity_1 = require("../../entities/speciality.entity");
class CreateSpecialityUseCase {
    constructor(specialityRepository) {
        this.specialityRepository = specialityRepository;
    }
    execute(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const speciality = new speciality_entity_1.Speciality(data);
            const existSpeciality = yield this.specialityRepository.findByName(data.name);
            if (existSpeciality) {
                throw new custom_error_1.CustomError('Speciality already exists!');
            }
            const specialityCreated = yield this.specialityRepository.save(speciality);
            return specialityCreated;
        });
    }
}
exports.CreateSpecialityUseCase = CreateSpecialityUseCase;
