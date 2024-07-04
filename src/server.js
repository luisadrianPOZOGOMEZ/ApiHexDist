"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const body_parser_1 = __importDefault(require("body-parser"));
const express_1 = __importDefault(require("express"));
const Config_1 = require("./Config");
const PublicityRouter_1 = require("./publicity/infrastructure/routes/PublicityRouter");
const UserRouter_1 = require("./user/infrastructure/UserRouter");
function boostrap() {
    const app = (0, express_1.default)();
    app.use(body_parser_1.default.json());
    app.use("/users", UserRouter_1.userRouter);
    app.use("/publicaties", PublicityRouter_1.publicityRouter);
    const { port } = Config_1.config.server;
    app.listen(port, () => {
        console.log(`[APP] - Starting application on port ${port}`);
    });
}
boostrap();
