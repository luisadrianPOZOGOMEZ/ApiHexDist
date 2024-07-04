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
class GetByIdPublicityUseCase {
    constructor(publcityRepository) {
        this.publcityRepository = publcityRepository;
    }
    run(publicityId) {
        return __awaiter(this, void 0, void 0, function* () {
            const publicity = yield this.publcityRepository.getById(publicityId);
            if (!publicity) {
                throw new Error(`El id: ${publicityId} de la publicidad no fue encontrada`);
            }
            console.log(publicity);
            return publicity;
        });
    }
}
exports.default = GetByIdPublicityUseCase;
