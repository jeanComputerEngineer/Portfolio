// src/middlewares/securityMiddleware.ts
import helmet from 'helmet';
import cors from 'cors';
import csrf from 'csurf';

export const securityMiddleware = [
    helmet(), // Define diversos headers de segurança
    cors({
        origin: process.env.CORS_ORIGIN || "https://chatbot.jeanhenrique.site",
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept"],
        credentials: true,
    }),
    csrf({ cookie: true }), // Protege contra CSRF
];
