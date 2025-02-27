"use client";
import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import ProtectedRoute from "@/components/ProtectedRoute";
import dynamic from "next/dynamic"; // Importação dinâmica para o react-select
import { useTranslation } from "react-i18next";
import i18n, { languageNames } from "@/components/i18n/i18n";
import { FiSun, FiMoon, FiMenu } from "react-icons/fi";
import { useTheme } from "@/context/ThemeContext";
import { SingleValue, ActionMeta } from "react-select";


import { ComponentType } from "react";
import { Props as ReactSelectProps } from "react-select";

// Dynamically import and cast the Select component to the proper type:
const Select = dynamic(() => import("react-select"), { ssr: false }) as ComponentType<
    ReactSelectProps<{ value: string; label: string }, false>
>;

interface Message {
    role: "user" | "assistant";
    content: string;
}

interface Conversation {
    _id: string;
    title: string;
    messages: Message[];
}

export default function ChatPage() {
    const router = useRouter();
    const { t } = useTranslation();
    const { darkMode } = useTheme();

    // Estados de usuário, idioma, modelo e sidebar (para mobile)
    const [user, setUser] = useState<{ name: string; preferredLanguage: string } | null>(null);
    const [language, setLanguage] = useState("Português");
    const [model, setModel] = useState("deepseek/deepseek-r1:free");
    const [showSidebar, setShowSidebar] = useState(false);

    // Estados do chat
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [conversations, setConversations] = useState<Conversation[]>([]);
    const [currentConversationId, setCurrentConversationId] = useState<string | null>(null);
    const [page, setPage] = useState(1);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Carrega usuário, idioma e conversas do localStorage e do backend
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            const parsed = JSON.parse(storedUser);
            setUser(parsed);
            setLanguage(parsed.preferredLanguage || "Português");
            i18n.changeLanguage(parsed.preferredLanguage || "Português");
            fetchConversations(page);
        }
    }, [page]);

    // Scroll automático na área de chat
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, isLoading]);

    // Função para alterar idioma
    const handleLanguageChange = (
        newValue: SingleValue<{ value: string; label: string }>,
        _actionMeta: ActionMeta<{ value: string; label: string }>
    ) => {
        if (newValue) {
            setLanguage(newValue.value);
            i18n.changeLanguage(newValue.value);
            if (user) {
                const updatedUser = { ...user, preferredLanguage: newValue.value };
                setUser(updatedUser);
                localStorage.setItem("user", JSON.stringify(updatedUser));
            }
        }
    };

    const toggleSidebar = () => {
        setShowSidebar((prev) => !prev);
    };

    const handleLogout = () => {
        localStorage.removeItem("user");
        router.push("/login");
    };

    const handleDeleteAccount = async () => {
        if (confirm("Tem certeza que deseja excluir sua conta?")) {
            try {
                const res = await fetch("http://localhost:5000/api/auth/account", {
                    method: "DELETE",

                    credentials: "include",
                });
                if (res.ok) {
                    localStorage.removeItem("user");
                    router.push("/register");
                } else {
                    alert("Erro ao excluir conta.");
                }
            } catch (error) {
                console.error("Erro ao excluir conta:", error);
            }
        }
    };

    const handleEditProfile = () => {
        router.push("/profile");
    };

    // Carrega as conversas do usuário
    const fetchConversations = async (page: number) => {
        try {
            const res = await fetch(`http://localhost:5000/api/chat/conversations?page=${page}&limit=10`, {
                credentials: "include",
            });
            const data = await res.json();
            if (data.conversations) {
                setConversations(data.conversations as Conversation[]);
            }
        } catch (error) {
            console.error("Erro ao buscar conversas:", error);
        }
    };

    // Cria uma nova conversa
    const handleNewConversation = async () => {
        const tempId = Date.now().toString();
        const newConv: Conversation = {
            _id: tempId,
            title: "Nova Conversa",
            messages: [],
        };

        try {
            const res = await fetch("http://localhost:5000/api/chat/conversations", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
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
        } catch (error) {
            console.error("Erro ao criar nova conversa:", error);
            alert("Erro ao criar nova conversa. Verifique se o servidor está em execução e se não há problemas de CORS.");
        }
    };

    // Seleciona uma conversa
    const handleSelectConversation = (convId: string) => {
        setCurrentConversationId(convId);
        const conv = conversations.find((c) => c._id === convId);
        if (conv) {
            setMessages(conv.messages);
        }
        if (showSidebar) setShowSidebar(false);
    };

    // Atualiza a conversa no backend
    const updateConversationInBackend = async (updatedMessages: Message[]) => {
        if (!currentConversationId) return;
        try {
            await fetch("http://localhost:5000/api/chat/conversations", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({
                    conversationId: currentConversationId,
                    title: "Conversa Atualizada",
                    messages: updatedMessages,
                }),
            });
        } catch (error) {
            console.error("Erro ao atualizar conversa:", error);
        }
    };

    const suggestions = [t("sentidoDaVida"), t("fraseInspiradora"), t("perguntasEntrevista")];

    const ThinkingAnimation = () => (
        <div className="flex items-center space-x-2 animate-pulse">
            <div className="w-3 h-3 bg-gray-500 rounded-full" />
            <div className="w-3 h-3 bg-gray-500 rounded-full" />
            <div className="w-3 h-3 bg-gray-500 rounded-full" />
            <span>{t("iaPensando")}</span>
        </div>
    );

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMessage: Message = { role: "user", content: input };
        const updatedMessages: Message[] = [...messages, userMessage];
        setMessages(updatedMessages);
        setIsLoading(true);
        setInput("");

        try {
            const res = await fetch("http://localhost:5000/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    messages: updatedMessages,
                    model,
                }),
            });
            const data = await res.json();
            const assistantContent =
                data.choices[0]?.message?.content?.trim() || t("apiFalhou");
            const assistantMessage: Message = { role: "assistant", content: assistantContent };
            const newMessages: Message[] = [...updatedMessages, assistantMessage];
            setMessages(newMessages);

            // Atualiza a conversa no backend
            if (currentConversationId) {
                setConversations((prev) =>
                    prev.map((c) =>
                        c._id === currentConversationId ? { ...c, messages: newMessages } : c
                    )
                );
                updateConversationInBackend(newMessages);
            }
        } catch (error) {
            console.error("Erro ao buscar resposta:", error);
            setErrorMessage("Erro ao buscar resposta.");
        } finally {
            setIsLoading(false);
        }
    };

    const languageOptions = languageNames.map((lang: string) => ({
        value: lang,
        label: lang,
    }));

    return (
        <ProtectedRoute>
            <div className={darkMode ? "dark" : ""}>
                {/* Cabeçalho mobile com botão de menu */}
                <div className="md:hidden flex items-center justify-between p-4 bg-gray-100 dark:bg-gray-800">
                    <button onClick={toggleSidebar} className="text-xl">
                        <FiMenu />
                    </button>
                    <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">Conversas</h2>
                    <div className="flex space-x-2">
                        <button onClick={handleEditProfile} className="text-sm text-blue-600">
                            Editar
                        </button>
                        <button onClick={handleLogout} className="text-sm text-red-600">
                            Sair
                        </button>
                    </div>
                </div>
                <main className="flex min-h-screen">
                    {/* Sidebar responsiva */}
                    <aside className={`bg-gray-200 dark:bg-gray-800 p-4 ${showSidebar ? "block" : "hidden"} md:block md:w-64`}>
                        <div className="flex justify-between mb-2">
                            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">Conversas</h2>
                            <button
                                onClick={handleNewConversation}
                                className="px-3 py-2 bg-green-600 hover:bg-green-500 rounded text-sm text-white"
                            >
                                Nova
                            </button>
                        </div>
                        <div className="space-y-2 overflow-y-auto border border-gray-300 dark:border-gray-700 p-2">
                            {conversations.map((conv: Conversation) => (
                                <div
                                    key={conv._id}
                                    onClick={() => handleSelectConversation(conv._id)}
                                    className={`p-2 rounded cursor-pointer ${conv._id === currentConversationId
                                        ? "bg-blue-600 text-white"
                                        : "bg-gray-100 dark:bg-gray-700 dark:text-gray-100"
                                        }`}
                                >
                                    {conv.title}
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-between mt-2">
                            <button
                                onClick={() => setPage((p) => Math.max(1, p - 1))}
                                className="px-3 py-2 bg-gray-300 dark:bg-gray-700 rounded text-sm"
                            >
                                Anterior
                            </button>
                            <span className="text-gray-800 dark:text-gray-100 text-sm">Página {page}</span>
                            <button
                                onClick={() => setPage((p) => p + 1)}
                                className="px-3 py-2 bg-gray-300 dark:bg-gray-700 rounded text-sm"
                            >
                                Próxima
                            </button>
                        </div>
                    </aside>

                    {/* Área de Chat */}
                    <section className="flex-grow flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 transition-colors duration-300 p-4">
                        <div className="border rounded-md p-4 w-full max-w-3xl dark:border-gray-700 flex flex-col h-[80vh] bg-white dark:bg-gray-800 shadow">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center space-x-4">
                                    <select
                                        value={model}
                                        onChange={(e) => setModel(e.target.value)}
                                        className={`p-2 rounded-md border ${darkMode
                                            ? "border-gray-700 bg-gray-700 text-gray-100"
                                            : "border-gray-300 bg-gray-100 text-gray-900"
                                            } text-sm`}
                                    >
                                        <option value="deepseek/deepseek-chat:free">DeepSeek Chat</option>
                                    </select>



                                </div>
                            </div>

                            <div className="flex-grow overflow-y-auto border border-gray-300 dark:border-gray-700 rounded-md p-2 bg-gray-50 dark:bg-gray-900">
                                {messages.length === 0 && (
                                    <div className="mb-3 flex justify-start">
                                        <div className="w-full p-3 rounded-lg shadow bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-100 text-sm">
                                            <p className="mb-2">{t("sugestoes")}</p>
                                            <div className="flex flex-wrap gap-2">
                                                {suggestions.map((sug, idx) => (
                                                    <button
                                                        key={idx}
                                                        onClick={() => setInput(sug)}
                                                        className="px-3 py-2 bg-gray-200 dark:bg-gray-600 rounded-md hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors text-sm"
                                                    >
                                                        {sug}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {messages.map((msg, index) => (
                                    <div
                                        key={index}
                                        className={`mb-3 flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                                    >
                                        <div
                                            className={`max-w-[70%] p-3 rounded-lg shadow-md transition-transform transform hover:scale-105 text-sm ${msg.role === "user"
                                                ? darkMode
                                                    ? "bg-blue-600 text-white"
                                                    : "bg-blue-100 text-blue-900"
                                                : darkMode
                                                    ? "bg-gray-700 text-white"
                                                    : "bg-gray-200 text-gray-900"
                                                }`}
                                        >
                                            <p className="whitespace-pre-line">{msg.content}</p>
                                        </div>
                                    </div>
                                ))}

                                {isLoading && (
                                    <div className="flex justify-center mt-2">
                                        <ThinkingAnimation />
                                    </div>
                                )}
                                <div ref={messagesEndRef} />
                            </div>

                            {errorMessage && (
                                <div className="mb-4 p-2 bg-red-100 text-red-600 rounded-md text-sm">
                                    {errorMessage}
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="mt-4 flex">
                                <textarea
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    className={`flex-grow p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 resize-none text-sm ${darkMode ? "border-gray-700 bg-gray-800 text-white" : "border-gray-300 bg-white text-gray-900"
                                        }`}
                                    placeholder={t("placeholderInput")}
                                    rows={2}
                                />
                                <button
                                    type="submit"
                                    className="ml-2 px-4 py-2 bg-green-600 hover:bg-green-500 rounded-lg text-white text-sm transition-colors"
                                >
                                    {t("enviar")}
                                </button>
                            </form>
                        </div>
                    </section>
                </main>
            </div>
        </ProtectedRoute>
    );
}
