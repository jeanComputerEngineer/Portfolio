import { Router, Request, Response, NextFunction } from "express";
import { Conversation } from "../models/conversation.model";
import { redisClient } from "../config/redis";

const router = Router();

// Rota para chamada do chat (sincrona)
router.post("/async", async (req: Request, res: Response): Promise<void> => {
    if (!req.user) {
        res.status(401).json({ message: "Não autorizado" });
        return;
    }
    const { messages, model } = req.body;
    const requestBody = {
        model: model || "deepseek/deepseek-r1:free",
        messages: messages.map((msg: { role: string; content: string }) => ({
            role: msg.role,
            content: msg.content,
        })),
        top_p: 1,
        temperature: 0.85,
        repetition_penalty: 1,
    };

    try {
        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                // Utilize sua chave de API a partir de uma variável de ambiente, por exemplo:
                "Authorization": `Bearer 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`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(requestBody),

        });
        const data = await response.json();
        console.log("Resposta do OpenRouter:", data);

        if (!data.choices || !data.choices[0]?.message || !data.choices[0].message.content?.trim()) {
            res.json({
                choices: [
                    {
                        index: 0,
                        message: {
                            role: "assistant",
                            content: "A API falhou, por favor, escreva sua mensagem novamente",
                        },
                        finish_reason: "stop",
                    },
                ],
            });
            return;
        }

        res.json(data);
    } catch (error) {
        console.error("Erro na API:", error);
        res.status(500).json({ error: "Erro na API" });
    }
});

// Outras rotas (conversations, etc) permanecem inalteradas
router.post("/conversations", async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    if (!req.user) {
        res.status(401).json({ message: "Não autorizado" });
        return;
    }
    const { conversationId, title, messages } = req.body;
    try {
        if (conversationId) {
            const updated = await Conversation.findOneAndUpdate(
                { _id: conversationId, accountId: (req.user as any)._id },
                { title, messages },
                { new: true }
            );
            if (!updated) {
                res.status(404).json({ message: "Conversa não encontrada" });
                return;
            }
            res.json(updated);
        } else {
            const newConv = new Conversation({
                accountId: (req.user as any)._id,
                title,
                messages,
            });
            await newConv.save();
            res.json(newConv);
        }
    } catch (error) {
        console.error("Erro na criação/atualização da conversa:", error);
        res.status(500).json({ message: "Erro ao salvar a conversa" });
    }
});

// Rota GET para listar conversas
router.get("/conversations", async (req: Request, res: Response): Promise<void> => {
    if (!req.user) {
        return;
    }
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;
    try {
        const conversations = await Conversation.find({ accountId: (req.user as any)._id })
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);
        const total = await Conversation.countDocuments({ accountId: (req.user as any)._id });
        res.json({ conversations, total, page, limit });
    } catch (error) {
        console.error("Erro ao buscar conversas:", error);
        res.status(500).json({ message: "Erro ao buscar conversas" });
    }
});

// Rota PUT para edição da conversa
router.put("/conversations/:conversationId", async (req: Request, res: Response): Promise<void> => {
    if (!req.user) {
        res.status(401).json({ message: "Não autorizado" });
        return;
    }
    const { conversationId } = req.params;
    const { title, messages } = req.body;
    try {
        const updated = await Conversation.findOneAndUpdate(
            { _id: conversationId, accountId: (req.user as any)._id },
            { title, messages },
            { new: true }
        );
        if (!updated) {
            res.status(404).json({ message: "Conversa não encontrada" });
            return;
        }
        res.json(updated);
    } catch (error) {
        console.error("Erro ao atualizar conversa:", error);
        res.status(500).json({ message: "Erro ao atualizar conversa" });
    }
});

// Rota DELETE para exclusão da conversa
router.delete("/conversations/:conversationId", async (req: Request, res: Response): Promise<void> => {
    if (!req.user) {
        res.status(401).json({ message: "Não autorizado" });
        return;
    }
    const { conversationId } = req.params;
    try {
        const deleted = await Conversation.findOneAndDelete({
            _id: conversationId,
            accountId: (req.user as any)._id,
        });
        if (!deleted) {
            res.status(404).json({ message: "Conversa não encontrada" });
            return;
        }
        res.json({ message: "Conversa excluída com sucesso" });
    } catch (error) {
        console.error("Erro ao excluir conversa:", error);
        res.status(500).json({ message: "Erro ao excluir conversa" });
    }
});

export default router;
