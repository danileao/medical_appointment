import { CryptInterface } from "../crypt-interface.provider";
import bcrypt from "bcrypt"



export class BCrypt implements CryptInterface {

    hash(value: string): void {
        bcrypt
    }
    compare(first: string, second: string): void {
        throw new Error("Method not implemented.");
    }

}