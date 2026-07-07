// src/services/queueService.ts
import { connectRabbitMQ } from './rabbitmqClient';

let channelPromise: Promise<any> | null = null;

async function getChannel() {
    if (!channelPromise) {
        channelPromise = connectRabbitMQ().then(({ channel }) => channel);
    }
    return channelPromise;
}

/**
 * Enfileira uma tarefa na fila especificada.
 * @param queue Nome da fila.
 * @param message Objeto da mensagem.
 */
export async function enqueueTask(queue: string, message: any) {
    const channel = await getChannel();
    await channel.assertQueue(queue, { durable: true });
    channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)), { persistent: true });
    console.log(`Tarefa enfileirada na fila "${queue}":`, message);
}
