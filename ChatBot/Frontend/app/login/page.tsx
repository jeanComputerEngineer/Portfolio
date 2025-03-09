"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import LanguageSwitcherHeader from "@/components/Menu Inicial/LanguageSwitcherHeader";
import { csrfFetch } from "@/utils/csrfFetch";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useTheme } from "@/context/ThemeContext";

export default function Login() {
    const router = useRouter();
    const { t } = useTranslation();
    const { darkMode } = useTheme();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [requires2FA, setRequires2FA] = useState(false);
    const [token, setToken] = useState("");

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        try {
            const res = await csrfFetch("https://backchat.jeanhenrique.site/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });
            const data = await res.json();
            if (res.ok) {
                if (data.user && data.user.twoFactorEnabled) {
                    // Se o 2FA estiver ativado, exibe o formulário para o token
                    setRequires2FA(true);
                    setMessage("2FA requerido. Por favor, insira o token do autenticador.");
                } else {
                    // Login efetuado sem 2FA
                    localStorage.setItem("user", JSON.stringify(data.user));
                    router.push("/chat");
                }
            } else {
                setError(data.message || t("loginError") || "Erro no login");
            }
        } catch {
            setError(t("loginError") || "Erro no login");
        }
    };

    const handleTokenVerification = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        try {
            const res = await csrfFetch("https://backchat.jeanhenrique.site/api/auth/2fa/verify", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, token }),
            });
            const data = await res.json();
            if (res.ok) {
                localStorage.setItem("user", JSON.stringify(data.user));
                router.push("/chat");
            } else {
                setError(data.message || "Token inválido.");
            }
        } catch {
            setError("Erro ao verificar token.");
        }
    };

    return (
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
            <div className="absolute top-0 left-0 w-full z-50">
                <LanguageSwitcherHeader />
            </div>
            {!requires2FA ? (
                <form
                    onSubmit={handleLogin}
                    className={`p-6 rounded shadow-md w-96 md:w-[400px] ${darkMode ? "bg-gray-950 text-white" : "bg-gray-100 text-gray-900"
                        }`}
                    aria-label={t("loginForm")}
                >
                    <h1 className="text-xl font-bold mb-4">{t("login")}</h1>
                    {error && <p className="text-red-500 mb-2" role="alert">{error}</p>}
                    {message && <p className="text-green-500 mb-2" role="alert">{message}</p>}
                    <label htmlFor="email" className="block text-sm font-medium mb-1">
                        {t("email")}
                    </label>
                    <input
                        id="email"
                        type="email"
                        placeholder={t("email")}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={`w-full p-2 mb-3 border rounded ${darkMode ? "bg-gray-900 text-white border-gray-600" : "bg-white text-gray-900 border-gray-300"
                            }`}
                        required
                    />
                    <label htmlFor="password" className="block text-sm font-medium mb-1">
                        {t("password")}
                    </label>
                    <div className="relative">
                        <input
                            id="password"
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
                    <button
                        type="submit"
                        className={`w-full p-2 rounded ${darkMode ? "bg-gray-800 hover:bg-gray-700" : "bg-gray-500 hover:bg-gray-600"
                            } text-white`}
                        aria-label={t("login")}
                    >
                        {t("login")}
                    </button>
                    <p className="mt-3 text-center" dangerouslySetInnerHTML={{ __html: t("loginPrompt") }} />
                    <div className="mt-4">
                        <a
                            href="https://backchat.jeanhenrique.site/api/auth/oauth2"
                            className="w-full p-2 bg-gray-800 text-white rounded text-center block hover:bg-gray-900"
                        >
                            Login com GitHub
                        </a>
                    </div>
                </form>
            ) : (
                <form
                    onSubmit={handleTokenVerification}
                    className={`p-6 rounded shadow-md w-96 md:w-[400px] ${darkMode ? "bg-gray-950 text-white" : "bg-gray-100 text-gray-900"
                        }`}
                    aria-label="2FA Verification Form"
                >
                    <h1 className="text-xl font-bold mb-4">Verificação 2FA</h1>
                    {error && <p className="text-red-500 mb-2" role="alert">{error}</p>}
                    {message && <p className="text-green-500 mb-2" role="alert">{message}</p>}
                    <p className="mb-3">Insira o código do autenticador:</p>
                    <input
                        type="text"
                        placeholder="Código de 2FA"
                        value={token}
                        onChange={(e) => setToken(e.target.value)}
                        className={`w-full p-2 mb-3 border rounded ${darkMode ? "bg-gray-900 text-white border-gray-600" : "bg-white text-gray-900 border-gray-300"
                            }`}
                        required
                    />
                    <button
                        type="submit"
                        className={`w-full p-2 rounded ${darkMode ? "bg-gray-800 hover:bg-gray-700" : "bg-gray-500 hover:bg-gray-600"
                            } text-white`}
                    >
                        Verificar Token
                    </button>
                </form>
            )}
        </div>
    );
}
