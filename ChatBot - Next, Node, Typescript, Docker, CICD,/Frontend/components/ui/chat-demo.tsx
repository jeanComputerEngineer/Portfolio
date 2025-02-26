"use client";

import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import Select from "react-select";
import { languageNames } from "@/components/i18n/i18n";

type Message = {
    role: "user" | "assistant";
    content: string;
    attachments?: File[];
};

interface ChatDemoProps {
    initialMessages?: Message[];
    darkMode: boolean;
}

const bannedWords = ["badword1", "badword2"];

const languageOptions = languageNames.map((lang) => ({
    value: lang,
    label: lang,
}));

export function ChatDemo({ initialMessages = [], darkMode }: ChatDemoProps) {
    const { t, i18n } = useTranslation();

    const [language, setLanguage] = useState("Português");
    const [model, setModel] = useState("deepseek/deepseek-r1:free");
    const [messages, setMessages] = useState<Message[]>(initialMessages);
    const [input, setInput] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [attachedFiles, setAttachedFiles] = useState<File[]>([]);
    const [errorMessage, setErrorMessage] = useState<string>("");

    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, isLoading]);

    useEffect(() => {
        i18n.changeLanguage(language);
    }, [language, i18n]);

    const processContent = (text: string): string => {
        let processed = text.replace(/[()]/g, "");
        processed = processed.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
        return processed;
    };

    const validateInput = (text: string): boolean => {
        if (text.length > 1000) {
            setErrorMessage(t("erroLimite"));
            return false;
        }
        for (const word of bannedWords) {
            if (text.toLowerCase().includes(word)) {
                setErrorMessage(t("erroPalavroes"));
                return false;
            }
        }
        setErrorMessage("");
        return true;
    };

    const ThinkingAnimation = () => (
        <div className="flex items-center space-x-2 animate-pulse">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <span>{t("iaPensando")}</span>
        </div>
    );

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setAttachedFiles(Array.from(e.target.files));
        }
    };

    const append = (message: Message) => {
        setMessages((prev) => [...prev, message]);
    };

    const suggestions = [t("sentidoDaVida"), t("fraseInspiradora"), t("perguntasEntrevista")];

    const handleSuggestionClick = (suggestion: string) => {
        setInput(suggestion);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!validateInput(input)) return;

        const userMessage: Message = { role: "user", content: input, attachments: attachedFiles };
        append(userMessage);
        setIsLoading(true);

        try {
            const response = await fetch("http://localhost:5000/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    messages: [...messages, userMessage],
                    model
                })
            });
            const data = await response.json();
            if (!data.choices[0].message.content.trim()) {
                append({ role: "assistant", content: t("apiFalhou") });
            } else {
                append({ role: "assistant", content: data.choices[0].message.content });
            }
        } catch (error) {
            console.error("Erro ao buscar resposta:", error);
            setErrorMessage(t("Erro ao buscar resposta."));
        } finally {
            setIsLoading(false);
            setInput("");
            setAttachedFiles([]);
        }
    };

    return (
        <div
            className={`flex flex-col p-6 ${darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"} w-full min-w-[60%] min-h-[80vh] max-w-5xl mx-auto rounded-2xl shadow-2xl transition-colors duration-300`}
        >
            {/* Cabeçalho: Seletor de idioma e modelo */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                    <div className="w-64">
                        <Select
                            instanceId="language-select"
                            options={languageOptions}
                            value={languageOptions.find((opt) => opt.value === language)}
                            onChange={(selectedOption) => {
                                if (selectedOption) {
                                    setLanguage(selectedOption.value);
                                }
                            }}
                            placeholder="Selecionar idioma..."
                            isSearchable
                        />
                    </div>
                    <select
                        value={model}
                        onChange={(e) => setModel(e.target.value)}
                        className={`p-2 rounded-md border ${darkMode ? "border-gray-700 bg-gray-800" : "border-gray-300 bg-white"}`}
                    >
                        <option value="deepseek/deepseek-r1:free">DeepSeek R1</option>
                        <option value="deepseek/deepseek-chat:free">DeepSeek Chat</option>
                    </select>
                </div>
            </div>

            {/* Área de mensagens */}
            <div
                className={`overflow-y-auto p-4 mb-4 border ${darkMode ? "border-gray-700 bg-gray-800" : "border-gray-300 bg-white"} rounded-lg min-h-[300px] max-h-[300px]`}
            >
                {messages.length === 0 && (
                    <div className="mb-3 flex justify-start">
                        <div className="max-w-[70%] p-3 rounded-lg shadow-md bg-gray-200 text-gray-900">
                            <p className="mb-2">{t("sugestoes")}</p>
                            <div className="flex flex-wrap gap-2">
                                {suggestions.map((sug, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => handleSuggestionClick(sug)}
                                        className="px-2 py-1 bg-gray-300 rounded-md hover:bg-gray-400 transition-colors"
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
                            <p className="whitespace-pre-line" dangerouslySetInnerHTML={{ __html: processContent(msg.content) }}></p>
                            {msg.attachments && msg.attachments.length > 0 && (
                                <div className="mt-2 space-y-1">
                                    {msg.attachments.map((file, i) => (
                                        <span key={i} className="text-sm underline hover:text-blue-500 cursor-pointer">
                                            {file.name}
                                        </span>
                                    ))}
                                </div>
                            )}
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

            {/* Formulário de entrada */}
            <form onSubmit={handleSubmit} className={`flex flex-col sm:flex-row items-center border-t pt-4 ${darkMode ? "bg-gray-800" : ""}`}>
                <div className={`flex-grow flex flex-col ${darkMode ? "bg-gray-800" : ""}`}>
                    <textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none ${darkMode ? "border-gray-700 bg-gray-800 text-white" : "border-gray-300 bg-white text-gray-900"}`}
                        placeholder={t("placeholderInput")}
                        rows={3}
                    ></textarea>
                </div>
                <button type="submit" className="mt-4 sm:mt-0 sm:ml-4 px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
                    {t("enviar")}
                </button>
            </form>
        </div>
    );
}
