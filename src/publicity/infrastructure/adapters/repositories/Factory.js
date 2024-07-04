"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Factory = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const MongoPublicityRepository_1 = require("./MongoPublicityRepository");
const MysqlPublicityRepository_1 = require("./MysqlPublicityRepository");
dotenv_1.default.config();
const db_selector = process.env.DB_SELECTOR;
class Factory {
    static createPublicityRepository() {
        if (db_selector === "mysql") {
            console.log("Modo MySQL");
            return new MysqlPublicityRepository_1.MysqlPublicityRepository();
        }
        else if (db_selector === "mongo") {
            console.log("Modo Mongo");
            return new MongoPublicityRepository_1.MongoPublicityRepository();
        }
        throw new Error("Unsupported database type");
    }
}
exports.Factory = Factory;
