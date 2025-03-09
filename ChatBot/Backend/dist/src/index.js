"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// server.ts
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const auth_1 = __importDefault(require("./routes/auth"));
const chat_1 = __importDefault(require("./routes/chat"));
const queueWorker_1 = require("./workers/queueWorker");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const securtyMiddleware_1 = require("./middlewares/securtyMiddleware");
const express_mongo_sanitize_1 = __importDefault(require("express-mongo-sanitize"));
const csrf_1 = __importDefault(require("./routes/csrf"));
const passport_1 = __importDefault(require("passport"));
const express_session_1 = __importDefault(require("express-session"));
const socket_io_1 = require("socket.io");
// Importa a configuração do OAuth2Strategy
require("./services/authService");
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
// Configuração do Socket.io
const io = new socket_io_1.Server(server, {
    cors: {
        origin: process.env.CORS_ORIGIN || "https://chatbot.jeanhenrique.site",
        methods: ["GET", "POST"],
        credentials: true,
    }
});
// Permite acesso à instância do Socket.io via req.app.get('io') nas rotas
app.set('io', io);
// Middlewares
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use((0, express_mongo_sanitize_1.default)());
app.use((0, cors_1.default)({
    origin: process.env.CORS_ORIGIN || "https://chatbot.jeanhenrique.site",
    credentials: true,
}));
app.use(securtyMiddleware_1.securityMiddleware);
// Configuração de sessão e Passport
app.use((0, express_session_1.default)({
    secret: 'suaChaveSecretaMuitoForte',
    resave: false,
    saveUninitialized: false,
}));
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
// Configuração do Swagger (se aplicável)
const swagger_1 = require("./config/swagger");
(0, swagger_1.setupSwagger)(app);
// Rotas da API
app.use('/api/auth', auth_1.default);
app.use('/api/chat', chat_1.default);
app.use('/api', csrf_1.default);
// Inicia o worker para tarefas assíncronas
(0, queueWorker_1.startWorker)().catch((err) => {
    console.error('Erro ao iniciar o worker:', err);
});
// Conecta ao MongoDB
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/backchat';
mongoose_1.default.connect(MONGO_URI)
    .then(() => console.log('MongoDB conectado'))
    .catch((err) => console.error('Erro na conexão com o MongoDB:', err));
// Eventos do Socket.io
io.on("connection", (socket) => {
    console.log("Novo cliente conectado:", socket.id);
    // Permite que o cliente entre numa sala identificada pelo ID da conversa
    socket.on("joinConversation", (conversationId) => {
        socket.join(conversationId);
        console.log(`Socket ${socket.id} entrou na conversa ${conversationId}`);
    });
    socket.on("leaveConversation", (conversationId) => {
        socket.leave(conversationId);
        console.log(`Socket ${socket.id} saiu da conversa ${conversationId}`);
    });
    // Recebe uma mensagem enviada pelo cliente e a retransmite para a sala correspondente
    socket.on("sendMessage", (data) => {
        const { conversationId, message } = data;
        // Opcional: aqui você pode salvar a mensagem no banco antes de emitir
        io.to(conversationId).emit("newMessage", message);
    });
    socket.on("disconnect", () => {
        console.log("Cliente desconectado:", socket.id);
    });
});
const PORT = process.env.PORT || 6000;
server.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
