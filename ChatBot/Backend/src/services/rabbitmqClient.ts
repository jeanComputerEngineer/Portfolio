// src/services/rabbitmqClient.ts
import amqp from 'amqplib';

const rabbitmqUrl = process.env.RABBITMQ_URL || 'amqp://localhost';

export async function connectRabbitMQ() {
    try {
        const connection = await amqp.connect(rabbitmqUrl);
        const channel = await connection.createChannel();
        console.log('Conectado ao RabbitMQ');
        return { connection, channel };
    } catch (error) {
        console.error('Erro ao conectar no RabbitMQ', error);
        throw error;
    }
}
