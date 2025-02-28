"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_session_1 = __importDefault(require("express-session"));
const passport_1 = __importDefault(require("passport"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const csurf_1 = __importDefault(require("csurf"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const chat_routes_1 = __importDefault(require("./routes/chat.routes"));
const csrf_routes_1 = __importDefault(require("./routes/csrf.routes"));
const db_1 = require("./config/db");
require("./config/passport");
const PORT = process.env.PORT || 5000;
const app = (0, express_1.default)();
// Configuração de sessão
app.use((0, express_session_1.default)({
    secret: process.env.SESSION_SECRET || "segredo",
    resave: false,
    saveUninitialized: false,
    cookie: {
        sameSite: "lax",
        secure: false,
    },
}));
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
// Middlewares de segurança
app.use((0, helmet_1.default)());
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)({ origin: "http://localhost:3000", credentials: true }));
app.use(express_1.default.json());
// CSRF deve vir após cookieParser e express.json()
app.use((0, csurf_1.default)({ cookie: true }));
// Rotas que dependem do CSRF
app.use(csrf_routes_1.default);
app.use("/api/auth", auth_routes_1.default);
app.use("/api/chat", chat_routes_1.default);
// Cria um servidor HTTP a partir do app Express
const server = (0, http_1.createServer)(app);
// Inicializa o Socket.IO integrando-o ao mesmo servidor HTTP
const io = new socket_io_1.Server(server, {
    cors: {
        origin: "http://localhost:3000", // Permite a origem do seu frontend
        methods: ["GET", "POST"],
    },
});
// Configuração do WebSocket
io.on("connection", (socket) => {
    console.log("Socket conectado:", socket.id);
    // Quando um cliente envia uma mensagem
    socket.on("chat message", (msg) => {
        console.log("Mensagem recebida via WebSocket:", msg);
        // Aqui você pode salvar a mensagem no banco de dados ou executar outras lógicas
        // Em seguida, emite a mensagem para todos os clientes conectados
        io.emit("chat message", msg);
    });
    socket.on("disconnect", () => {
        console.log("Socket desconectado:", socket.id);
    });
});
// Inicia o servidor
(0, db_1.connectDB)().then(() => {
    server.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
});
