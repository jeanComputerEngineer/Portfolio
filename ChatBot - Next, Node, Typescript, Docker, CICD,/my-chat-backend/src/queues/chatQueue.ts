// Remova ou comente essa linha se existir:
// import fetch from "node-fetch";

import Bull from "bull";

// Cria a fila utilizando a conexão do Redis
export const chatQueue = new Bull('chatQueue', {
    redis: { host: 'localhost', port: 6379 },
});

// Processa cada job da fila
chatQueue.process(async (job) => {
    const { messages, model } = job.data;
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

    // Importação dinâmica do node-fetch
    const { default: fetch } = await import("node-fetch");

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
            "Authorization": "Bearer YOUR_API_KEY", // Substitua pela sua chave de API
            "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
    });
    const data = await response.json();
    return data;
});
