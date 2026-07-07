import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import http from 'http';
import mongoose from 'mongoose';
import cors from 'cors';
import helmet from 'helmet';
import authRoutes from './routes/auth';
import chatRoutes from './routes/chat';
import { startWorker } from './workers/queueWorker';
import cookieParser from 'cookie-parser';
import { securityMiddleware } from './middlewares/securtyMiddleware';
import mongoSanitize from 'express-mongo-sanitize';
import csrfRoutes from './routes/csrf';
import passport from 'passport';
import session from 'express-session';
import MongoStore from 'connect-mongo'; // Certifique-se de instalar o connect-mongo: npm install connect-mongo
import { Server } from 'socket.io';
import { apiLimiter } from './middlewares/rateLimiter';

import './services/authService';

const app = express();
const server = http.createServer(app);

// Para que o Express confie em proxies (necessário para cookies secure em ambientes com proxy)
app.set('trust proxy', 1);

// Adiciona cabeçalhos de segurança com Helmet
app.use(helmet());

// Configura CORS
const corsOrigin = process.env.CORS_ORIGIN || "https://chatbot.jeanhenrique.site";
app.use(cors({
    origin: corsOrigin,
    credentials: true,
}));

// Configura o Socket.IO com CORS
const io = new Server(server, {
    cors: {
        origin: corsOrigin,
        methods: ["GET", "POST"],
        credentials: true,
    }
});
app.set('io', io);

// Middlewares de processamento
app.use(express.json());
app.use(cookieParser());
app.use(mongoSanitize());
app.use(securityMiddleware);

// Aplica rate limiter em todas as rotas iniciadas com /api
app.use('/api/', apiLimiter);

// Configuração da sessão com armazenamento persistente usando MongoDB
app.use(session({
    secret: process.env.SESSION_SECRET || 'suaChaveSecretaMuitoForte',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
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
app.use(passport.initialize());
app.use(passport.session());

// Configura Swagger (lembre-se de restringir o acesso em produção)
import { setupSwagger } from './config/swagger';
setupSwagger(app);

// Rotas da API
app.use('/api/auth', authRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api', csrfRoutes);

// Inicia o worker
startWorker().catch((err) => {
    console.error('Erro ao iniciar o worker:', err);
});

// Conecta ao MongoDB
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/backchat';
mongoose.connect(MONGO_URI)
    .then(() => console.log('MongoDB conectado'))
    .catch((err) => console.error('Erro na conexão com o MongoDB:', err));

// Eventos do Socket.IO
io.on("connection", (socket) => {
    console.log("Novo cliente conectado:", socket.id);

    socket.on("joinConversation", (conversationId: string) => {
        socket.join(conversationId);
        console.log(`Socket ${socket.id} entrou na conversa ${conversationId}`);
    });

    socket.on("leaveConversation", (conversationId: string) => {
        socket.leave(conversationId);
        console.log(`Socket ${socket.id} saiu da conversa ${conversationId}`);
    });

    socket.on("sendMessage", (data: { conversationId: string; message: any }) => {
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
