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
exports.MongoUserRepository = void 0;
const User_1 = require("../domain/User");
const UserSchema_1 = require("./UserSchema");
class MongoUserRepository {
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield UserSchema_1.UserModel.find();
            return users.map((user) => new User_1.User(user.id, user.name, user.age));
        });
    }
    getById(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield UserSchema_1.UserModel.findById(userId);
            if (!user) {
                return null;
            }
            return new User_1.User(user.id, user.name, user.age);
        });
    }
    createUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const newUser = new UserSchema_1.UserModel({
                name: user.name,
                age: user.age,
            });
            const savedUser = yield newUser.save();
            return new User_1.User(savedUser.id, savedUser.name, savedUser.age);
        });
    }
    updateUser(userId, user) {
        return __awaiter(this, void 0, void 0, function* () {
            const updatedUser = yield UserSchema_1.UserModel.findByIdAndUpdate(userId, user, {
                new: true,
            });
            if (!updatedUser) {
                return null;
            }
            return new User_1.User(updatedUser.id, updatedUser.name, updatedUser.age);
        });
    }
    deleteUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield UserSchema_1.UserModel.findByIdAndDelete(userId);
            return result !== null;
        });
    }
}
exports.MongoUserRepository = MongoUserRepository;
exports.default = MongoUserRepository;
