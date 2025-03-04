import express from 'express';
import http from 'http';
import { Server as SocketIOServer } from 'socket.io';
import mongoose from 'mongoose';
import cors from 'cors'; // importe o pacote
import authRoutes from './routes/auth';
import chatRoutes from './routes/chat';

const app = express();
const server = http.createServer(app);

// Configuração do CORS
app.use(cors({
    origin: "https://chatbot.jeanhenrique.site", // Permite apenas esse domínio
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept"],
    credentials: false  // Permite o envio de cookies e credenciais
}));

app.options('*', cors({
    origin: "https://chatbot.jeanhenrique.site",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept"],
    credentials: false
}));


app.use(express.json());

// Rotas de autenticação e chat
app.use('/api/auth', authRoutes);
app.use('/api/chat', chatRoutes);

// Integração com Socket.io
const io = new SocketIOServer(server, {
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
mongoose.connect(MONGO_URI)
    .then(() => console.log('MongoDB conectado'))
    .catch((err) => console.error('Erro na conexão com o MongoDB:', err));

const PORT = process.env.PORT || 6000;
server.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
