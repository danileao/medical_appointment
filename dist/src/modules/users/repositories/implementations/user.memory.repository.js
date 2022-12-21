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
exports.UserMemoryRepository = void 0;
class UserMemoryRepository {
    constructor() {
        this.users = [];
    }
    static getInstance() {
        if (!UserMemoryRepository.instance) {
            UserMemoryRepository.instance = new UserMemoryRepository();
        }
        return UserMemoryRepository.instance;
    }
    findByUsername(username) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.users.find((user) => user.username === username);
        });
    }
    save(data) {
        return __awaiter(this, void 0, void 0, function* () {
            this.users.push(data);
            return data;
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.users.find((user) => user.id === id) || null;
        });
    }
}
exports.UserMemoryRepository = UserMemoryRepository;
