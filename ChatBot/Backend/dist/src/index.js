"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/server.ts
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const socket_io_1 = require("socket.io");
const auth_1 = __importDefault(require("./routes/auth"));
const chat_1 = __importDefault(require("./routes/chat"));
const queueWorker_1 = require("./workers/queueWorker"); // Importe o worker
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
// Middlewares
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)({
    origin: process.env.CORS_ORIGIN || "https://chatbot.jeanhenrique.site",
    credentials: true,
}));
// Rotas
app.use('/api/auth', auth_1.default);
app.use('/api/chat', chat_1.default);
// Inicia o worker para processamento assíncrono
(0, queueWorker_1.startWorker)().catch((err) => {
    console.error('Erro ao iniciar o worker:', err);
});
// Socket.io para chat em tempo real
const io = new socket_io_1.Server(server, {
    cors: {
        origin: process.env.CORS_ORIGIN || "https://chatbot.jeanhenrique.site"
    }
});
io.on('connection', (socket) => {
    console.log('Novo cliente conectado');
    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
    });
    socket.on('disconnect', () => {
        console.log('Cliente desconectado');
    });
});
// Conexão com o MongoDB
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/backchat';
mongoose_1.default.connect(MONGO_URI)
    .then(() => console.log('MongoDB conectado'))
    .catch((err) => console.error('Erro na conexão com o MongoDB:', err));
// Inicializa o servidor
const PORT = process.env.PORT || 6000;
server.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
