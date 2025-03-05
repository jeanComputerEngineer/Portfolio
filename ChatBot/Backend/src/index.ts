// src/server.ts
import express from 'express';
import http from 'http';
import mongoose from 'mongoose';
import cors from 'cors';
import { Server as SocketIOServer } from 'socket.io';
import authRoutes from './routes/auth';
import chatRoutes from './routes/chat';
import { startWorker } from './workers/queueWorker'; // Importe o worker
import cookieParser from 'cookie-parser';

const app = express();
const server = http.createServer(app);

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: process.env.CORS_ORIGIN || "https://chatbot.jeanhenrique.site",
    credentials: true,
}));

// Rotas
app.use('/api/auth', authRoutes);
app.use('/api/chat', chatRoutes);

// Inicia o worker para processamento assíncrono
startWorker().catch((err) => {
    console.error('Erro ao iniciar o worker:', err);
});

// Socket.io para chat em tempo real
const io = new SocketIOServer(server, {
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
mongoose.connect(MONGO_URI)
    .then(() => console.log('MongoDB conectado'))
    .catch((err) => console.error('Erro na conexão com o MongoDB:', err));

// Inicializa o servidor
const PORT = process.env.PORT || 6000;
server.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
