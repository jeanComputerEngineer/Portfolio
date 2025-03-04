"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors")); // importe o pacote
const auth_1 = __importDefault(require("./routes/auth"));
const chat_1 = __importDefault(require("./routes/chat"));
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
// Configuração do CORS
app.use((0, cors_1.default)({
    origin: "https://chatbot.jeanhenrique.site", // Permite apenas esse domínio
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept"],
    credentials: false // Permite o envio de cookies e credenciais
}));
app.options('*', (0, cors_1.default)({
    origin: "https://chatbot.jeanhenrique.site",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept"],
    credentials: false
}));
app.use(express_1.default.json());
// Rotas de autenticação e chat
app.use('/api/auth', auth_1.default);
app.use('/api/chat', chat_1.default);
// Integração com Socket.io
const io = new socket_io_1.Server(server, {
    cors: {
        origin: "https://chatbot.jeanhenrique.site"
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
const PORT = process.env.PORT || 6000;
server.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
