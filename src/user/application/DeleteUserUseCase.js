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
class DeleteUserUseCase {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    execute(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.userRepository.deleteUser(userId);
            if (!result) {
                throw new Error(`No se pudo eliminar a el usuario con el Id ${userId}`);
            }
            console.log(`El usuario: ${userId} se ha eliminado con exito`);
            return result;
        });
    }
}
exports.default = DeleteUserUseCase;
