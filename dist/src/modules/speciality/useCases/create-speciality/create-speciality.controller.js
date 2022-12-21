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
exports.CreateSpecialityController = void 0;
const create_speciality_usecase_1 = require("./create-speciality.usecase");
class CreateSpecialityController {
    constructor(specialityRepository) {
        this.specialityRepository = specialityRepository;
    }
    handle(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const useCase = new create_speciality_usecase_1.CreateSpecialityUseCase(this.specialityRepository);
                const result = yield useCase.execute(request.body);
                return response.json(result);
            }
            catch (err) {
                return response.status(err.statusCode || 400).json({
                    error: err.message,
                });
            }
        });
    }
}
exports.CreateSpecialityController = CreateSpecialityController;
