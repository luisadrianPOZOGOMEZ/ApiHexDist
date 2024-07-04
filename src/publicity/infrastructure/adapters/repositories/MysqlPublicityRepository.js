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
exports.MysqlPublicityRepository = void 0;
const Publicity_1 = require("../../../domain/Publicity");
const MySql_1 = require("../../databases/MySql");
class MysqlPublicityRepository {
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = "SELECT * FROM publicity";
            const rows = (yield (0, MySql_1.query)(sql, [])); // Ajuste de tipo aquí
            return rows.map((row) => new Publicity_1.Publicity(row.id, row.description, row.image, row.image_s3));
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = "SELECT * FROM publicity WHERE id = ?";
            const params = [id];
            const [rows] = yield (0, MySql_1.query)(sql, params);
            if (!rows) {
                return null;
            }
            const row = rows[0];
            return new Publicity_1.Publicity(row.id, row.description, row.image, row.image_s3);
        });
    }
    createPublicity(publicity) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = "INSERT INTO publicity (description, image, image_s3) VALUES (?, ?, ?)";
            const params = [publicity.description, publicity.image, publicity.image_s3];
            const result = yield (0, MySql_1.query)(sql, params);
            return new Publicity_1.Publicity(result.insertId, publicity.description, publicity.image, publicity.image_s3);
        });
    }
    updatePublicity(id, publicity) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = `UPDATE publications SET 
                    description = COALESCE(?, description), 
                    image = COALESCE(?, image), 
                    image_s3 = COALESCE(?, image_s3) 
                    WHERE id = ?`;
            const params = [
                publicity.description,
                publicity.image,
                publicity.image_s3,
                id,
            ];
            const result = yield (0, MySql_1.query)(sql, params);
            if (result.affectedRows === 0) {
                return null;
            }
            return yield this.getById(id);
        });
    }
    deletePublicity(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = "DELETE FROM publicity WHERE id = ?";
            const params = [id];
            const result = yield (0, MySql_1.query)(sql, params);
            return result.affectedRows > 0;
        });
    }
}
exports.MysqlPublicityRepository = MysqlPublicityRepository;
