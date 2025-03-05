// src/routes/chat.ts
import { Router } from 'express';
import Conversation, { IConversation } from '../models/Conversation';
import { enqueueTask } from '../services/queueService';
import redisClient from '../services/redisClient';
import {
    indexConversation,
    updateConversationIndex,
    deleteConversationIndex,
    searchConversations
} from '../services/elasticService';

const router = Router();

// Busca de conversas usando Elasticsearch
router.get('/search', async (req, res) => {
    try {
        const query = req.query.q as string;
        if (!query) {
            return res.status(400).json({ message: 'Query não informada' });
        }
        const results = await searchConversations(query);
        res.json({ conversations: results });
    } catch (err) {
        res.status(500).json({ message: 'Erro ao buscar conversas', error: err });
    }
});

// Busca de conversas com cache no Redis (rota original)
router.get('/conversations', async (req, res) => {
    try {
        console.log('Endpoint GET /conversations chamado');
        const cacheKey = 'conversations_test';

        // Tenta obter as conversas do cache
        const cachedConversations = await redisClient.get(cacheKey);
        if (cachedConversations) {
            console.log('Retornando conversas do cache');
            return res.json({ conversations: JSON.parse(cachedConversations) });
        }

        // Se não houver cache, busca do MongoDB
        const limit = parseInt(req.query.limit as string) || 100;
        const conversations = await Conversation.find().limit(limit).sort({ createdAt: -1 });

        // Armazena o resultado no cache por 60 segundos
        await redisClient.set(cacheKey, JSON.stringify(conversations), { EX: 60 });
        console.log(`Cache definido para "${cacheKey}"`);

        res.json({ conversations });
    } catch (err) {
        res.status(500).json({ message: 'Erro ao buscar conversas', error: err });
    }
});



// Criação ou atualização de uma conversa
router.post('/conversations', async (req, res) => {
    const { conversationId, title, messages } = req.body;
    try {
        if (conversationId) {
            const updated = await Conversation.findByIdAndUpdate(
                conversationId,
                { title, messages },
                { new: true }
            );
            if (!updated) {
                return res.status(404).json({ message: 'Conversa não encontrada' });
            }
            // Tenta atualizar o índice no Elasticsearch
            try {
                await updateConversationIndex(updated);
            } catch (err) {
                console.error("Erro ao atualizar índice no Elasticsearch:", err);
            }
            // Tenta enfileirar a tarefa; se falhar, log apenas o erro
            try {
                enqueueTask('processConversation', { conversationId: updated._id, title, messages });
            } catch (err) {
                console.error("Erro ao enfileirar tarefa:", err);
            }
            return res.json(updated);
        } else {
            const newConversation: IConversation = new Conversation({ title, messages });
            await newConversation.save();
            // Tenta indexar a nova conversa no Elasticsearch
            try {
                await indexConversation(newConversation);
            } catch (err) {
                console.error("Erro ao indexar nova conversa:", err);
            }
            // Tenta enfileirar a tarefa
            try {
                enqueueTask('processConversation', { conversationId: newConversation._id, title, messages });
            } catch (err) {
                console.error("Erro ao enfileirar tarefa:", err);
            }
            return res.status(201).json(newConversation);
        }
    } catch (err: any) {
        console.error("Erro ao processar a conversa:", err);
        return res.status(500).json({ message: 'Erro ao processar a conversa', error: err.message });
    }
});


// Exclusão de conversa
// src/routes/chat.ts
router.delete('/conversations/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const deleted = await Conversation.findByIdAndDelete(id);
        if (!deleted) {
            return res.status(404).json({ message: 'Conversa não encontrada' });
        }
        // Tenta remover a conversa do Elasticsearch; se não existir, ignoramos o erro
        try {
            await deleteConversationIndex(id);
        } catch (err: any) {
            // Se o erro indicar que o documento não foi encontrado (ex.: 404), apenas logamos
            if (err.meta && err.meta.statusCode === 404) {
                console.warn("Documento não encontrado no Elasticsearch, ignorando.");
            } else {
                console.error("Erro ao remover documento do Elasticsearch:", err);
            }
        }
        return res.json({ message: 'Conversa excluída' });
    } catch (err: any) {
        console.error("Erro ao excluir conversa:", err);
        return res.status(500).json({ message: 'Erro ao excluir conversa', error: err.message });
    }
});


export default router;
