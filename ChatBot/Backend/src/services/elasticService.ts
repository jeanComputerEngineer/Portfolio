import elasticClient from "./elasticClient";

const INDEX_NAME = "conversations";

async function ensureIndexExists(): Promise<void> {
    // Verifica se o índice existe; caso não, cria-o.
    const existsResponse = (await elasticClient.indices.exists({ index: INDEX_NAME })) as any;
    if (!existsResponse.body) {
        await elasticClient.indices.create({ index: INDEX_NAME });
    }
}

/**
 * Indexa uma nova conversa.
 */
export async function indexConversation(conversation: any): Promise<void> {
    await ensureIndexExists();
    await elasticClient.index({
        index: INDEX_NAME,
        id: conversation._id.toString(),
        body: {
            title: conversation.title,
            messages: conversation.messages,
            createdAt: conversation.createdAt,
            updatedAt: conversation.updatedAt,
        },
    });
}

/**
 * Atualiza uma conversa já indexada.
 */
export async function updateConversationIndex(conversation: any): Promise<void> {
    await ensureIndexExists();
    await elasticClient.update({
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
}

/**
 * Remove uma conversa do índice.
 */
export async function deleteConversationIndex(conversationId: string): Promise<void> {
    try {
        await elasticClient.delete({
            index: INDEX_NAME,
            id: conversationId,
        });
    } catch (err: any) {
        // Se o status for 404, o documento não existe; apenas logamos e seguimos
        if (err.meta && err.meta.statusCode === 404) {
            console.warn("Documento não encontrado no Elasticsearch, ignorando.");
        } else {
            throw err; // para outros erros, lançamos a exceção
        }
    }
}


/**
 * Realiza a busca de conversas com base em um parâmetro.
 */
export async function searchConversations(query: string): Promise<any[]> {
    await ensureIndexExists();
    const searchResponse = (await elasticClient.search({
        index: INDEX_NAME,
        body: {
            query: {
                multi_match: {
                    query,
                    fields: ["title", "messages.content"],
                },
            },
        },
    })) as any;
    const hits = searchResponse.body.hits?.hits || [];
    return hits.map((hit: any) => ({
        ...hit._source,
        id: hit._id,
    }));
}
