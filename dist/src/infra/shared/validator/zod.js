"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatorSchema = void 0;
const validation_schema_error_1 = require("../../../errors/validation-schema.error");
const validatorSchema = (schema, payload) => {
    try {
        schema.parse(payload);
    }
    catch (error) {
        const typedError = error;
        const errors = [];
        typedError.errors.forEach((erro) => {
            errors.push({
                field: erro.path,
                message: erro.message,
            });
        });
        throw new validation_schema_error_1.ValidationSchemaError('ERROR_SCHEMA', errors);
    }
};
exports.validatorSchema = validatorSchema;
