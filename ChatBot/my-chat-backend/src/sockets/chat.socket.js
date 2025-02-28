"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initSocket = void 0;
var socket_io_1 = require("socket.io");
var initSocket = function (server) {
    var io = new socket_io_1.Server(server, {
        cors: {
            origin: "*", // Ajuste conforme necessário
            methods: ["GET", "POST"]
        }
    });
    io.on("connection", function (socket) {
        console.log("Usuário conectado:", socket.id);
        socket.on("chat message", function (msg) {
            // Aqui você pode salvar a mensagem no histórico ou emitir para os clientes conectados
            io.emit("chat message", msg);
        });
        socket.on("disconnect", function () {
            console.log("Usuário desconectado:", socket.id);
        });
    });
    return io;
};
exports.initSocket = initSocket;
