"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateUUID = void 0;
const crypto_1 = require("crypto");
const generateUUID = () => {
    return (0, crypto_1.randomUUID)();
};
exports.generateUUID = generateUUID;
