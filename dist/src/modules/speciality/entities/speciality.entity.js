"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Speciality = void 0;
const crypto_1 = require("crypto");
class Speciality {
    constructor({ name, description }) {
        this.name = name;
        this.description = description;
        this.createdAt = new Date();
        this.id = (0, crypto_1.randomUUID)();
    }
    static create(props) {
        if (!props.name) {
            throw new Error('Speciality name is required!');
        }
        const speciality = new Speciality(props);
        return speciality;
    }
}
exports.Speciality = Speciality;
