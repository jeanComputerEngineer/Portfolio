"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.securityMiddleware = void 0;
// src/middlewares/securityMiddleware.ts
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const csurf_1 = __importDefault(require("csurf"));
exports.securityMiddleware = [
    (0, helmet_1.default)(), // Define diversos headers de segurança
    (0, cors_1.default)({
        origin: process.env.CORS_ORIGIN || "https://chatbot.jeanhenrique.site",
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept"],
        credentials: true,
    }),
    (0, csurf_1.default)({ cookie: true }), // Protege contra CSRF
];
