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
exports.User = void 0;
const crypto_1 = require("crypto");
const parameter_required_error_1 = require("../../../errors/parameter-required.error");
const password_bcrypt_1 = require("../../../infra/shared/crypto/password.bcrypt");
class User {
    constructor(props) {
        if (!props.username || !props.password) {
            throw new parameter_required_error_1.ParameterRequiredError('Username/password is required.', 422);
        }
        this.name = props.name;
        this.username = props.username;
        this.password = props.password;
        this.id = (0, crypto_1.randomUUID)();
        this.isAdmin = false;
    }
    static create(props) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!props.password) {
                throw new parameter_required_error_1.ParameterRequiredError('Username/password is required.', 422);
            }
            const bcrypt = new password_bcrypt_1.PasswordBcrypt();
            const passwordHashed = yield bcrypt.hash(props.password);
            props.password = passwordHashed;
            const user = new User(props);
            return user;
        });
    }
}
exports.User = User;
