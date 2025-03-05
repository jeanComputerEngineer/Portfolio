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
Object.defineProperty(exports, "__esModule", { value: true });
exports.startWorker = startWorker;
// src/workers/queueWorker.ts
const rabbitmqClient_1 = require("../services/rabbitmqClient");
function startWorker() {
    return __awaiter(this, void 0, void 0, function* () {
        const { connection, channel } = yield (0, rabbitmqClient_1.connectRabbitMQ)();
        const queue = 'processConversation';
        yield channel.assertQueue(queue, { durable: true });
        console.log(`Worker aguardando mensagens na fila "${queue}"...`);
        channel.consume(queue, (msg) => {
            if (msg) {
                const content = msg.content.toString();
                console.log(`Mensagem recebida na fila "${queue}":`, content);
                // Aqui você implementa o processamento da tarefa
                channel.ack(msg);
            }
        });
    });
}
startWorker().catch((err) => console.error('Erro no worker:', err));
