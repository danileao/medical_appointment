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
const user_entity_1 = require("../user.entity");
(0, vitest_1.describe)('User entity', () => {
    (0, vitest_1.test)('Should be able to create a new user', () => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield user_entity_1.User.create({
            name: 'USER_NAME',
            password: 'PASSWORD_TEST',
            username: 'USERNAME',
        });
        console.log({ user });
        (0, vitest_1.expect)(user).toBeInstanceOf(user_entity_1.User);
        (0, vitest_1.expect)(user).toHaveProperty('id');
        (0, vitest_1.expect)(user.password).not.equal('PASSWORD_TEST');
    }));
});
