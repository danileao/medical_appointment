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
exports.DoctorInfoMemoryRepository = void 0;
class DoctorInfoMemoryRepository {
    constructor() {
        this.items = [];
    }
    saveOrUpdate(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const index = this.items.findIndex((doctor) => doctor.doctorId == data.doctorId);
            if (index >= 0) {
                const doctor = this.items[index];
                this.items[index] = Object.assign(Object.assign({}, doctor), { duration: data.duration, price: data.price });
                data = this.items[index];
            }
            else {
                this.items.push(data);
            }
            return data;
        });
    }
}
exports.DoctorInfoMemoryRepository = DoctorInfoMemoryRepository;
