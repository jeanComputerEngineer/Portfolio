import type { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
    const { messages, model } = await request.json();
    // Cria o corpo da requisição para o OpenRouter
    const requestBody = {
        model: model || "deepseek/deepseek-r1:free",
        messages: messages.map((msg: { role: string; content: string }) => ({
            role: msg.role,
            content: msg.content
        })),
        top_p: 1,
        temperature: 0.85,
        repetition_penalty: 1
    };

    try {
        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": "Bearer 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",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(requestBody)
        });

        const data = await response.json();
        console.log("Resposta do OpenRouter:", data);

        // Verifica se data.choices existe e se a mensagem possui conteúdo
        if (!data.choices || !data.choices[0]?.message || !data.choices[0].message.content?.trim()) {
            return new Response(
                JSON.stringify({
                    choices: [
                        {
                            index: 0,
                            message: {
                                role: "assistant",
                                content: "A API falhou, por favor, escreva sua mensagem novamente"
                            },
                            finish_reason: "stop"
                        }
                    ]
                }),
                { headers: { "Content-Type": "application/json" } }
            );
        }

        return new Response(JSON.stringify(data), {
            headers: { "Content-Type": "application/json" }
        });
    } catch (error) {
        console.error("Erro na API:", error);
        return new Response(
            JSON.stringify({ error: "Erro na API" }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
}
