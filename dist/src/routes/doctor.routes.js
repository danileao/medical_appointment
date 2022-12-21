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
exports.doctorRouter = void 0;
const express_1 = require("express");
const create_doctor_1 = require("../modules/doctor/useCases/create-doctor");
const doctorRouter = (0, express_1.Router)();
exports.doctorRouter = doctorRouter;
doctorRouter.post('/doctors', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    yield create_doctor_1.createDoctorController.handle(request, response);
}));
