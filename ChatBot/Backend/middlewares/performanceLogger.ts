// src/middlewares/performanceLogger.ts
import { Request, Response, NextFunction } from 'express';
import logger from '../services/logginService';

export function performanceLogger(req: Request, res: Response, next: NextFunction) {
    const start = process.hrtime();

    res.on('finish', () => {
        const diff = process.hrtime(start);
        const responseTime = diff[0] * 1e3 + diff[1] / 1e6; // em milissegundos
        logger.info({
            message: 'Performance log',
            method: req.method,
            url: req.originalUrl,
            status: res.statusCode,
            responseTime: `${responseTime.toFixed(2)}ms`,
        });
    });

    next();
}
