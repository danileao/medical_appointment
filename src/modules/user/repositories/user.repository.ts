import { User } from "../../../entities/user.entity";



export interface IUserRepositoy {
    findByUsername(username: string): Promise<User | null>
    save(data: User): Promise<User>
}