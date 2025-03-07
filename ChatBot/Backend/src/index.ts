// Carrega as variáveis de ambiente
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


// Certifique-se de importar o arquivo que configura a estratégia OAuth2
import './services/authService'; // Esse arquivo deve conter a definição do OAuth2Strategy

const app = express();
const server = http.createServer(app);

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(mongoSanitize());
app.use(cors({
    origin: process.env.CORS_ORIGIN || "https://chatbot.jeanhenrique.site",
    credentials: true,
}));
app.use(securityMiddleware);

// Configure o middleware de sessão antes de passport.initialize()
app.use(session({
    secret: 'suaChaveSecretaMuitoForte',
    resave: false,
    saveUninitialized: false,
    // Você pode configurar um store para produção, como connect-mongo ou redis
}));

// Inicializa o Passport
app.use(passport.initialize());
app.use(passport.session());


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

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/backchat';
mongoose.connect(MONGO_URI)
    .then(() => console.log('MongoDB conectado'))
    .catch((err) => console.error('Erro na conexão com o MongoDB:', err));

const PORT = process.env.PORT || 6000;
server.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
