"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomError = void 0;
class CustomError extends Error {
    constructor(message, statusCode = 500, name = '') {
        super(message);
        this.name = name;
        this.statusCode = statusCode;
    }
}
exports.CustomError = CustomError;
