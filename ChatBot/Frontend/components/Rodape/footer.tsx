"use client";
import React from "react";
import { useTheme } from "@/context/ThemeContext";

export default function Footer() {
    const { darkMode } = useTheme();
    return (
        <footer
            className={`hidden md:block fixed bottom-0 left-0 w-full z-50 py-1.5 text-center ${darkMode ? "bg-[#0d0d0d]" : "bg-gray-100"
                }`}
        >
            <a
                href="https://jeanhenrique.site"
                target="_blank"
                rel="noopener noreferrer"
                className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-800"
                    } hover:underline`}
            >
                By Jean Henrique
            </a>
        </footer>
    );
}
