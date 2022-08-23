import { User } from "@prisma/client";
import { User as UserEntity } from "../../../entities/user.entity"


export class UserMap {
    static toDomain = (data: User) => {
        const user: UserEntity = {
            id: data.id,
            isAdmin: data.isAdmin,
            name: data.name,
            password: data.password,
            username: data.username
        }

        return user;
    }
}
