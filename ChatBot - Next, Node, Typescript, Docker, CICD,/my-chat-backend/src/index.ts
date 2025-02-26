import express from "express";
import http from "http";
import { connectDB } from "./config/db";
import { securityMiddleware } from "./config/security";
import authRoutes from "./routes/auth.routes";
import chatRoutes from "./routes/chat.routes";
import passport from "./config/passport";
import session from "express-session";
import { initSocket } from "./sockets/chat.socket";

const app = express();
const server = http.createServer(app);

// Conectar ao MongoDB
connectDB();

// Configurar sessões (necessário para Passport e 2FA)
app.use(
    session({
        secret: process.env.SESSION_SECRET || "segredo",
        resave: false,
        saveUninitialized: false
    })
);
app.use(passport.initialize());
app.use(passport.session());

// Middleware de segurança
securityMiddleware(app);

// Rotas
app.use("/api/auth", authRoutes);
app.use("/api/chat", chatRoutes);

// Inicializar Socket.IO
initSocket(server);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
