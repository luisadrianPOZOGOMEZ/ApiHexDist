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
exports.MysqlUserRepository = void 0;
const User_1 = require("../domain/User");
const MySql_1 = require("./MySql");
class MysqlUserRepository {
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = "SELECT * FROM users";
            const rows = (yield (0, MySql_1.query)(sql, []));
            console.log("=>", rows);
            return rows.map((row) => new User_1.User(row.id, row.name, row.age));
        });
    }
    createUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = "INSERT INTO users (name, age) VALUES (?, ?)";
            const params = [user.name, user.age];
            try {
                const result = yield (0, MySql_1.query)(sql, params);
                return new User_1.User(result.insertId, user.name, user.age);
            }
            catch (error) {
                console.error("Error creating user:", error);
                throw new Error("Could not create user");
            }
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = "SELECT * FROM users WHERE id = ?";
            const params = [id];
            const rows = (yield (0, MySql_1.query)(sql, params));
            if (rows.length === 0) {
                return null;
            }
            const row = rows[0];
            const user = new User_1.User(row.id, row.name, row.age);
            console.log(user);
            return user;
        });
    }
    updateUser(userId, newUser) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = "UPDATE users SET name=?, age=? WHERE id = ?";
            const params = [newUser.name, newUser.age, userId];
            const result = yield (0, MySql_1.query)(sql, params);
            if ((result.affectedRows = 0)) {
                return null;
            }
            return yield this.getById(userId);
        });
    }
    deleteUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = "DELETE FROM users WHERE id = ?";
            const params = [id];
            try {
                const result = yield (0, MySql_1.query)(sql, params);
                return result.affectedRows > 0;
            }
            catch (error) {
                console.error(`Error al borrar al usuario con el ID ${id}:`, error);
                throw new Error(`No se puso borrar al usuario con el ID ${id}`);
            }
        });
    }
}
exports.MysqlUserRepository = MysqlUserRepository;
