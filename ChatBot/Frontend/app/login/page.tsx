"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import LanguageSwitcherHeader from "@/components/Menu Inicial/LanguageSwitcherHeader";

export default function Login() {
    const router = useRouter();
    const { t } = useTranslation();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const [isDarkMode, setIsDarkMode] = useState<boolean | null>(null);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const darkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
            setIsDarkMode(darkMode);
            const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
            const handleThemeChange = (event: MediaQueryListEvent) =>
                setIsDarkMode(event.matches);
            mediaQuery.addEventListener("change", handleThemeChange);
            return () => mediaQuery.removeEventListener("change", handleThemeChange);
        }
    }, []);


    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await fetch("https://backchat.jeanhenrique.site/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });
            const data = await res.json();
            if (res.ok) {
                setMessage(data.message);
                localStorage.setItem("user", JSON.stringify(data.user));
                router.push("/chat");
            } else {
                setError(data.message || t("loginError"));
            }
        } catch {
            setError(t("loginError"));
        }
    };

    return (
        <div
            className="fixed inset-0 flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 bg-cover bg-no-repeat"
            style={{
                backgroundImage: "url('/AI.jpg')",
                backgroundColor:
                    isDarkMode === null ? "transparent" : isDarkMode ? "#0d0d0d" : "#f7f7f7",
                backgroundSize: "cover",
                backgroundPosition: "center",
                height: "100vh",
                maxHeight: "100dvh",
                overflow: "hidden"
            }}
        >
            {/* LanguageSwitcher fixado no topo */}
            <div className="absolute top-0 left-0 w-full z-50">
                <LanguageSwitcherHeader />
            </div>
            <form
                onSubmit={handleLogin}
                className="bg-white dark:bg-gray-800 p-6 rounded shadow-md w-96 md:w-[400px]"
                aria-label={t("loginForm")}
            >
                <h1 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
                    {t("login")}
                </h1>
                {error && <p className="text-red-500 mb-2" role="alert">{error}</p>}
                {message && <p className="text-green-500 mb-2" role="alert">{message}</p>}
                <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                    {t("email")}
                </label>
                <input
                    id="email"
                    type="email"
                    placeholder={t("email")}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-2 mb-3 border rounded"
                    required
                />
                <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                    {t("password")}
                </label>
                <input
                    id="password"
                    type="password"
                    placeholder={t("password")}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-2 mb-3 border rounded"
                    required
                />
                <button
                    type="submit"
                    className="w-full p-2 bg-green-500 text-white rounded hover:bg-green-600"
                    aria-label={t("login")}
                >
                    {t("login")}
                </button>
                <p className="mt-3 text-center">
                    {t("noAccount")}{" "}
                    <a href="/register" className="text-blue-500">
                        {t("register")}
                    </a>
                </p>
            </form>
        </div>
    );
}
