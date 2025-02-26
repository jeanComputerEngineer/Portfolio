"use client";

import { useEffect, useState } from "react";

export function TopMenu() {
    const [user, setUser] = useState<{ name: string; preferredLanguage: string } | null>(null);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    return (
        <header className="w-full bg-blue-600 text-white p-4 flex justify-between items-center">
            <h1 className="text-lg font-bold">ChatBot</h1>
            {user ? (
                <div>
                    <span className="mr-4">Olá, {user.name}</span>
                    <span>Idioma: {user.preferredLanguage?.toUpperCase() ?? "N/D"}</span>
                </div>
            ) : (
                <a href="/login" className="underline">
                    Login
                </a>
            )}
        </header>
    );
}
