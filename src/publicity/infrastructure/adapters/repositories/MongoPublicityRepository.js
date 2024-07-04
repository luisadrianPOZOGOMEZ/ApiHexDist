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
exports.MongoPublicityRepository = void 0;
const Publicity_1 = require("../../../domain/Publicity");
const PublicitySchema_1 = require("../../PublicitySchema");
class MongoPublicityRepository {
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const publicity = yield PublicitySchema_1.PublicityModel.find();
            return publicity.map((pub) => new Publicity_1.Publicity(pub.id, pub.description, pub.image, pub.image_s3));
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const publicity = yield PublicitySchema_1.PublicityModel.findById(id);
            return publicity
                ? new Publicity_1.Publicity(publicity.id, publicity.description, publicity.image, publicity.image_s3)
                : null;
        });
    }
    createPublicity(publicity) {
        return __awaiter(this, void 0, void 0, function* () {
            const newPublicity = new PublicitySchema_1.PublicityModel(publicity);
            const savedPublicity = yield newPublicity.save();
            return new Publicity_1.Publicity(savedPublicity.id, savedPublicity.description, savedPublicity.image, savedPublicity.image_s3);
        });
    }
    updatePublicity(id, publicity) {
        return __awaiter(this, void 0, void 0, function* () {
            const updatePublicity = yield PublicitySchema_1.PublicityModel.findByIdAndUpdate(id, publicity, { new: true });
            return updatePublicity
                ? new Publicity_1.Publicity(updatePublicity.id, updatePublicity.description, updatePublicity.image, updatePublicity.image_s3)
                : null;
        });
    }
    deletePublicity(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield PublicitySchema_1.PublicityModel.findByIdAndDelete(id);
            return result !== null;
        });
    }
}
exports.MongoPublicityRepository = MongoPublicityRepository;
