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
exports.appointmentRoutes = void 0;
const express_1 = require("express");
const ensure_authenticate_middleware_1 = require("../infra/shared/http/middleware/ensure-authenticate.middleware");
const create_appointment_1 = require("../modules/appointments/useCases/create-appointment");
const free_schedules_1 = require("../modules/appointments/useCases/free-schedules");
const appointmentRoutes = (0, express_1.Router)();
exports.appointmentRoutes = appointmentRoutes;
appointmentRoutes.get('/appointments/free', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    yield free_schedules_1.freeScheduleController.handle(request, response);
}));
appointmentRoutes.post('/appointments', ensure_authenticate_middleware_1.ensureAuthenticate, (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    yield create_appointment_1.createAppointmentController.handle(request, response);
}));
