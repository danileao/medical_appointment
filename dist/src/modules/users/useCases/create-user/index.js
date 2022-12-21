"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserController = void 0;
const user_prisma_repository_1 = require("../../repositories/implementations/user.prisma.repository");
const create_user_controller_1 = require("./create-user.controller");
const userPrismaRepository = new user_prisma_repository_1.UserPrismaRepository();
const createUserController = new create_user_controller_1.CreateUserController(userPrismaRepository);
exports.createUserController = createUserController;
