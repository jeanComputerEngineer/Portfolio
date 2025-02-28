import express from "express";
import session from "express-session";
import passport from "passport";
import cookieParser from "cookie-parser";
import csurf from "csurf";
import cors from "cors";
import helmet from "helmet";
import { createServer } from "http";
import { Server } from "socket.io";
import authRoutes from "./routes/auth.routes";
import chatRoutes from "./routes/chat.routes";
import csrfRoutes from "./routes/csrf.routes";
import { connectDB } from "./config/db";
import morgan from "morgan";
import logger from "./logger";



import "./config/passport"; // Carrega a configuração do Passport

const PORT = process.env.PORT || 5000;
const app = express();

// Middlewares de segurança
app.use(helmet());
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());

// Configuração de sessão (necessária para o Passport e o csurf)
app.use(
    session({
        secret: process.env.SESSION_SECRET || "segredo",
        resave: false,
        saveUninitialized: false,

        cookie: {
            // Em produção, utilize secure: true com HTTPS
            sameSite: "lax",
            secure: false,
        },
    })
);

app.use(
    morgan("combined", {
        stream: {
            write: (message) => logger.info(message.trim()),
        },
    })
);

app.use(passport.initialize());
app.use(passport.session());

// CSRF deve ser configurado após cookieParser, express.json() e a sessão
app.use(csurf({ cookie: true }));

// Monta a rota de CSRF token
app.use(csrfRoutes);

// Monta as outras rotas
app.use("/api/auth", authRoutes);
app.use("/api/chat", chatRoutes);

// Cria o servidor HTTP
const server = createServer(app);

// Configuração do Socket.IO
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    },
});

io.on("connection", (socket) => {
    console.log("Socket conectado:", socket.id);
    socket.on("chat message", (msg) => {
        console.log("Mensagem recebida via WebSocket:", msg);
        io.emit("chat message", msg);
    });
    socket.on("disconnect", () => {
        console.log("Socket desconectado:", socket.id);
    });
});

// Conecta ao MongoDB e inicia o servidor
connectDB().then(() => {
    server.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
});
