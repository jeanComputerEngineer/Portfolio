"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const [csrfToken, setCsrfToken] = useState("");

    useEffect(() => {
        fetch("http://localhost:5000/csrf-token", { credentials: "include" })
            .then((res) => res.json())
            .then((data) => {
                setCsrfToken(data.csrfToken);
            })
            .catch((_err) =>
                console.error("Erro ao buscar CSRF token:", _err)
            );
    }, []);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await fetch("http://localhost:5000/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "CSRF-Token": csrfToken,
                },
                body: JSON.stringify({ email, password }),
                credentials: "include",
            });
            const data = await res.json();
            if (res.ok) {
                setMessage(data.message);
                localStorage.setItem("user", JSON.stringify(data.user));
                router.push("/chat");
            } else {
                setError(data.message || "Erro no login");
            }
        } catch {
            setError("Erro no login");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
            <form
                onSubmit={handleLogin}
                className="bg-white dark:bg-gray-800 p-6 rounded shadow-md w-80"
                aria-label="Formulário de Login"
            >
                <h1 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
                    Login
                </h1>
                {error && <p className="text-red-500 mb-2" role="alert">{error}</p>}
                {message && (
                    <p className="text-green-500 mb-2" role="alert">{message}</p>
                )}
                <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                    E-mail
                </label>
                <input
                    id="email"
                    type="email"
                    placeholder="E-mail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-2 mb-3 border rounded"
                    required
                />
                <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                    Senha
                </label>
                <input
                    id="password"
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
                    aria-label="Entrar"
                >
                    Entrar
                </button>
                <p className="mt-3 text-center">
                    Não tem conta?{" "}
                    <a href="/register" className="text-blue-500">
                        Cadastre-se
                    </a>
                </p>
            </form>
        </div>
    );
}
