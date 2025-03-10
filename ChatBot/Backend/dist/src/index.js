"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const auth_1 = __importDefault(require("./routes/auth"));
const chat_1 = __importDefault(require("./routes/chat"));
const queueWorker_1 = require("./workers/queueWorker");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const securtyMiddleware_1 = require("./middlewares/securtyMiddleware");
const express_mongo_sanitize_1 = __importDefault(require("express-mongo-sanitize"));
const csrf_1 = __importDefault(require("./routes/csrf"));
const passport_1 = __importDefault(require("passport"));
const express_session_1 = __importDefault(require("express-session"));
const connect_mongo_1 = __importDefault(require("connect-mongo")); // Certifique-se de instalar o connect-mongo: npm install connect-mongo
const socket_io_1 = require("socket.io");
const rateLimiter_1 = require("./middlewares/rateLimiter");
require("./services/authService");
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
// Para que o Express confie em proxies (necessário para cookies secure em ambientes com proxy)
app.set('trust proxy', 1);
// Adiciona cabeçalhos de segurança com Helmet
app.use((0, helmet_1.default)());
// Configura CORS
const corsOrigin = process.env.CORS_ORIGIN || "https://chatbot.jeanhenrique.site";
app.use((0, cors_1.default)({
    origin: corsOrigin,
    credentials: true,
}));
// Configura o Socket.IO com CORS
const io = new socket_io_1.Server(server, {
    cors: {
        origin: corsOrigin,
        methods: ["GET", "POST"],
        credentials: true,
    }
});
app.set('io', io);
// Middlewares de processamento
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use((0, express_mongo_sanitize_1.default)());
app.use(securtyMiddleware_1.securityMiddleware);
// Aplica rate limiter em todas as rotas iniciadas com /api
app.use('/api/', rateLimiter_1.apiLimiter);
// Configuração da sessão com armazenamento persistente usando MongoDB
app.use((0, express_session_1.default)({
    secret: process.env.SESSION_SECRET || 'suaChaveSecretaMuitoForte',
    resave: false,
    saveUninitialized: false,
    store: connect_mongo_1.default.create({
        mongoUrl: process.env.MONGO_URI || 'mongodb://localhost:27017/backchat',
        collectionName: 'sessions'
    }),
    cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // Apenas em HTTPS na produção
        sameSite: 'lax', // Pode ser 'strict' se desejar proteção mais rigorosa
        domain: '.jeanhenrique.site', // Compartilha cookies entre subdomínios
        maxAge: 1000 * 60 * 60 * 24 // 1 dia de validade
    }
}));
// Inicializa o Passport para autenticação
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
// Configura Swagger (lembre-se de restringir o acesso em produção)
const swagger_1 = require("./config/swagger");
(0, swagger_1.setupSwagger)(app);
// Rotas da API
app.use('/api/auth', auth_1.default);
app.use('/api/chat', chat_1.default);
app.use('/api', csrf_1.default);
// Inicia o worker
(0, queueWorker_1.startWorker)().catch((err) => {
    console.error('Erro ao iniciar o worker:', err);
});
// Conecta ao MongoDB
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/backchat';
mongoose_1.default.connect(MONGO_URI)
    .then(() => console.log('MongoDB conectado'))
    .catch((err) => console.error('Erro na conexão com o MongoDB:', err));
// Eventos do Socket.IO
io.on("connection", (socket) => {
    console.log("Novo cliente conectado:", socket.id);
    socket.on("joinConversation", (conversationId) => {
        socket.join(conversationId);
        console.log(`Socket ${socket.id} entrou na conversa ${conversationId}`);
    });
    socket.on("leaveConversation", (conversationId) => {
        socket.leave(conversationId);
        console.log(`Socket ${socket.id} saiu da conversa ${conversationId}`);
    });
    socket.on("sendMessage", (data) => {
        const { conversationId, message } = data;
        // Envia a mensagem para os demais clientes na sala (exceto o emissor)
        socket.broadcast.to(conversationId).emit("newMessage", message);
    });
    socket.on("disconnect", () => {
        console.log("Cliente desconectado:", socket.id);
    });
    socket.on("connect_error", (err) => {
        console.error("Erro de conexão no Socket.IO:", err);
    });
});
const PORT = process.env.PORT || 6000;
server.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
