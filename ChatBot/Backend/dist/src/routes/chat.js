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
        console.log('Endpoint GET /conversations chamado');
        const cacheKey = 'conversations_test';
        // Tenta obter as conversas do cache
        const cachedConversations = yield redisClient_1.default.get(cacheKey);
        if (cachedConversations) {
            console.log('Retornando conversas do cache');
            return res.json({ conversations: JSON.parse(cachedConversations) });
        }
        // Se não houver cache, busca do MongoDB
        const limit = parseInt(req.query.limit) || 100;
        const conversations = yield Conversation_1.default.find().limit(limit).sort({ createdAt: -1 });
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
    const { conversationId, title, messages } = req.body;
    try {
        if (conversationId) {
            const updated = yield Conversation_1.default.findByIdAndUpdate(conversationId, { title, messages }, { new: true });
            if (!updated) {
                return res.status(404).json({ message: 'Conversa não encontrada' });
            }
            // Atualiza o índice no Elasticsearch
            yield (0, elasticService_1.updateConversationIndex)(updated);
            (0, queueService_1.enqueueTask)('processConversation', { conversationId: updated._id, title, messages });
            res.json(updated);
        }
        else {
            const newConversation = new Conversation_1.default({ title, messages });
            yield newConversation.save();
            // Indexa a nova conversa no Elasticsearch
            yield (0, elasticService_1.indexConversation)(newConversation);
            (0, queueService_1.enqueueTask)('processConversation', { conversationId: newConversation._id, title, messages });
            res.status(201).json(newConversation);
        }
    }
    catch (err) {
        res.status(500).json({ message: 'Erro ao processar a conversa', error: err });
    }
}));
// Exclusão de conversa
router.delete('/conversations/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const deleted = yield Conversation_1.default.findByIdAndDelete(id);
        if (!deleted) {
            return res.status(404).json({ message: 'Conversa não encontrada' });
        }
        // Remove a conversa do Elasticsearch
        yield (0, elasticService_1.deleteConversationIndex)(id);
        res.json({ message: 'Conversa excluída' });
    }
    catch (err) {
        res.status(500).json({ message: 'Erro ao excluir conversa', error: err });
    }
}));
exports.default = router;
