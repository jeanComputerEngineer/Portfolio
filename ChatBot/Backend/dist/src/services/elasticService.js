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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.indexConversation = indexConversation;
exports.updateConversationIndex = updateConversationIndex;
exports.deleteConversationIndex = deleteConversationIndex;
exports.searchConversations = searchConversations;
const elasticClient_1 = __importDefault(require("./elasticClient"));
const INDEX_NAME = "conversations";
function ensureIndexExists() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const existsResponse = yield elasticClient_1.default.indices.exists({ index: INDEX_NAME });
            if (!existsResponse) {
                yield elasticClient_1.default.indices.create({ index: INDEX_NAME });
            }
        }
        catch (err) {
            // Se o erro indicar que o índice já existe, apenas ignore
            if (err.meta && err.meta.body && err.meta.body.error && err.meta.body.error.type === 'resource_already_exists_exception') {
                console.warn("Índice já existe, prosseguindo.");
            }
            else {
                throw err;
            }
        }
    });
}
/**
 * Indexa uma nova conversa.
 */
function indexConversation(conversation) {
    return __awaiter(this, void 0, void 0, function* () {
        yield ensureIndexExists();
        yield elasticClient_1.default.index({
            index: INDEX_NAME,
            id: conversation._id.toString(),
            body: {
                title: conversation.title,
                messages: conversation.messages,
                createdAt: conversation.createdAt,
                updatedAt: conversation.updatedAt,
            },
        });
    });
}
/**
 * Atualiza uma conversa já indexada.
 */
function updateConversationIndex(conversation) {
    return __awaiter(this, void 0, void 0, function* () {
        yield ensureIndexExists();
        yield elasticClient_1.default.update({
            index: INDEX_NAME,
            id: conversation._id.toString(),
            body: {
                doc: {
                    title: conversation.title,
                    messages: conversation.messages,
                    updatedAt: conversation.updatedAt,
                },
            },
        });
    });
}
/**
 * Remove uma conversa do índice.
 */
function deleteConversationIndex(conversationId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield elasticClient_1.default.delete({
                index: INDEX_NAME,
                id: conversationId,
            });
        }
        catch (err) {
            // Se o status for 404, o documento não existe; apenas logamos e seguimos
            if (err.meta && err.meta.statusCode === 404) {
                console.warn("Documento não encontrado no Elasticsearch, ignorando.");
            }
            else {
                throw err; // para outros erros, lançamos a exceção
            }
        }
    });
}
/**
 * Realiza a busca de conversas com base em um parâmetro.
 */
function searchConversations(query) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        yield ensureIndexExists();
        const searchResponse = (yield elasticClient_1.default.search({
            index: INDEX_NAME,
            body: {
                query: {
                    multi_match: {
                        query,
                        fields: ["title", "messages.content"],
                    },
                },
            },
        }));
        const hits = ((_a = searchResponse.body.hits) === null || _a === void 0 ? void 0 : _a.hits) || [];
        return hits.map((hit) => (Object.assign(Object.assign({}, hit._source), { id: hit._id })));
    });
}
