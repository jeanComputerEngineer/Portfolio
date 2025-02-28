"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { languageNames } from "@/components/i18n/i18n";
import { useCsrfToken } from "@/hooks/useCsrfToken";

export default function Register() {
    const router = useRouter();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [preferredLanguage, setPreferredLanguage] = useState("pt");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const csrfToken = useCsrfToken();

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await fetch("http://localhost:5000/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRF-Token": csrfToken,
                },
                body: JSON.stringify({ name, email, password, preferredLanguage }),
            });
            const data = await res.json();
            if (res.ok) {
                router.push("/login");
            } else {
                setError(data.message || "Erro no cadastro");
            }
        } catch {
            setError("Erro no cadastro");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
            <form
                onSubmit={handleRegister}
                className="bg-white dark:bg-gray-800 p-6 rounded shadow-md w-80"
            >
                <h1 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
                    Cadastro
                </h1>
                {error && <p className="text-red-500 mb-2">{error}</p>}
                <input
                    type="text"
                    placeholder="Nome"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-2 mb-3 border rounded"
                    required
                />
                <input
                    type="email"
                    placeholder="E-mail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-2 mb-3 border rounded"
                    required
                />
                <select
                    value={preferredLanguage}
                    onChange={(e) => setPreferredLanguage(e.target.value)}
                    className="w-full p-2 mb-3 border rounded"
                >
                    {languageNames.map((lang) => (
                        <option key={lang} value={lang}>
                            {lang}
                        </option>
                    ))}
                </select>
                <input
                    type="password"
                    placeholder="Senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-2 mb-3 border rounded"
                    required
                />
                <button
                    type="submit"
                    className="w-full p-2 bg-green-500 text-white rounded hover:bg-green-600"
                >
                    Cadastrar
                </button>
                <p className="mt-3 text-center">
                    Já tem conta?{" "}
                    <a href="/login" className="text-blue-500">
                        Entrar
                    </a>
                </p>
            </form>
        </div>
    );
}
