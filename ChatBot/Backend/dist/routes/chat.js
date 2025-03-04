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
const express_1 = require("express");
const Conversation_1 = __importDefault(require("../models/Conversation"));
const router = (0, express_1.Router)();
// Busca de conversas
router.get('/conversations', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const limit = parseInt(req.query.limit) || 100;
        // Em uma aplicação real, você filtraria as conversas do usuário
        const conversations = yield Conversation_1.default.find().limit(limit).sort({ createdAt: -1 });
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
            // Atualiza a conversa existente
            const updated = yield Conversation_1.default.findByIdAndUpdate(conversationId, { title, messages }, { new: true });
            if (!updated) {
                return res.status(404).json({ message: 'Conversa não encontrada' });
            }
            res.json(updated);
        }
        else {
            // Cria nova conversa
            const newConversation = new Conversation_1.default({ title, messages });
            yield newConversation.save();
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
        res.json({ message: 'Conversa excluída' });
    }
    catch (err) {
        res.status(500).json({ message: 'Erro ao excluir conversa', error: err });
    }
}));
exports.default = router;
