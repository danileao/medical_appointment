"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParameterRequiredError = void 0;
class ParameterRequiredError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.name = 'PARAMETER_REQUIRED_ERROR';
        this.statusCode = statusCode;
    }
}
exports.ParameterRequiredError = ParameterRequiredError;
