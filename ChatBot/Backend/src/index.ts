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
import { apiLimiter } from './middlewares/rateLimiter';

import './services/authService';

const app = express();
const server = http.createServer(app);

app.set('trust proxy', 1);


const io = new Server(server, {
    cors: {
        origin: process.env.CORS_ORIGIN || "https://chatbot.jeanhenrique.site",
        methods: ["GET", "POST"],
        credentials: true,
    }
});
app.set('io', io);

app.use(express.json());
app.use(cookieParser());
app.use(mongoSanitize());
app.use(cors({
    origin: process.env.CORS_ORIGIN || "https://chatbot.jeanhenrique.site",
    credentials: true,
}));
app.use(securityMiddleware);

// Aplica o rate limiter a todas as rotas /api
app.use('/api/', apiLimiter);

app.use(session({
    secret: 'suaChaveSecretaMuitoForte',
    resave: false,
    saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());

import { setupSwagger } from './config/swagger';
setupSwagger(app);

app.use('/api/auth', authRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api', csrfRoutes);

startWorker().catch((err) => {
    console.error('Erro ao iniciar o worker:', err);
});

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/backchat';
mongoose.connect(MONGO_URI)
    .then(() => console.log('MongoDB conectado'))
    .catch((err) => console.error('Erro na conexão com o MongoDB:', err));

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
        // Envia a mensagem para os demais clientes na sala, mas não para o emissor
        socket.broadcast.to(conversationId).emit("newMessage", message);
    });

    socket.on("disconnect", () => {
        console.log("Cliente desconectado:", socket.id);
    });

    socket.on("connect_error", (err) => {

    });
});

const PORT = process.env.PORT || 6000;
server.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
