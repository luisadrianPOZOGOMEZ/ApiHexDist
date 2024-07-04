"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = __importDefault(require("express"));
const dependencies_1 = require("./dependencies");
exports.userRouter = express_1.default.Router();
exports.userRouter.get("/getAll", dependencies_1.getAllUserController.getAll.bind(dependencies_1.getAllUserController));
exports.userRouter.get("/:id", dependencies_1.getByIdUserController.getById.bind(dependencies_1.getByIdUserController));
exports.userRouter.post("/create", dependencies_1.createUserController.createUser.bind(dependencies_1.createUserController));
exports.userRouter.put("/:id", dependencies_1.updateUserController.updateUser.bind(dependencies_1.updateUserController));
exports.userRouter.delete("/:id", dependencies_1.deleteUserController.deleteUser.bind(dependencies_1.deleteUserController));
