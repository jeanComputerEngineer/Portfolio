// src/workers/queueWorker.ts
import { connectRabbitMQ } from '../services/rabbitmqClient';
import { ConsumeMessage } from 'amqplib';

export async function startWorker(): Promise<void> {
    const { connection, channel } = await connectRabbitMQ();
    const queue = 'processConversation';
    await channel.assertQueue(queue, { durable: true });
    console.log(`Worker aguardando mensagens na fila "${queue}"...`);

    channel.consume(queue, (msg: ConsumeMessage | null) => {
        if (msg) {
            const content = msg.content.toString();
            console.log(`Mensagem recebida na fila "${queue}":`, content);
            // Aqui você implementa o processamento da tarefa
            channel.ack(msg);
        }
    });
}

startWorker().catch((err) => console.error('Erro no worker:', err));
