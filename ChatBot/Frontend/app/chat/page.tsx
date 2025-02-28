"use client";
import React, { useState, useEffect } from "react";
import { TopMenu } from "@/components/menu";
import { Footer } from "@/components/footer";
import { useTheme } from "@/context/ThemeContext";

import dynamic from "next/dynamic";

// Carrega o ChatPageComponent apenas quando necessário
const ChatPageComponent = dynamic(() => import("@/components/ChatPageComponent"), {
    loading: () => <p>Carregando chat...</p>,
    ssr: false, // se não for necessário o carregamento no lado do servidor
});

export default function HomePage() {
    const [showConversations, setShowConversations] = useState(false);
    const { darkMode } = useTheme();

    // Se desejar, sincronize a classe 'dark' na raiz do documento:
    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, [darkMode]);

    const toggleConversationsAction = () => {
        setShowConversations((prev) => !prev);
    };

    return (
        // Aqui, o container principal usa o background e a cor definidos globalmente
        <div className="min-h-screen flex flex-col bg-background text-foreground overflow-hidden">
            <TopMenu toggleConversationsAction={toggleConversationsAction} />
            <main className="flex-grow">
                <ChatPageComponent
                    showConversations={showConversations}
                    toggleConversationsAction={toggleConversationsAction}
                />
            </main>
            <Footer />
        </div>
    );
}
