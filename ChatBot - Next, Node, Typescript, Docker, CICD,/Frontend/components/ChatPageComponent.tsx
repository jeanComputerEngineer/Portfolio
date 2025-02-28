"use client";
import React, { useEffect, useState, useRef, KeyboardEvent } from "react";
import { useRouter } from "next/navigation";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useTranslation } from "react-i18next";
import i18n from "@/components/i18n/i18n";
import { useTheme } from "@/context/ThemeContext";
import { FiSend, FiEdit, FiTrash, FiPlus, FiSearch } from "react-icons/fi";
import ReactMarkdown from "react-markdown";
import { io, Socket } from "socket.io-client";

interface Message {
    role: "user" | "assistant";
    content: string;
}

interface Conversation {
    _id: string;
    title: string;
    messages: Message[];
}

export interface ChatPageComponentProps {
    showConversations: boolean;
    toggleConversationsAction: () => void;
}

export default function ChatPageComponent({
    showConversations,
    toggleConversationsAction,
}: ChatPageComponentProps) {
    const router = useRouter();
    const { t } = useTranslation();
    const { darkMode } = useTheme();

    const [user, setUser] = useState<{ name: string; preferredLanguage: string } | null>(null);
    const [model, setModel] = useState("deepseek/deepseek-r1:free");
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [conversations, setConversations] = useState<Conversation[]>([]);
    const [currentConversationId, setCurrentConversationId] = useState<string | null>(null);

    // Estados para paginação, edição e busca
    const [page, setPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(7);
    const [editingConversationId, setEditingConversationId] = useState<string | null>(null);
    const [editingTitle, setEditingTitle] = useState("");
    const [searchActive, setSearchActive] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    const messagesEndRef = useRef<HTMLDivElement>(null);
    const [socket, setSocket] = useState<Socket | null>(null);

    // Token CSRF
    const [csrfToken, setCsrfToken] = useState("");

    useEffect(() => {
        fetch("http://localhost:5000/csrf-token", { credentials: "include" })
            .then((res) => res.json())
            .then((data) => {
                setCsrfToken(data.csrfToken);
            })
            .catch((err) => console.error("Erro ao buscar CSRF token:", err));
    }, []);

    // Conecta ao Socket.IO na montagem
    useEffect(() => {
        const socketClient = io("http://localhost:5000");
        setSocket(socketClient);

        // Escuta novas mensagens
        socketClient.on("chat message", (msg: Message) => {
            setMessages((prev) => [...prev, msg]);
        });

        return () => {
            socketClient.disconnect();
        };
    }, []);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            const parsed = JSON.parse(storedUser);
            setUser(parsed);
            i18n.changeLanguage(parsed.preferredLanguage || "Português");
            fetchConversations();
        }
    }, []);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, isLoading]);

    useEffect(() => {
        const updateItemsPerPage = () => {
            const newItems = Math.floor(window.innerHeight / 70);
            setItemsPerPage(newItems);
        };
        updateItemsPerPage();
        window.addEventListener("resize", updateItemsPerPage);
        return () => window.removeEventListener("resize", updateItemsPerPage);
    }, []);

    useEffect(() => {
        setPage(1);
    }, [searchQuery]);

    const filteredConversations = searchQuery
        ? conversations.filter((conv) =>
            conv.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            conv.messages.some((msg) =>
                msg.content.toLowerCase().includes(searchQuery.toLowerCase())
            )
        )
        : conversations;

    const totalPages = Math.ceil(filteredConversations.length / itemsPerPage);
    const displayedConversations = filteredConversations.slice(
        (page - 1) * itemsPerPage,
        page * itemsPerPage
    );

    const fetchConversations = async () => {
        try {
            const res = await fetch("http://localhost:5000/api/chat/conversations?limit=1000", {
                credentials: "include",
            });
            const data = await res.json();
            if (data.conversations) {
                setConversations(data.conversations);
            }
        } catch (error) {
            console.error("Erro ao buscar conversas:", error);
        }
    };

    const handleNewConversation = async () => {
        const newConv: Conversation = {
            _id: Date.now().toString(),
            title: "Nova Conversa",
            messages: [],
        };
        try {
            const res = await fetch("http://localhost:5000/api/chat/conversations", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRF-Token": csrfToken // Enviando o token CSRF
                },
                credentials: "include",
                body: JSON.stringify({
                    title: newConv.title,
                    messages: [],
                }),
            });
            const data = await res.json();
            setConversations((prev) => [data as Conversation, ...prev]);
            setCurrentConversationId((data as Conversation)._id);
            setMessages([]);
            toggleConversationsAction();
        } catch (error) {
            console.error("Erro ao criar nova conversa:", error);
            alert("Erro ao criar nova conversa. Verifique se o servidor está em execução e se não há problemas de CORS.");
        }
    };

    const handleSelectConversation = (convId: string) => {
        setCurrentConversationId(convId);
        const conv = conversations.find((c) => c._id === convId);
        if (conv) {
            setMessages(conv.messages);
        }
        toggleConversationsAction();
    };

    const updateConversationInBackend = async (conversationId: string, title: string, messages: Message[]) => {
        try {
            await fetch("http://localhost:5000/api/chat/conversations", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRF-Token": csrfToken // Enviando o token CSRF
                },
                credentials: "include",
                body: JSON.stringify({ conversationId, title, messages }),
            });
        } catch (error) {
            console.error("Erro ao atualizar conversa:", error);
        }
    };

    const handleUpdateConversationTitle = async (convId: string) => {
        setConversations((prev) =>
            prev.map((conv) => (conv._id === convId ? { ...conv, title: editingTitle } : conv))
        );
        if (convId === currentConversationId) {
            const currentConv = conversations.find((conv) => conv._id === convId);
            if (currentConv) {
                await updateConversationInBackend(convId, editingTitle, currentConv.messages);
            }
        } else {
            const conv = conversations.find((conv) => conv._id === convId);
            if (conv) {
                await updateConversationInBackend(convId, editingTitle, conv.messages);
            }
        }
        setEditingConversationId(null);
        setEditingTitle("");
    };

    const handleEditKeyDown = (e: KeyboardEvent<HTMLInputElement>, convId: string) => {
        if (e.key === "Enter") {
            handleUpdateConversationTitle(convId);
        }
    };

    const handleDeleteConversation = async (convId: string) => {
        if (!window.confirm("Tem certeza que deseja excluir esta conversa?")) return;
        try {
            const res = await fetch(`http://localhost:5000/api/chat/conversations/${convId}`, {
                method: "DELETE",
                headers: {
                    "X-CSRF-Token": csrfToken // Enviando o token CSRF também para DELETE
                },
                credentials: "include",
            });
            if (res.ok) {
                setConversations((prev) => prev.filter((conv) => conv._id !== convId));
                if (currentConversationId === convId) {
                    setCurrentConversationId(null);
                    setMessages([]);
                }
            } else {
                alert("Erro ao excluir a conversa.");
            }
        } catch (error) {
            console.error("Erro ao excluir a conversa:", error);
        }
    };

    // Ao enviar uma mensagem, além de fazer a requisição REST, também emite via WebSocket
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMessage: Message = { role: "user", content: input };
        const updatedMessages = [...messages, userMessage];
        setMessages(updatedMessages);
        setIsLoading(true);
        setInput("");

        // Emite a mensagem via socket, se necessário
        if (socket) {
            socket.emit("chat message", userMessage);
        }

        try {
            // Enfileira o job chamando a rota /async
            const asyncRes = await fetch("http://localhost:5000/api/chat/async", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRF-Token": csrfToken
                },
                credentials: "include",
                body: JSON.stringify({ messages: updatedMessages, model }),
            });
            const asyncData = await asyncRes.json();
            const jobId = asyncData.jobId;

            // Função para fazer polling do resultado
            const pollJobResult = async (jobId: string): Promise<any> => {
                const resultRes = await fetch(`http://localhost:5000/api/chat/result?jobId=${jobId}`, {
                    credentials: "include",
                });
                const resultData = await resultRes.json();
                // Se ainda estiver processando, aguarda 2 segundos e tenta novamente
                if (resultData.status === "processing") {
                    await new Promise(resolve => setTimeout(resolve, 2000));
                    return pollJobResult(jobId);
                } else {
                    return resultData.data;
                }
            };

            // Aguarda o job finalizar e obtem a resposta
            const data = await pollJobResult(jobId);

            // Verifica se a resposta é válida
            const assistantContent = data.choices && data.choices[0]?.message?.content?.trim()
                ? data.choices[0].message.content.trim()
                : "A API falhou, por favor, escreva sua mensagem novamente";
            const assistantMessage: Message = { role: "assistant", content: assistantContent };
            const newMessages = [...updatedMessages, assistantMessage];
            setMessages(newMessages);

            // Atualiza a conversa no backend, se aplicável
            if (currentConversationId) {
                setConversations(prev =>
                    prev.map(c =>
                        c._id === currentConversationId ? { ...c, messages: newMessages } : c
                    )
                );
                updateConversationInBackend(
                    currentConversationId,
                    conversations.find(c => c._id === currentConversationId)?.title || "",
                    newMessages
                );
            }
        } catch (error) {
            console.error("Erro ao buscar resposta:", error);
            setErrorMessage("Erro ao buscar resposta.");
        } finally {
            setIsLoading(false);
        }
    };


    return (
        <ProtectedRoute>
            <div className={`flex ${darkMode ? "bg-[#0d0d0d]" : "bg-gray-50"} overflow-hidden`}>
                <aside className={`
                    flex-shrink-0 fixed md:static inset-y-0 left-0 z-60 w-3/4 max-w-xs ${darkMode ? "bg-[#0d0d0d]" : "bg-white"}
                    p-4 shadow-lg transform transition-transform duration-300 ease-in-out ${showConversations ? "translate-x-0" : "-translate-x-full"}
                    md:w-1/4 md:translate-x-0 mt-16 sm:mt-0
                `}>
                    <div className="flex items-center justify-between mb-4">
                        <button onClick={() => setSearchActive(true)} title="Buscar conversas e mensagens" className="p-1">
                            <FiSearch size={20} className="text-gray-500" />
                        </button>
                        <h2 className={`text-lg font-semibold ${darkMode ? "text-gray-100" : "text-gray-800"}`}>
                            Conversas
                        </h2>
                        <button onClick={handleNewConversation} title="Nova conversa" className="p-1">
                            <FiPlus size={20} className="text-green-500" />
                        </button>
                    </div>
                    {searchActive && (
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onKeyDown={(e) => { if (e.key === "Enter") setSearchActive(false); }}
                            placeholder="Buscar conversas e mensagens..."
                            className={`w-full p-2 mb-4 rounded border focus:outline-none ${darkMode ? "bg-gray-700 text-gray-100 border-gray-600" : "bg-gray-100 text-gray-800 border-gray-300"}`}
                        />
                    )}
                    <div className="space-y-2 pb-4 mb-6 max-h-[60vh] overflow-hidden">
                        {displayedConversations.map((conv) => (
                            <div
                                key={conv._id}
                                className={`flex items-center justify-between p-2 rounded cursor-pointer ${conv._id === currentConversationId ? "bg-blue-600 text-white hover:bg-blue-500" : darkMode ? "bg-gray-900 text-gray-100 hover:bg-gray-800" : "bg-gray-100 text-gray-800 hover:bg-gray-200"}`}
                                onClick={() => handleSelectConversation(conv._id)}
                            >
                                <div className="flex-grow">
                                    {editingConversationId === conv._id ? (
                                        <input
                                            type="text"
                                            value={editingTitle}
                                            onChange={(e) => setEditingTitle(e.target.value)}
                                            onKeyDown={(e) => handleEditKeyDown(e, conv._id)}
                                            onBlur={() => handleUpdateConversationTitle(conv._id)}
                                            className="w-full p-1 rounded bg-transparent border border-dashed"
                                            autoFocus
                                        />
                                    ) : (
                                        <span>{conv.title}</span>
                                    )}
                                </div>
                                <div className="flex space-x-2 ml-2">
                                    <FiEdit
                                        size={16}
                                        className="cursor-pointer hover:text-blue-400"
                                        onClick={(e) => { e.stopPropagation(); setEditingConversationId(conv._id); setEditingTitle(conv.title); }}
                                    />
                                    <FiTrash
                                        size={16}
                                        className="cursor-pointer hover:text-red-400"
                                        onClick={(e) => { e.stopPropagation(); handleDeleteConversation(conv._id); }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                    {totalPages > 1 && (
                        <div className="flex items-center justify-between px-2 mb-2">
                            {page > 1 ? (
                                <button onClick={() => setPage((p) => p - 1)} className="px-3 py-2 bg-gray-300 dark:bg-gray-700 rounded text-sm">
                                    Anterior
                                </button>
                            ) : (
                                <div className="w-[80px]" />
                            )}
                            <span className={`text-sm whitespace-nowrap ${darkMode ? "text-gray-100" : "text-gray-800"}`}>
                                Página {page} de {totalPages}
                            </span>
                            <button onClick={() => setPage((p) => (p < totalPages ? p + 1 : p))} className="px-3 py-2 bg-gray-300 dark:bg-gray-700 rounded text-sm">
                                Próxima
                            </button>
                        </div>
                    )}
                </aside>

                <section className="flex flex-col w-full h-full md:ml-0 md:static max-h-[83vh]">
                    <div className="p-4">
                        <select
                            value={model}
                            onChange={(e) => setModel(e.target.value)}
                            className={`p-2 rounded-md border text-sm ${darkMode ? "border-gray-700 bg-gray-700 text-gray-100" : "border-gray-300 bg-gray-100 text-gray-900"}`}
                        >
                            <option value="deepseek/deepseek-chat:free">DeepSeek Chat</option>
                        </select>
                    </div>

                    <div
                        className={`flex-grow overflow-y-auto border rounded-md p-2 mx-4 h-[70vh] ${darkMode ? "bg-[#0d0d0d] text-gray-100 border-gray-700" : "bg-gray-50 text-gray-800 border-gray-300"}`}
                        role="log"
                        aria-live="polite"
                    >
                        {messages.length === 0 ? (
                            <div className="mb-3 w-full">
                                <p className="text-sm">{t("sugestoes") || "Recomendações de prompt:"}</p>
                                <div className="w-full flex flex-wrap gap-2 mt-2">
                                    <button className="cursor-pointer transition-colors duration-300 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 px-3 py-1 rounded text-sm" onClick={() => setInput("Olá, tudo bem?")}>
                                        Olá, tudo bem?
                                    </button>
                                    <button className="cursor-pointer transition-colors duration-300 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 px-3 py-1 rounded text-sm" onClick={() => setInput("Conte uma piada")}>
                                        Conte uma piada
                                    </button>
                                    <button className="cursor-pointer transition-colors duration-300 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 px-3 py-1 rounded text-sm" onClick={() => setInput("Qual é a previsão do tempo?")}>
                                        Qual é a previsão do tempo?
                                    </button>
                                </div>
                            </div>
                        ) : (
                            messages.map((msg, index) => (
                                <div key={index} className={`mb-3 flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                                    <div className={`max-w-[70%] p-3 rounded-lg shadow-md text-sm ${msg.role === "user" ? darkMode ? "bg-blue-600 text-white" : "bg-blue-100 text-blue-900" : darkMode ? "bg-gray-700 text-white" : "bg-gray-200 text-gray-900"}`}>
                                        <ReactMarkdown className="whitespace-pre-line">{msg.content}</ReactMarkdown>
                                    </div>
                                </div>
                            ))
                        )}
                        {isLoading && (
                            <div className="flex justify-center mt-2">
                                <div className="flex items-center space-x-2 animate-pulse">
                                    <div className="w-3 h-3 bg-gray-500 rounded-full" />
                                    <div className="w-3 h-3 bg-gray-500 rounded-full" />
                                    <div className="w-3 h-3 bg-gray-500 rounded-full" />
                                    <span>{t("iaPensando")}</span>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    <form onSubmit={handleSubmit} className="m-4 flex" aria-label="Formulário de Envio de Mensagem">
                        <textarea
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            className={`flex-grow p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 resize-none text-sm ${darkMode ? "border-gray-700 bg-[#0d0d0d] text-white" : "border-gray-300 bg-white text-gray-900"}`}
                            placeholder={t("placeholderInput")}
                            rows={2}
                            aria-label="Digite sua mensagem"
                        />
                        <button
                            type="submit"
                            className="ml-2 p-2 bg-green-600 hover:bg-green-500 rounded text-white transition-colors"
                            title={t("enviar")}
                            aria-label="Enviar mensagem"
                        >
                            <FiSend size={20} />
                        </button>
                    </form>

                    {errorMessage && (
                        <div className="mx-4 mb-4 p-2 bg-red-100 text-red-600 rounded-md text-sm" role="alert">
                            {errorMessage}
                        </div>
                    )}
                </section>
            </div>
        </ProtectedRoute>
    );
}
