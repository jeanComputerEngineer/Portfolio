"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/services/loggingService.ts
const winston_1 = __importDefault(require("winston"));
const logger = winston_1.default.createLogger({
    level: 'info',
    format: winston_1.default.format.json(),
    transports: [
        new winston_1.default.transports.Console(),
        // Você pode adicionar outros transports, como arquivo ou integração com serviços de monitoramento
    ],
});
exports.default = logger;
