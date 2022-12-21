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
exports.specialityRouter = void 0;
const express_1 = require("express");
const ensure_admin_middleware_1 = require("../infra/shared/http/middleware/ensure-admin.middleware");
const ensure_authenticate_middleware_1 = require("../infra/shared/http/middleware/ensure-authenticate.middleware");
const create_speciality_1 = require("../modules/speciality/useCases/create-speciality");
const specialityRouter = (0, express_1.Router)();
exports.specialityRouter = specialityRouter;
specialityRouter.post('/specialities', ensure_authenticate_middleware_1.ensureAuthenticate, ensure_admin_middleware_1.ensureAdmin, (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    yield create_speciality_1.createSpecialityController.handle(request, response);
}));
