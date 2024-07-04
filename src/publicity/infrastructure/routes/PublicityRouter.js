"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.publicityRouter = void 0;
const express_1 = __importDefault(require("express"));
const LocalFileStorage_1 = require("../adapters/storages/LocalFileStorage");
const dependencies_1 = require("../dependencies");
const publicityRouter = express_1.default.Router();
exports.publicityRouter = publicityRouter;
publicityRouter.get("/getAll", dependencies_1.publicityController.getAll.bind(dependencies_1.publicityController));
publicityRouter.post("/create", LocalFileStorage_1.upload.single("image"), dependencies_1.publicityController.create.bind(dependencies_1.publicityController));
publicityRouter.get("/:id", dependencies_1.publicityController.getById.bind(dependencies_1.publicityController));
publicityRouter.put("/:id", LocalFileStorage_1.upload.single("image"), dependencies_1.publicityController.update.bind(dependencies_1.publicityController));
publicityRouter.delete("/:id", dependencies_1.publicityController.delete.bind(dependencies_1.publicityController));
