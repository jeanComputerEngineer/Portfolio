// server.ts
import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import http from 'http';
import mongoose from 'mongoose';
import cors from 'cors';
import authRoutes from './routes/auth';
import chatRoutes from './routes/chat';
import { startWorker } from './workers/queueWorker';
import cookieParser from 'cookie-parser';
import { securityMiddleware } from './middlewares/securtyMiddleware';
import mongoSanitize from 'express-mongo-sanitize';
import csrfRoutes from './routes/csrf';
import passport from 'passport';
import session from 'express-session';
import { Server } from 'socket.io';

// Importa a configuração do OAuth2Strategy
import './services/authService';

const app = express();
const server = http.createServer(app);

// Configuração do Socket.io
const io = new Server(server, {
    cors: {
        origin: process.env.CORS_ORIGIN || "https://chatbot.jeanhenrique.site",
        methods: ["GET", "POST"],
        credentials: true,
    }
});

// Permite acesso à instância do Socket.io via req.app.get('io') nas rotas
app.set('io', io);

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(mongoSanitize());
app.use(cors({
    origin: process.env.CORS_ORIGIN || "https://chatbot.jeanhenrique.site",
    credentials: true,
}));
app.use(securityMiddleware);

// Configuração de sessão e Passport
app.use(session({
    secret: 'suaChaveSecretaMuitoForte',
    resave: false,
    saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());

// Configuração do Swagger (se aplicável)
import { setupSwagger } from './config/swagger';
setupSwagger(app);

// Rotas da API
app.use('/api/auth', authRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api', csrfRoutes);

// Inicia o worker para tarefas assíncronas
startWorker().catch((err) => {
    console.error('Erro ao iniciar o worker:', err);
});

// Conecta ao MongoDB
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/backchat';
mongoose.connect(MONGO_URI)
    .then(() => console.log('MongoDB conectado'))
    .catch((err) => console.error('Erro na conexão com o MongoDB:', err));

// Eventos do Socket.io
io.on("connection", (socket) => {
    console.log("Novo cliente conectado:", socket.id);

    // Permite que o cliente entre numa sala identificada pelo ID da conversa
    socket.on("joinConversation", (conversationId: string) => {
        socket.join(conversationId);
        console.log(`Socket ${socket.id} entrou na conversa ${conversationId}`);
    });

    socket.on("leaveConversation", (conversationId: string) => {
        socket.leave(conversationId);
        console.log(`Socket ${socket.id} saiu da conversa ${conversationId}`);
    });

    // Recebe uma mensagem enviada pelo cliente e a retransmite para a sala correspondente
    socket.on("sendMessage", (data: { conversationId: string; message: any }) => {
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
