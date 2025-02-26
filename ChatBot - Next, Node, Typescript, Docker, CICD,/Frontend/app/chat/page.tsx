"use client";

import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import ProtectedRoute from "@/components/ProtectedRoute";
import Select, { SingleValue } from "react-select";
import { useTranslation } from "react-i18next";
import i18n, { languageNames } from "@/components/i18n/i18n"; // Certifique-se de que languageNames está exportado

interface Conversation {
    id: string;
    title: string;
    messages: { role: "user" | "assistant"; content: string }[];
}

export default function ChatPage() {
    const router = useRouter();
    const { t } = useTranslation();

    // Estado do tema
    const [darkMode, setDarkMode] = useState(false);
    // Estado do usuário logado
    const [user, setUser] = useState<{ name: string; preferredLanguage: string } | null>(null);

    // Estados de idioma e modelo
    const [language, setLanguage] = useState("Português");
    const [model, setModel] = useState("deepseek/deepseek-r1:free");

    // Mensagens da conversa atual
    const [messages, setMessages] = useState<{ role: "user" | "assistant"; content: string }[]>([]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    // Histórico de conversas (exemplo simples)
    const [conversations, setConversations] = useState<Conversation[]>([]);
    const [currentConversationId, setCurrentConversationId] = useState<string | null>(null);

    // Paginação do histórico (exemplo)
    const [page, setPage] = useState(1);

    // Referência para scroll automático
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Carrega user e idioma do localStorage
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            const parsed = JSON.parse(storedUser);
            setUser(parsed);
            setLanguage(parsed.preferredLanguage || "Português");
            i18n.changeLanguage(parsed.preferredLanguage || "Português");
        }
    }, []);

    // Scroll automático ao alterar mensagens
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, isLoading]);

    // --- Funções do Menu Superior ---
    const handleThemeToggle = () => setDarkMode(!darkMode);

    const handleLanguageChange = (
        newValue: SingleValue<{ value: string; label: string }>
    ) => {
        if (newValue) {
            setLanguage(newValue.value);
            i18n.changeLanguage(newValue.value); // Atualiza o idioma no i18n
            if (user) {
                const updatedUser = { ...user, preferredLanguage: newValue.value };
                setUser(updatedUser);
                localStorage.setItem("user", JSON.stringify(updatedUser));
            }
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("user");
        router.push("/login");
    };

    const handleDeleteAccount = async () => {
        alert("Conta excluída (placeholder).");
        localStorage.removeItem("user");
        router.push("/register");
    };

    const handleEditProfile = () => {
        router.push("/profile");
    };

    // --- Funções do Menu Lateral ---
    const handleNewConversation = () => {
        const newConv: Conversation = {
            id: Date.now().toString(),
            title: "Nova Conversa",
            messages: [],
        };
        setConversations((prev) => [...prev, newConv]);
        setCurrentConversationId(newConv.id);
        setMessages([]);
    };

    const handleSelectConversation = (convId: string) => {
        setCurrentConversationId(convId);
        const conv = conversations.find((c) => c.id === convId);
        if (conv) {
            setMessages(conv.messages);
        }
    };

    // --- Funções do Chat ---
    const suggestions = [
        t("sentidoDaVida"),
        t("fraseInspiradora"),
        t("perguntasEntrevista"),
    ];

    const ThinkingAnimation = () => (
        <div className="flex items-center space-x-2 animate-pulse">
            <div className="w-3 h-3 bg-blue-500 rounded-full" />
            <div className="w-3 h-3 bg-blue-500 rounded-full" />
            <div className="w-3 h-3 bg-blue-500 rounded-full" />
            <span>{t("iaPensando")}</span>
        </div>
    );

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!input.trim()) return;
        const userMessage = { role: "user" as const, content: input };
        setMessages((prev) => [...prev, userMessage]);
        setIsLoading(true);
        setInput("");

        try {
            const res = await fetch("http://localhost:5000/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    messages: [...messages, userMessage],
                    model,
                }),
            });
            const data = await res.json();
            const assistantContent = data.choices[0].message.content.trim()
                ? data.choices[0].message.content
                : t("apiFalhou");

            setMessages((prev) => [
                ...prev,
                { role: "assistant", content: assistantContent },
            ]);

            if (currentConversationId) {
                setConversations((prev) =>
                    prev.map((c) =>
                        c.id === currentConversationId
                            ? {
                                ...c,
                                messages: [
                                    ...c.messages,
                                    userMessage,
                                    { role: "assistant", content: assistantContent },
                                ],
                            }
                            : c
                    )
                );
            }
        } catch (error) {
            console.error("Erro ao buscar resposta:", error);
            setErrorMessage("Erro ao buscar resposta.");
        } finally {
            setIsLoading(false);
        }
    };

    // Opções do select de idioma
    const languageOptions = languageNames.map((lang: string) => ({
        value: lang,
        label: lang,
    }));

    return (
        <ProtectedRoute>
            <div className={darkMode ? "dark" : ""}>
                {/* MENU SUPERIOR */}
                <header className="w-full bg-blue-600 text-white p-4 flex justify-between items-center">
                    <div className="flex items-center space-x-4">
                        <h1 className="text-lg font-bold">ChatBot</h1>
                        {user && (
                            <button onClick={handleEditProfile} className="underline">
                                Editar Perfil
                            </button>
                        )}
                    </div>
                    <div className="flex items-center space-x-4">
                        <button
                            onClick={handleThemeToggle}
                            className="px-2 py-1 bg-gray-300 dark:bg-gray-800 text-gray-900 dark:text-white border dark:border-gray-700 rounded"
                        >
                            {darkMode ? "Modo Claro" : "Modo Escuro"}
                        </button>
                        <div className="w-40">
                            <Select
                                instanceId="language-select-top"
                                options={languageOptions}
                                value={languageOptions.find((opt: { value: string; label: string }) => opt.value === language)}
                                onChange={handleLanguageChange}
                                placeholder="Idioma..."
                                isSearchable
                            />
                        </div>
                        {user ? (
                            <>
                                <button onClick={handleLogout} className="px-2 py-1 bg-red-500 text-white rounded">
                                    Logout
                                </button>
                                <button onClick={handleDeleteAccount} className="px-2 py-1 bg-red-700 text-white rounded">
                                    Excluir Conta
                                </button>
                            </>
                        ) : (
                            <a href="/login" className="underline">
                                Login
                            </a>
                        )}
                    </div>
                </header>

                {/* LAYOUT PRINCIPAL */}
                <main className="flex min-h-screen">
                    {/* MENU LATERAL */}
                    <aside className="w-64 bg-gray-200 dark:bg-gray-800 p-4">
                        <div className="flex justify-between mb-2">
                            <h2 className="text-lg font-bold text-gray-800 dark:text-white">Conversas</h2>
                            <button
                                onClick={handleNewConversation}
                                className="px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                            >
                                Nova
                            </button>
                        </div>
                        <div className="space-y-2 overflow-y-auto h-80 border border-gray-300 dark:border-gray-700 p-2">
                            {conversations.map((conv: Conversation) => (
                                <div
                                    key={conv.id}
                                    onClick={() => handleSelectConversation(conv.id)}
                                    className={`p-2 rounded cursor-pointer ${conv.id === currentConversationId
                                            ? "bg-blue-500 text-white"
                                            : "bg-gray-100 dark:bg-gray-700 dark:text-white"
                                        }`}
                                >
                                    {conv.title}
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-between mt-2">
                            <button
                                onClick={() => setPage((p) => Math.max(1, p - 1))}
                                className="px-2 py-1 bg-gray-300 dark:bg-gray-700 rounded"
                            >
                                Anterior
                            </button>
                            <span className="text-gray-800 dark:text-white">Página {page}</span>
                            <button
                                onClick={() => setPage((p) => p + 1)}
                                className="px-2 py-1 bg-gray-300 dark:bg-gray-700 rounded"
                            >
                                Próxima
                            </button>
                        </div>
                    </aside>

                    {/* ÁREA DE CHAT */}
                    <section className="flex-grow flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 dark:text-white transition-colors duration-300 p-4">
                        <div className="border rounded-md p-4 w-full max-w-3xl dark:border-gray-700 flex flex-col h-[80vh]">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center space-x-4">
                                    <select
                                        value={model}
                                        onChange={(e) => setModel(e.target.value)}
                                        className={`p-2 rounded-md border ${darkMode
                                                ? "border-gray-700 bg-gray-800 text-white"
                                                : "border-gray-300 bg-white text-gray-900"
                                            }`}
                                    >
                                        <option value="deepseek/deepseek-r1:free">DeepSeek R1</option>
                                        <option value="deepseek/deepseek-chat:free">DeepSeek Chat</option>
                                    </select>
                                </div>
                            </div>

                            <div className="flex-grow overflow-y-auto border border-gray-300 dark:border-gray-700 rounded-md p-2">
                                {messages.length === 0 && (
                                    <div className="mb-3 flex justify-start">
                                        <div className="max-w-[70%] p-3 rounded-lg shadow-md bg-gray-200 text-gray-900 dark:bg-gray-700 dark:text-white">
                                            <p className="mb-2">{t("sugestoes")}</p>
                                            <div className="flex flex-wrap gap-2">
                                                {suggestions.map((sug, idx) => (
                                                    <button
                                                        key={idx}
                                                        onClick={() => setInput(sug)}
                                                        className="px-2 py-1 bg-gray-300 dark:bg-gray-600 rounded-md hover:bg-gray-400 dark:hover:bg-gray-500 transition-colors"
                                                    >
                                                        {sug}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {messages.map((msg, index) => (
                                    <div key={index} className={`mb-3 flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                                        <div
                                            className={`max-w-[70%] p-3 rounded-lg shadow-md transition-transform transform hover:scale-105 ${msg.role === "user"
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
                                <div className="mb-4 p-2 bg-red-100 text-red-600 rounded-md">
                                    {errorMessage}
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="mt-4 flex">
                                <textarea
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    className={`flex-grow p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none ${darkMode ? "border-gray-700 bg-gray-800 text-white" : "border-gray-300 bg-white text-gray-900"
                                        }`}
                                    placeholder={t("placeholderInput")}
                                    rows={2}
                                />
                                <button
                                    type="submit"
                                    className="ml-2 px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
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
