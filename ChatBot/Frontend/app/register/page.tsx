"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import LanguageSwitcherHeader from "@/components/LanguageSwitcherHeader";

export default function Register() {
    const router = useRouter();
    const { t } = useTranslation();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setError(t("passwordMismatch") || "As senhas não coincidem.");
            return;
        }

        try {
            const res = await fetch("https://backchat.jeanhenrique.site/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, password }),
            });
            const data = await res.json();
            if (res.ok) {
                router.push("/login");
            } else {
                setError(data.message || t("registerError") || "Erro ao registrar.");
            }
        } catch {
            setError(t("registerError") || "Erro ao registrar.");
        }
    };

    return (
        <>
            <div className="absolute top-0 left-0 w-full z-50">
                <LanguageSwitcherHeader />
            </div>
            <div
                className="fixed inset-0 flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 bg-cover bg-no-repeat"
                style={{
                    backgroundImage: "url('/AI.jpg')",
                    backgroundColor: "transparent",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    height: "100vh",
                    maxHeight: "100dvh",
                    overflow: "hidden",
                }}
            >
                <div className="flex flex-col md:flex-row gap-6 mt-16">
                    <form
                        onSubmit={handleRegister}
                        className="bg-white dark:bg-gray-800 p-6 rounded shadow-md w-80 md:w-[400px]"
                        aria-label={t("registrationForm")}
                    >
                        <h1 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
                            {t("registration")}
                        </h1>
                        {error && <p className="text-red-500 mb-2">{error}</p>}
                        <input
                            type="text"
                            placeholder={t("name")}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full p-2 mb-3 border rounded"
                            required
                        />
                        <input
                            type="email"
                            placeholder={t("email")}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-2 mb-3 border rounded"
                            required
                        />
                        <input
                            type="password"
                            placeholder={t("password")}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-2 mb-3 border rounded"
                            required
                        />
                        <input
                            type="password"
                            placeholder={t("confirmPassword") || "Confirme sua senha"}
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full p-2 mb-3 border rounded"
                            required
                        />
                        <button
                            type="submit"
                            className="w-full p-2 bg-green-500 text-white rounded hover:bg-green-600"
                        >
                            {t("register")}
                        </button>
                        <p className="mt-3 text-center">
                            {t("alreadyHaveAccount")}{" "}
                            <a href="/login" className="text-blue-500">
                                {t("login")}
                            </a>
                        </p>
                    </form>
                    <div className="bg-white dark:bg-gray-800 p-6 rounded shadow-md w-80 md:w-[400px]">
                        <h2 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">
                            {t("rulesTitle")}
                        </h2>
                        <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
                            <li>{t("ruleAccountExpires")}</li>
                            <li>{t("ruleOneAccountPerEmail")}</li>
                            <li>{t("ruleTwoRegistrationsPerIP")}</li>
                            <li>{t("ruleConversationLimits")}</li>
                        </ul>
                        <p className="mt-4 text-blue-500 underline cursor-pointer">
                            <a href="https://jeanhenrique.site" target="_blank" rel="noopener noreferrer">
                                {t("needHelp")}
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}
