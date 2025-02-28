"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.securityMiddleware = void 0;
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const csurf_1 = __importDefault(require("csurf"));
const securityMiddleware = (app) => {
    app.use((0, helmet_1.default)());
    app.use((0, cookie_parser_1.default)());
    app.use((0, cors_1.default)({
        origin: "http://localhost:3000", // ou o endereço do seu frontend
        credentials: true,
    }));
    app.use(express_1.default.json());
    // Aplique o csurf depois de cookieParser e express.json
    app.use((0, csurf_1.default)({ cookie: true }));
};
exports.securityMiddleware = securityMiddleware;
