"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.performanceLogger = performanceLogger;
const logginService_1 = __importDefault(require("../services/logginService"));
function performanceLogger(req, res, next) {
    const start = process.hrtime();
    res.on('finish', () => {
        const diff = process.hrtime(start);
        const responseTime = diff[0] * 1e3 + diff[1] / 1e6; // em milissegundos
        logginService_1.default.info({
            message: 'Performance log',
            method: req.method,
            url: req.originalUrl,
            status: res.statusCode,
            responseTime: `${responseTime.toFixed(2)}ms`,
        });
    });
    next();
}
