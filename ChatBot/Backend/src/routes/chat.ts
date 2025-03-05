// src/routes/chat.ts
import { Router } from 'express';
import Conversation, { IConversation } from '../models/Conversation';
import { enqueueTask } from '../services/queueService';

const router = Router();

// Busca de conversas
router.get('/conversations', async (req, res) => {
    try {
        const limit = parseInt(req.query.limit as string) || 100;
        // Em uma aplicação real, filtre as conversas do usuário
        const conversations = await Conversation.find().limit(limit).sort({ createdAt: -1 });
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
            // Atualiza a conversa existente
            const updated = await Conversation.findByIdAndUpdate(
                conversationId,
                { title, messages },
                { new: true }
            );
            if (!updated) {
                return res.status(404).json({ message: 'Conversa não encontrada' });
            }
            // Enfileira uma tarefa para processamento extra (exemplo)
            enqueueTask('processConversation', { conversationId: updated._id, title, messages });
            res.json(updated);
        } else {
            // Cria nova conversa
            const newConversation: IConversation = new Conversation({ title, messages });
            await newConversation.save();
            // Enfileira uma tarefa para a nova conversa
            enqueueTask('processConversation', { conversationId: newConversation._id, title, messages });
            res.status(201).json(newConversation);
        }
    } catch (err) {
        res.status(500).json({ message: 'Erro ao processar a conversa', error: err });
    }
});

// Exclusão de conversa
router.delete('/conversations/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const deleted = await Conversation.findByIdAndDelete(id);
        if (!deleted) {
            return res.status(404).json({ message: 'Conversa não encontrada' });
        }
        res.json({ message: 'Conversa excluída' });
    } catch (err) {
        res.status(500).json({ message: 'Erro ao excluir conversa', error: err });
    }
});

export default router;
