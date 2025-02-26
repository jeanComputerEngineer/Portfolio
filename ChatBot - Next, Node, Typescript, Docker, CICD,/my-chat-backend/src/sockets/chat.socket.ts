import { Server } from "socket.io";
import http from "http";

export const initSocket = (server: http.Server) => {
    const io = new Server(server, {
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
