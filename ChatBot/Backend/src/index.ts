// src/server.ts
import express from 'express';
import http from 'http';
import mongoose from 'mongoose';
import cors from 'cors';
import authRoutes from './routes/auth';
import chatRoutes from './routes/chat';
import { startWorker } from './workers/queueWorker';
import cookieParser from 'cookie-parser';
import { securityMiddleware } from './middlewares/securtyMiddleware';
import mongoSanitize from 'express-mongo-sanitize'; // nova dependência
import csrfRoutes from './routes/csrf';


const app = express();
const server = http.createServer(app);

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(mongoSanitize()); // Prevê injeções no MongoDB
app.use(cors({
    origin: process.env.CORS_ORIGIN || "https://chatbot.jeanhenrique.site",
    credentials: true,
}));
app.use(securityMiddleware); // Helmet, CORS e CSRF

// Configuração do Swagger
import { setupSwagger } from './config/swagger';
setupSwagger(app);

// Rotas
app.use('/api/auth', authRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api', csrfRoutes);


// Inicia o worker para tarefas assíncronas
startWorker().catch((err) => {
    console.error('Erro ao iniciar o worker:', err);
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
