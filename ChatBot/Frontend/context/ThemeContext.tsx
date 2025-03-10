// context/ThemeContext.tsx
"use client";
import React, { createContext, useState, useContext, useEffect } from "react";
import { getCookie } from "@/utils/cookieUtils";

interface ThemeContextProps {
    darkMode: boolean;
    toggleDarkMode: () => void;
}

const ThemeContext = createContext<ThemeContextProps>({
    darkMode: false,
    toggleDarkMode: () => { },
});

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
    const [darkMode, setDarkMode] = useState<boolean>(false);

    useEffect(() => {
        const storedCookie = getCookie("darkMode");
        if (storedCookie !== null) {
            setDarkMode(storedCookie === "true");
        }
    }, []);

    const toggleDarkMode = () => {
        setDarkMode((prev) => {
            const newMode = !prev;
            // Atualiza o cookie do tema com uma expiração de, por exemplo, 7 dias:
            const expires = new Date();
            expires.setDate(expires.getDate() + 7);
            document.cookie = `darkMode=${newMode}; path=/; expires=${expires.toUTCString()}; secure; samesite=strict;`;
            return newMode;
        });
    };

    return (
        <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);
