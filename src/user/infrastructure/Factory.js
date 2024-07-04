"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Factory = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const MongoUserRepository_1 = require("./MongoUserRepository");
const MysqlUserRepository_1 = require("./MysqlUserRepository");
dotenv_1.default.config();
const database_selector = process.env.DB_SELECTOR;
class Factory {
    static creteUserRepository() {
        if (database_selector === "mysql") {
            console.log("Modo MySQL");
            return new MysqlUserRepository_1.MysqlUserRepository();
        }
        else if (database_selector === "mongo") {
            console.log("Modo Mongo");
            return new MongoUserRepository_1.MongoUserRepository();
        }
        throw new Error("Unsupported database type");
    }
}
exports.Factory = Factory;
