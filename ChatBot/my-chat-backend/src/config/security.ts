import helmet from "helmet";
import cors from "cors";
import express from "express";
import cookieParser from "cookie-parser";
import csurf from "csurf";

export const securityMiddleware = (app: express.Application) => {
    app.use(helmet());
    app.use(cookieParser());
    app.use(
        cors({
            origin: "http://localhost:3000", // ou o endereço do seu frontend
            credentials: true,
        })
    );
    app.use(express.json());
    // Aplique o csurf depois de cookieParser e express.json
    app.use(csurf({ cookie: true }));
};
