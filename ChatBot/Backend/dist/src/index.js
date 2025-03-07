"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Carrega as variáveis de ambiente
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
// Certifique-se de importar o arquivo que configura a estratégia OAuth2
require("./services/authService"); // Esse arquivo deve conter a definição do OAuth2Strategy
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
// Middlewares
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use((0, express_mongo_sanitize_1.default)());
app.use((0, cors_1.default)({
    origin: process.env.CORS_ORIGIN || "https://chatbot.jeanhenrique.site",
    credentials: true,
}));
app.use(securtyMiddleware_1.securityMiddleware);
// Configure o middleware de sessão antes de passport.initialize()
app.use((0, express_session_1.default)({
    secret: 'suaChaveSecretaMuitoForte',
    resave: false,
    saveUninitialized: false,
    // Você pode configurar um store para produção, como connect-mongo ou redis
}));
// Inicializa o Passport
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
const swagger_1 = require("./config/swagger");
(0, swagger_1.setupSwagger)(app);
// Rotas
app.use('/api/auth', auth_1.default);
app.use('/api/chat', chat_1.default);
app.use('/api', csrf_1.default);
// Inicia o worker para tarefas assíncronas
(0, queueWorker_1.startWorker)().catch((err) => {
    console.error('Erro ao iniciar o worker:', err);
});
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/backchat';
mongoose_1.default.connect(MONGO_URI)
    .then(() => console.log('MongoDB conectado'))
    .catch((err) => console.error('Erro na conexão com o MongoDB:', err));
const PORT = process.env.PORT || 6000;
server.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
