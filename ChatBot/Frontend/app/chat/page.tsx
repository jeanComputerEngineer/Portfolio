"use client";
import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { useTheme } from "@/context/ThemeContext";

// Lazy load dos componentes
const TopMenu = dynamic(() => import("@/components/Menu/menu"), {
    loading: () => <p>Carregando menu...</p>,
    ssr: false,
});
const Footer = dynamic(() => import("@/components/Rodape/footer"), {
    loading: () => <p>Carregando rodapé...</p>,
    ssr: false,
});
const ChatPageComponent = dynamic(() => import("@/components/ChatBot/ChatPageComponent"), {
    loading: () => <p>Carregando chat...</p>,
    ssr: false,
});

export default function HomePage() {
    const [showConversations, setShowConversations] = useState(false);
    const { darkMode } = useTheme();

    // Sincroniza a classe 'dark' na raiz do documento
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
