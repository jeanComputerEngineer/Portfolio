// src/routes/chat.routes.ts
import { Router, Request, Response } from "express";

const router = Router();

router.post("/", async (req: Request, res: Response) => {
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
                "Authorization": "Bearer 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",
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

export default router;
