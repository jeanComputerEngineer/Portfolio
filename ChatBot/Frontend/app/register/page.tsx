// components/Auth/Register.tsx
"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import LanguageSwitcherHeader from "@/components/Menu Inicial/LanguageSwitcherHeader";
import { csrfFetch } from "@/utils/csrfFetch";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useTheme } from "@/context/ThemeContext";

export default function Register() {
    const router = useRouter();
    const { t } = useTranslation();
    const { darkMode } = useTheme();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [enable2FA, setEnable2FA] = useState(false);

    const isValidLength = (pwd: string) => pwd.length >= 6 && pwd.length <= 20;

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        if (password !== confirmPassword) {
            setError(t("passwordMismatch"));
            return;
        }
        if (!isValidLength(password)) {
            setError(t("invalidPasswordLength"));
            return;
        }
        try {
            const res = await csrfFetch("https://backchat.jeanhenrique.site/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, password }),
            });
            const data = await res.json();
            if (res.ok) {
                if (enable2FA) {
                    router.push(`/2fa-setup?email=${encodeURIComponent(email)}`);
                } else {
                    router.push("/login");
                }
            } else {
                setError(data.message || t("registerError"));
            }
        } catch {
            setError(t("registerError"));
        }
    };

    return (
        <>
            <div className="absolute top-0 left-0 w-full z-50">
                <LanguageSwitcherHeader />
            </div>
            <div
                className={`fixed inset-0 flex flex-col items-center justify-center bg-cover bg-no-repeat ${darkMode ? "bg-gray-950" : "bg-gray-100"
                    }`}
                style={{
                    backgroundImage: "url('/AI.jpg')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    height: "100vh",
                    maxHeight: "100dvh",
                    overflow: "hidden",
                }}
            >
                <div className="flex flex-col md:flex-row gap-6 mt-20 md:mt-16">
                    <form
                        onSubmit={handleRegister}
                        className={`p-6 rounded shadow-md w-80 md:w-[400px] ${darkMode ? "bg-gray-950 text-white" : "bg-gray-100 text-gray-900"
                            }`}
                        aria-label={t("registrationForm")}
                    >
                        <h1 className="text-xl font-bold mb-4">{t("registration")}</h1>
                        {error && <p className="text-red-500 mb-2">{error}</p>}
                        <input
                            type="text"
                            placeholder={t("name")}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className={`w-full p-2 pr-10 mb-3 border rounded ${darkMode ? "bg-gray-900 text-white border-gray-600" : "bg-white text-gray-900 border-gray-300"
                                }`}
                            required
                        />
                        <input
                            type="email"
                            placeholder={t("email")}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className={`w-full p-2 pr-10 mb-3 border rounded ${darkMode ? "bg-gray-900 text-white border-gray-600" : "bg-white text-gray-900 border-gray-300"
                                }`}
                            required
                        />
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder={t("password")}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className={`w-full p-2 pr-10 mb-3 border rounded ${darkMode ? "bg-gray-900 text-white border-gray-600" : "bg-white text-gray-900 border-gray-300"
                                    }`}
                                required
                            />
                            <button
                                type="button"
                                className="absolute inset-y-0 right-0 pr-2 flex items-center"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <FiEyeOff /> : <FiEye />}
                            </button>
                        </div>
                        <div className="relative">
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                placeholder={t("confirmPassword")}
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className={`w-full p-2 pr-10 mb-3 border rounded ${darkMode ? "bg-gray-900 text-white border-gray-600" : "bg-white text-gray-900 border-gray-300"
                                    }`}
                                required
                            />
                            <button
                                type="button"
                                className="absolute inset-y-0 right-0 pr-2 flex items-center"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            >
                                {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
                            </button>
                        </div>
                        <div className="mb-3">
                            <label className="inline-flex items-center">
                                <input
                                    type="checkbox"
                                    checked={enable2FA}
                                    onChange={() => setEnable2FA(!enable2FA)}
                                    className="form-checkbox"
                                />
                                <span className="ml-2">{t("enable2FA")}</span>
                            </label>
                        </div>
                        <button
                            type="submit"
                            className={`w-full p-2 rounded ${darkMode ? "bg-gray-800 hover:bg-gray-700" : "bg-gray-500 hover:bg-gray-600"
                                } text-white`}
                        >
                            {t("register")}
                        </button>
                        <p
                            className="mt-3 text-center"
                            dangerouslySetInnerHTML={{ __html: t("registerPrompt") }}
                        />
                        <p className="mt-3 text-center text-sm">
                            <a
                                href="https://jeanhenrique.site"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-500"
                            >
                                {t("help")}
                            </a>
                        </p>
                    </form>
                    <div
                        className={`p-6 rounded shadow-md w-80 md:w-[400px] ${darkMode ? "bg-gray-950 text-white" : "bg-gray-100 text-gray-900"
                            }`}
                    >
                        <h2 className="text-lg font-bold mb-2">{t("rulesTitle")}</h2>
                        <ul className="list-disc list-inside">
                            <li>{t("ruleAccountExpires")}</li>
                            <li>{t("ruleOneAccountPerEmail")}</li>
                            <li>{t("ruleTwoRegistrationsPerIP")}</li>
                            <li>{t("ruleConversationLimits")}</li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
}
