"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var express_session_1 = __importDefault(require("express-session"));
var passport_1 = __importDefault(require("passport"));
var cookie_parser_1 = __importDefault(require("cookie-parser"));
var csurf_1 = __importDefault(require("csurf"));
var cors_1 = __importDefault(require("cors"));
var helmet_1 = __importDefault(require("helmet"));
var http_1 = require("http");
var socket_io_1 = require("socket.io");
var auth_routes_1 = __importDefault(require("./routes/auth.routes"));
var chat_routes_1 = __importDefault(require("./routes/chat.routes"));
var csrf_routes_1 = __importDefault(require("./routes/csrf.routes"));
var db_1 = require("./config/db");
var morgan_1 = __importDefault(require("morgan"));
var logger_1 = __importDefault(require("./logger"));
require("./config/passport"); // Carrega a configuração do Passport
var PORT = process.env.PORT || 5000;
var app = (0, express_1.default)();
// Middlewares de segurança
app.use((0, helmet_1.default)());
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)({ origin: "http://localhost:3000", credentials: true }));
app.use(express_1.default.json());
// Configuração de sessão (necessária para o Passport e o csurf)
app.use((0, express_session_1.default)({
    secret: process.env.SESSION_SECRET || "segredo",
    resave: false,
    saveUninitialized: false,
    cookie: {
        // Em produção, utilize secure: true com HTTPS
        sameSite: "lax",
        secure: false,
    },
}));
app.use((0, morgan_1.default)("combined", {
    stream: {
        write: function (message) { return logger_1.default.info(message.trim()); },
    },
}));
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
// CSRF deve ser configurado após cookieParser, express.json() e a sessão
app.use((0, csurf_1.default)({ cookie: true }));
// Monta a rota de CSRF token
app.use(csrf_routes_1.default);
// Monta as outras rotas
app.use("/api/auth", auth_routes_1.default);
app.use("/api/chat", chat_routes_1.default);
// Cria o servidor HTTP
var server = (0, http_1.createServer)(app);
// Configuração do Socket.IO
var io = new socket_io_1.Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    },
});
io.on("connection", function (socket) {
    console.log("Socket conectado:", socket.id);
    socket.on("chat message", function (msg) {
        console.log("Mensagem recebida via WebSocket:", msg);
        io.emit("chat message", msg);
    });
    socket.on("disconnect", function () {
        console.log("Socket desconectado:", socket.id);
    });
});
// Conecta ao MongoDB e inicia o servidor
(0, db_1.connectDB)().then(function () {
    server.listen(PORT, function () { return console.log("Servidor rodando na porta ".concat(PORT)); });
});
