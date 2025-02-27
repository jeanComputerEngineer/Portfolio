"use client";
import React, { useState, useEffect } from "react";
import { TopMenu } from "@/components/menu";
import ChatPage from "@/components/ChatPageComponent";
import { Footer } from "@/components/footer";
import { useTheme } from "@/context/ThemeContext";

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
            {/* Use <main> para a área central e deixe-a ocupar o espaço restante */}
            <main className="flex-grow">
                <ChatPage
                    showConversations={showConversations}
                    toggleConversationsAction={toggleConversationsAction}
                />
            </main>
            <Footer />
        </div>
    );
}
