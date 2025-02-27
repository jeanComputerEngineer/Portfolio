import express from "express";
import session from "express-session";
import passport from "passport";
import { securityMiddleware } from "./config/security";
import authRoutes from "./routes/auth.routes";
import chatRoutes from "./routes/chat.routes";
import { connectDB } from "./config/db"; // ajuste o caminho conforme necessário

// Certifique-se de configurar o Passport (ex.: estratégias, serialize/deserialize)
import "./config/passport";

const app = express();

app.use(
    session({
        secret: process.env.SESSION_SECRET || "segredo",
        resave: false,
        saveUninitialized: false,
        cookie: {
            sameSite: "lax", // Em alguns casos, pode ser necessário "none" (lembre que "none" exige secure: true em produção)
            secure: false,   // Certifique-se de que, em desenvolvimento, secure está false
        },
    })
);

app.use(passport.initialize());
app.use(passport.session());

// Middleware de segurança (incluindo CORS configurado para http://localhost:3000 e credentials true)
securityMiddleware(app);

app.use("/api/auth", authRoutes);
app.use("/api/chat", chatRoutes);

const PORT = process.env.PORT || 5000;

(async () => {
    await connectDB();
    app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
})();
