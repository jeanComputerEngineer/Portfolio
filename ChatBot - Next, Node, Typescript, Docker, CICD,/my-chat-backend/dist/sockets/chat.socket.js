"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initSocket = void 0;
const socket_io_1 = require("socket.io");
const initSocket = (server) => {
    const io = new socket_io_1.Server(server, {
        cors: {
            origin: "*", // Ajuste conforme necessário
            methods: ["GET", "POST"]
        }
    });
    io.on("connection", (socket) => {
        console.log("Usuário conectado:", socket.id);
        socket.on("chat message", (msg) => {
            // Aqui você pode salvar a mensagem no histórico ou emitir para os clientes conectados
            io.emit("chat message", msg);
        });
        socket.on("disconnect", () => {
            console.log("Usuário desconectado:", socket.id);
        });
    });
    return io;
};
exports.initSocket = initSocket;
