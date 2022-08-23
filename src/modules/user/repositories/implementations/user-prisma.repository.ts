import { User } from "../../../../entities/user.entity";
import { prismaClient } from "../../../../shared/database/prisma/config/client";
import { UserMap } from "../../mapper/user-map";
import { IUserRepositoy } from "../user.repository";

export class UserPrismaRepo implements IUserRepositoy {
    async findByUsername(username: string): Promise<User | null> {
        console.log("ss")

        const user = await prismaClient.user.findFirst({
            where: {
                username
            }
        })

        if (!user) return null;

        return UserMap.toDomain(user)



    }
    async save(data: User): Promise<User> {
        const user = await prismaClient.user.create({
            data
        })
        return user;
    }

} 