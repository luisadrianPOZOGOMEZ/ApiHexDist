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
exports.GetByIdUserUseCase = void 0;
class GetByIdUserUseCase {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    run(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepository.getById(userId);
            if (!user) {
                throw new Error(`el Id: ${userId} del usuario no se encontro`);
            }
            console.log(user);
            return this.userRepository.getById(userId);
        });
    }
}
exports.GetByIdUserUseCase = GetByIdUserUseCase;
