import express from "express";
import session from "express-session";
import passport from "passport";
import cookieParser from "cookie-parser";
import csurf from "csurf";
import cors from "cors";
import helmet from "helmet";

import authRoutes from "./routes/auth.routes";
import chatRoutes from "./routes/chat.routes";
import csrfRoutes from "./routes/csrf.routes";
import { securityMiddleware } from "./config/security";
import { connectDB } from "./config/db";

import "./config/passport";


const app = express();

app.use(
    session({
        secret: process.env.SESSION_SECRET || "segredo",
        resave: false,
        saveUninitialized: false,
        cookie: {
            sameSite: "lax",
            secure: false,
        },
    })
);

app.use(passport.initialize());
app.use(passport.session());

// Middlewares de segurança
app.use(helmet());
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());
// Configura o csurf; observe que ele precisa vir após cookieParser e express.json()
app.use(csurf({ cookie: true }));

// Rotas que dependem do CSRF devem ser declaradas após o csurf
app.use(csrfRoutes); // Isso disponibiliza o endpoint "/csrf-token"

app.use("/api/auth", authRoutes);
app.use("/api/chat", chatRoutes);

const PORT = process.env.PORT || 5000;

(async () => {
    await connectDB();
    app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
})();
