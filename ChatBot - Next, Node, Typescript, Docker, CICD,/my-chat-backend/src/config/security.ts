// securityMiddleware.ts
import helmet from "helmet";
import cors from "cors";
import express from "express";

export const securityMiddleware = (app: express.Application) => {
    app.use(helmet());
    app.use(
        cors({
            origin: "http://localhost:3000", // Especifica a origem permitida
            credentials: true,              // Permite o envio de credenciais (cookies, etc.)
        })
    );
    app.use(express.json());
    // Se usar CSRF, lembre-se de configurar corretamente o cookie, etc.
    // app.use(csurf({ cookie: true }));
};
