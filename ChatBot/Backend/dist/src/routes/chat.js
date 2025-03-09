"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/chat.ts
const express_1 = require("express");
const Conversation_1 = __importDefault(require("../models/Conversation"));
const queueService_1 = require("../services/queueService");
const redisClient_1 = __importDefault(require("../services/redisClient"));
const elasticService_1 = require("../services/elasticService");
const router = (0, express_1.Router)();
// Busca de conversas usando Elasticsearch
router.get('/search', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = req.query.q;
        if (!query) {
            return res.status(400).json({ message: 'Query não informada' });
        }
        const results = yield (0, elasticService_1.searchConversations)(query);
        res.json({ conversations: results });
    }
    catch (err) {
        res.status(500).json({ message: 'Erro ao buscar conversas', error: err });
    }
}));
// Busca de conversas com cache no Redis (rota original)
router.get('/conversations', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.query; // recebe o email do usuário
        if (!email) {
            return res.status(400).json({ message: 'Email query parameter is required' });
        }
        console.log('Endpoint GET /conversations chamado para:', email);
        const cacheKey = `conversations_${email}`; // cache específico para cada usuário
        // Tenta obter as conversas do cache
        const cachedConversations = yield redisClient_1.default.get(cacheKey);
        if (cachedConversations) {
            console.log('Retornando conversas do cache para:', email);
            return res.json({ conversations: JSON.parse(cachedConversations) });
        }
        // Se não houver cache, busca do MongoDB filtrando pelo owner
        const limit = parseInt(req.query.limit) || 100;
        const conversations = yield Conversation_1.default.find({ owner: email }).limit(limit).sort({ createdAt: -1 });
        // Armazena o resultado no cache por 60 segundos
        yield redisClient_1.default.set(cacheKey, JSON.stringify(conversations), { EX: 60 });
        console.log(`Cache definido para "${cacheKey}"`);
        res.json({ conversations });
    }
    catch (err) {
        res.status(500).json({ message: 'Erro ao buscar conversas', error: err });
    }
}));
// Criação ou atualização de uma conversa
router.post('/conversations', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { conversationId, title, messages, email } = req.body;
    const io = req.app.get('io'); // obtém a instância do socket.io
    try {
        if (conversationId) {
            const updated = yield Conversation_1.default.findByIdAndUpdate(conversationId, { title, messages }, { new: true });
            if (!updated) {
                return res.status(404).json({ message: 'Conversa não encontrada' });
            }
            try {
                yield (0, elasticService_1.updateConversationIndex)(updated);
            }
            catch (err) {
                console.error("Erro ao atualizar índice no Elasticsearch:", err);
            }
            try {
                (0, queueService_1.enqueueTask)('processConversation', { conversationId: updated._id, title, messages });
            }
            catch (err) {
                console.error("Erro ao enfileirar tarefa:", err);
            }
            // REMOVIDO: Emissão imediata para evitar duplicação
            // io.to(updated._id.toString()).emit("newMessage", { messages: updated.messages });
            return res.json(updated);
        }
        else {
            if (!email) {
                return res.status(400).json({ message: 'Email is required to create a conversation' });
            }
            const newConversation = new Conversation_1.default({ owner: email, title, messages });
            yield newConversation.save();
            try {
                yield (0, elasticService_1.indexConversation)(newConversation);
            }
            catch (err) {
                console.error("Erro ao indexar nova conversa:", err);
            }
            try {
                (0, queueService_1.enqueueTask)('processConversation', { conversationId: newConversation._id, title, messages });
            }
            catch (err) {
                console.error("Erro ao enfileirar tarefa:", err);
            }
            // REMOVIDO: Emissão imediata para evitar duplicação
            // io.to(newConversation._id.toString()).emit("newMessage", { messages: newConversation.messages });
            return res.status(201).json(newConversation);
        }
    }
    catch (err) {
        console.error("Erro ao processar a conversa:", err);
        return res.status(500).json({ message: 'Erro ao processar a conversa', error: err.message });
    }
}));
// Exclusão de conversa
// src/routes/chat.ts
router.delete('/conversations/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const deleted = yield Conversation_1.default.findByIdAndDelete(id);
        if (!deleted) {
            return res.status(404).json({ message: 'Conversa não encontrada' });
        }
        // Tenta remover a conversa do Elasticsearch; se não existir, ignoramos o erro
        try {
            yield (0, elasticService_1.deleteConversationIndex)(id);
        }
        catch (err) {
            // Se o erro indicar que o documento não foi encontrado (ex.: 404), apenas logamos
            if (err.meta && err.meta.statusCode === 404) {
                console.warn("Documento não encontrado no Elasticsearch, ignorando.");
            }
            else {
                console.error("Erro ao remover documento do Elasticsearch:", err);
            }
        }
        return res.json({ message: 'Conversa excluída' });
    }
    catch (err) {
        console.error("Erro ao excluir conversa:", err);
        return res.status(500).json({ message: 'Erro ao excluir conversa', error: err.message });
    }
}));
exports.default = router;
