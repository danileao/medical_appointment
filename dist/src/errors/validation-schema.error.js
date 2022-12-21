"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationSchemaError = void 0;
class ValidationSchemaError extends Error {
    constructor(message, errors) {
        super(message);
        this.name = 'VALIDATION_SCHEMA_ERROR';
        this.statusCode = 422;
        this.errors = errors;
    }
}
exports.ValidationSchemaError = ValidationSchemaError;
