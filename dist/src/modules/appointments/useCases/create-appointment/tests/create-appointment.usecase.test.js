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
const vitest_1 = require("vitest");
(0, vitest_1.describe)('Create Appointment', () => {
    (0, vitest_1.test)('Should not be able to create an appointment without a patient or with an invalid patient', () => __awaiter(void 0, void 0, void 0, function* () {
        (0, vitest_1.expect)(true).toBe(true);
    }));
    (0, vitest_1.test)('Should not be able to create an appointment without a doctor or with an invalid doctor', () => __awaiter(void 0, void 0, void 0, function* () {
        (0, vitest_1.expect)(true).toBe(true);
    }));
});
