"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserController = exports.getByIdUserController = exports.getAllUserController = exports.deleteUserController = exports.createUserController = exports.deleteUser = exports.updateUser = exports.getById = exports.createUserUseCase = exports.getAllUserUserCase = void 0;
const CreateUserUseCase_1 = __importDefault(require("../application/CreateUserUseCase"));
const DeleteUserUseCase_1 = __importDefault(require("../application/DeleteUserUseCase"));
const GetAllUserUseCase_1 = __importDefault(require("../application/GetAllUserUseCase"));
const GetByIdUserUseCase_1 = require("../application/GetByIdUserUseCase");
const UpdateUserUseCase_1 = __importDefault(require("../application/UpdateUserUseCase"));
const CreateUserController_1 = __importDefault(require("./Controllers/CreateUserController"));
const DeleteUserController_1 = __importDefault(require("./Controllers/DeleteUserController"));
const GetAllUserController_1 = __importDefault(require("./Controllers/GetAllUserController"));
const GetByIdUserController_1 = __importDefault(require("./Controllers/GetByIdUserController"));
const UpdateUserController_1 = __importDefault(require("./Controllers/UpdateUserController"));
const Factory_1 = require("./Factory");
const userFactoryRepository = Factory_1.Factory.creteUserRepository(); // Esta implemeta el userRepository que necesita el caso de uso
exports.getAllUserUserCase = new GetAllUserUseCase_1.default(userFactoryRepository);
exports.createUserUseCase = new CreateUserUseCase_1.default(userFactoryRepository);
exports.getById = new GetByIdUserUseCase_1.GetByIdUserUseCase(userFactoryRepository);
exports.updateUser = new UpdateUserUseCase_1.default(userFactoryRepository);
exports.deleteUser = new DeleteUserUseCase_1.default(userFactoryRepository);
exports.createUserController = new CreateUserController_1.default(exports.createUserUseCase);
exports.deleteUserController = new DeleteUserController_1.default(exports.deleteUser);
exports.getAllUserController = new GetAllUserController_1.default(exports.getAllUserUserCase);
exports.getByIdUserController = new GetByIdUserController_1.default(exports.getById);
exports.updateUserController = new UpdateUserController_1.default(exports.updateUser);
