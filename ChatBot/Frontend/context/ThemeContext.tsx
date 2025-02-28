"use client";
import React, { createContext, useState, useContext, useEffect } from "react";

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
        const stored = localStorage.getItem("darkMode");
        if (stored !== null) {
            setDarkMode(stored === "true");
        }
    }, []);

    const toggleDarkMode = () => {
        setDarkMode((prev) => {
            localStorage.setItem("darkMode", (!prev).toString());
            return !prev;
        });
    };

    return (
        <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);
