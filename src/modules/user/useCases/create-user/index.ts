import { UserPrismaRepo } from "../../repositories/implementations/user-prisma.repository";
import { CreateUserController } from "./create-user.controller";
import { CreateUserUseCase } from "./create-user.usecase";


const userPrismaRepo = new UserPrismaRepo()

const createUseCase = new CreateUserUseCase(userPrismaRepo)

const createUserController = new CreateUserController(createUseCase);


export { createUserController };
