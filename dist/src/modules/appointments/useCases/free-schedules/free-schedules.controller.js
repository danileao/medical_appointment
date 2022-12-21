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
exports.FreeSchedulesController = void 0;
const free_schedules_usecase_1 = require("./free-schedules.usecase");
class FreeSchedulesController {
    constructor(doctorScheduleRepository, appointmentRepository) {
        this.doctorScheduleRepository = doctorScheduleRepository;
        this.appointmentRepository = appointmentRepository;
    }
    handle(request, response) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const freeScheduleUseCase = new free_schedules_usecase_1.FreeSchedulesUseCase(this.doctorScheduleRepository, this.appointmentRepository);
            try {
                const result = yield freeScheduleUseCase.execute(request.body);
                return response.json(result);
            }
            catch (err) {
                return response.status((_a = err.statusCode) !== null && _a !== void 0 ? _a : 500).json(err.message);
            }
        });
    }
}
exports.FreeSchedulesController = FreeSchedulesController;
