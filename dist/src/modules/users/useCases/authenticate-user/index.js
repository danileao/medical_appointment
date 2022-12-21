"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateUserController = void 0;
const authenticate_user_controller_1 = require("./authenticate-user.controller");
const password_bcrypt_1 = require("../../../../infra/shared/crypto/password.bcrypt");
const user_prisma_repository_1 = require("../../repositories/implementations/user.prisma.repository");
const jwt_token_1 = require("../../../../infra/shared/token/jwt.token");
const userPrismaRepository = new user_prisma_repository_1.UserPrismaRepository();
const passwordBcrypt = new password_bcrypt_1.PasswordBcrypt();
const token = new jwt_token_1.JWTToken();
const authenticateUserController = new authenticate_user_controller_1.AuthenticateUserController(userPrismaRepository, passwordBcrypt, token);
exports.authenticateUserController = authenticateUserController;