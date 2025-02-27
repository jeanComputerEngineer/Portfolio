"use client";

import React from "react";
import { TopMenu } from "@/app/chat/menu/menu";
import ChatPage from "@/app/chat/chat/page";

export default function HomePage() {
    return (
        <div className="min-h-screen flex flex-col">
            {/* Menu Superior fixo */}
            <TopMenu />
            {/* Conteúdo da página: ChatPage */}
            <ChatPage />
        </div>
    );
}
