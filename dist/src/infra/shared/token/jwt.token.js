"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWTToken = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const crypto_1 = require("crypto");
class JWTToken {
    constructor() {
        this.TOKEN_SECRET = process.env.SECRET_KEY_TOKEN || '';
        this.TOKEN_SECRET_CRYPTO = (0, crypto_1.createHmac)('sha256', this.TOKEN_SECRET).digest('base64');
    }
    create({ username, isAdmin, id }) {
        const token = (0, jsonwebtoken_1.sign)({
            user: {
                username,
                isAdmin,
                id,
            },
        }, this.TOKEN_SECRET_CRYPTO, {
            subject: id,
            expiresIn: '15m',
        });
        return token;
    }
    validate(token) {
        try {
            return (0, jsonwebtoken_1.verify)(token, this.TOKEN_SECRET_CRYPTO);
        }
        catch (err) {
            return null;
        }
    }
}
exports.JWTToken = JWTToken;
