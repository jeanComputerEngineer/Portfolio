import express from "express";
import session from "express-session";
import passport from "passport";
import cors from "cors";
import helmet from "helmet";
import authRoutes from "./routes/auth.routes";
import chatRoutes from "./routes/chat.routes";
import { connectDB } from "./config/db";
import "./config/passport";

const app = express();

// Primeiramente, aplique middlewares globais:
app.use(helmet());
app.use(express.json());
app.use(
    cors({
        origin: "http://localhost:3000", // Frontend
        credentials: true,              // Permite envio de cookies
    })
);

// Configure a sessão e o Passport depois:
app.use(
    session({
        secret: process.env.SESSION_SECRET || "segredo",
        resave: false,
        saveUninitialized: false,
        cookie: {
            sameSite: "lax", // Tente "lax" ou, se necessário, "none" (mas lembre que "none" exige secure: true em produção)
            secure: false,   // Em desenvolvimento, secure deve ser false
        },
    })
);

app.use(passport.initialize());
app.use(passport.session());

// Rotas
app.use("/api/auth", authRoutes);
app.use("/api/chat", chatRoutes);

const PORT = process.env.PORT || 5000;
(async () => {
    await connectDB();
    app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
})();
