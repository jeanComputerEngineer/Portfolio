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
exports.enqueueTask = enqueueTask;
// src/services/queueService.ts
const rabbitmqClient_1 = require("./rabbitmqClient");
let channelPromise = null;
function getChannel() {
    return __awaiter(this, void 0, void 0, function* () {
        if (!channelPromise) {
            channelPromise = (0, rabbitmqClient_1.connectRabbitMQ)().then(({ channel }) => channel);
        }
        return channelPromise;
    });
}
/**
 * Enfileira uma tarefa na fila especificada.
 * @param queue Nome da fila.
 * @param message Objeto da mensagem.
 */
function enqueueTask(queue, message) {
    return __awaiter(this, void 0, void 0, function* () {
        const channel = yield getChannel();
        yield channel.assertQueue(queue, { durable: true });
        channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)), { persistent: true });
        console.log(`Tarefa enfileirada na fila "${queue}":`, message);
    });
}
