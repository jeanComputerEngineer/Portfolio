import helmet from "helmet";
import cors from "cors";
import csurf from "csurf";
import express from "express";

export const securityMiddleware = (app: express.Application) => {
    app.use(helmet());
    app.use(cors());
    app.use(express.json());
    // Configurar csurf – lembre-se de lidar com tokens CSRF no frontend
    // app.use(csurf({ cookie: true }));
};
