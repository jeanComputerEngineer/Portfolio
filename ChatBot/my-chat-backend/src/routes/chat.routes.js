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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var conversation_model_1 = require("../models/conversation.model");
var router = (0, express_1.Router)();
var chatJobQueue = [];
var chatJobResults = {};
// Endpoint para enfileirar o job
router.post("/async", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, messages, model, jobId;
    return __generator(this, function (_b) {
        if (!req.user) {
            res.status(401).json({ message: "Não autorizado" });
            return [2 /*return*/];
        }
        _a = req.body, messages = _a.messages, model = _a.model;
        jobId = Date.now().toString() + Math.random().toString(36).substring(2);
        chatJobQueue.push({ jobId: jobId, messages: messages, model: model });
        res.json({ jobId: jobId, message: "Job enfileirado" });
        return [2 /*return*/];
    });
}); });
// Endpoint para consultar o resultado do job
router.get("/result", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var jobId;
    return __generator(this, function (_a) {
        jobId = req.query.jobId;
        if (!jobId || typeof jobId !== "string") {
            return [2 /*return*/];
        }
        if (chatJobResults[jobId]) {
            res.json({ status: "completed", data: chatJobResults[jobId] });
            // (Opcional) Remove o resultado após o fetch
            delete chatJobResults[jobId];
        }
        else {
            res.json({ status: "processing" });
        }
        return [2 /*return*/];
    });
}); });
// Processador de jobs (executa periodicamente)
setInterval(function () { return __awaiter(void 0, void 0, void 0, function () {
    var job, requestBody, response, data, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!(chatJobQueue.length > 0)) return [3 /*break*/, 5];
                job = chatJobQueue.shift();
                if (!job) return [3 /*break*/, 5];
                requestBody = {
                    model: job.model || "deepseek/deepseek-r1:free",
                    messages: job.messages.map(function (msg) { return ({
                        role: msg.role,
                        content: msg.content,
                    }); }),
                    top_p: 1,
                    temperature: 0.85,
                    repetition_penalty: 1,
                };
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                return [4 /*yield*/, fetch("https://openrouter.ai/api/v1/chat/completions", {
                        method: "POST",
                        headers: {
                            "Authorization": "Bearer SEU_TOKEN_AQUI", // mantenha o token já utilizado
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(requestBody),
                    })];
            case 2:
                response = _a.sent();
                return [4 /*yield*/, response.json()];
            case 3:
                data = _a.sent();
                chatJobResults[job.jobId] = data;
                return [3 /*break*/, 5];
            case 4:
                error_1 = _a.sent();
                chatJobResults[job.jobId] = { error: "Erro na API" };
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); }, 3000); // Processa um job a cada 3 segundos
router.get("/metrics", function (req, res) {
    var metrics = {
        uptime: process.uptime(),
        memoryUsage: process.memoryUsage(),
    };
    res.json(metrics);
});
// Rota para chamada do chat (já existente)
router.post("/", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, messages, model, requestBody, response, data, error_2;
    var _b, _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                _a = req.body, messages = _a.messages, model = _a.model;
                requestBody = {
                    model: model || "deepseek/deepseek-r1:free",
                    messages: messages.map(function (msg) { return ({
                        role: msg.role,
                        content: msg.content,
                    }); }),
                    top_p: 1,
                    temperature: 0.85,
                    repetition_penalty: 1,
                };
                _d.label = 1;
            case 1:
                _d.trys.push([1, 4, , 5]);
                return [4 /*yield*/, fetch("https://openrouter.ai/api/v1/chat/completions", {
                        method: "POST",
                        headers: {
                            "Authorization": "Bearer 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",
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(requestBody),
                    })];
            case 2:
                response = _d.sent();
                return [4 /*yield*/, response.json()];
            case 3:
                data = _d.sent();
                console.log("Resposta do OpenRouter:", data);
                if (!data.choices || !((_b = data.choices[0]) === null || _b === void 0 ? void 0 : _b.message) || !((_c = data.choices[0].message.content) === null || _c === void 0 ? void 0 : _c.trim())) {
                    res.json({
                        choices: [
                            {
                                index: 0,
                                message: {
                                    role: "assistant",
                                    content: "A API falhou, por favor, escreva sua mensagem novamente",
                                },
                                finish_reason: "stop",
                            },
                        ],
                    });
                    return [2 /*return*/];
                }
                res.json(data);
                return [3 /*break*/, 5];
            case 4:
                error_2 = _d.sent();
                console.error("Erro na API:", error_2);
                res.status(500).json({ error: "Erro na API" });
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); });
// Rota de criação e atualização via POST (já existente)
router.post("/conversations", function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, conversationId, title, messages, updated, newConv, error_3;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                if (!req.user) {
                    res.status(401).json({ message: "Não autorizado" });
                    return [2 /*return*/];
                }
                _a = req.body, conversationId = _a.conversationId, title = _a.title, messages = _a.messages;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 6, , 7]);
                if (!conversationId) return [3 /*break*/, 3];
                return [4 /*yield*/, conversation_model_1.Conversation.findOneAndUpdate({ _id: conversationId, accountId: req.user._id }, { title: title, messages: messages }, { new: true })];
            case 2:
                updated = _b.sent();
                if (!updated) {
                    res.status(404).json({ message: "Conversa não encontrada" });
                    return [2 /*return*/];
                }
                res.json(updated);
                return [3 /*break*/, 5];
            case 3:
                newConv = new conversation_model_1.Conversation({
                    accountId: req.user._id,
                    title: title,
                    messages: messages,
                });
                return [4 /*yield*/, newConv.save()];
            case 4:
                _b.sent();
                res.json(newConv);
                _b.label = 5;
            case 5: return [3 /*break*/, 7];
            case 6:
                error_3 = _b.sent();
                console.error("Erro na criação/atualização da conversa:", error_3);
                res.status(500).json({ message: "Erro ao salvar a conversa" });
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/];
        }
    });
}); });
// Rota GET para listar conversas (já existente)
router.get("/conversations", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var page, limit, skip, conversations, total, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!req.user) {
                    return [2 /*return*/];
                }
                page = parseInt(req.query.page) || 1;
                limit = parseInt(req.query.limit) || 10;
                skip = (page - 1) * limit;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                return [4 /*yield*/, conversation_model_1.Conversation.find({ accountId: req.user._id })
                        .sort({ createdAt: -1 })
                        .skip(skip)
                        .limit(limit)];
            case 2:
                conversations = _a.sent();
                return [4 /*yield*/, conversation_model_1.Conversation.countDocuments({ accountId: req.user._id })];
            case 3:
                total = _a.sent();
                res.json({ conversations: conversations, total: total, page: page, limit: limit });
                return [3 /*break*/, 5];
            case 4:
                error_4 = _a.sent();
                console.error("Erro ao buscar conversas:", error_4);
                res.status(500).json({ message: "Erro ao buscar conversas" });
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); });
// ===== Rota PUT para edição da conversa =====
router.put("/conversations/:conversationId", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var conversationId, _a, title, messages, updated, error_5;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                if (!req.user) {
                    res.status(401).json({ message: "Não autorizado" });
                    return [2 /*return*/];
                }
                conversationId = req.params.conversationId;
                _a = req.body, title = _a.title, messages = _a.messages;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, conversation_model_1.Conversation.findOneAndUpdate({ _id: conversationId, accountId: req.user._id }, { title: title, messages: messages }, { new: true })];
            case 2:
                updated = _b.sent();
                if (!updated) {
                    res.status(404).json({ message: "Conversa não encontrada" });
                    return [2 /*return*/];
                }
                res.json(updated);
                return [3 /*break*/, 4];
            case 3:
                error_5 = _b.sent();
                console.error("Erro ao atualizar conversa:", error_5);
                res.status(500).json({ message: "Erro ao atualizar conversa" });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
// ===== Rota DELETE para exclusão da conversa =====
router.delete("/conversations/:conversationId", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var conversationId, deleted, error_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!req.user) {
                    res.status(401).json({ message: "Não autorizado" });
                    return [2 /*return*/];
                }
                conversationId = req.params.conversationId;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, conversation_model_1.Conversation.findOneAndDelete({
                        _id: conversationId,
                        accountId: req.user._id,
                    })];
            case 2:
                deleted = _a.sent();
                if (!deleted) {
                    res.status(404).json({ message: "Conversa não encontrada" });
                    return [2 /*return*/];
                }
                res.json({ message: "Conversa excluída com sucesso" });
                return [3 /*break*/, 4];
            case 3:
                error_6 = _a.sent();
                console.error("Erro ao excluir conversa:", error_6);
                res.status(500).json({ message: "Erro ao excluir conversa" });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
exports.default = router;
