"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await fetch("http://localhost:5000/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password })
            });
            const data = await res.json();
            if (res.ok) {
                // Armazene os dados do usuário (ex: em localStorage)
                localStorage.setItem("user", JSON.stringify(data.user));
                router.push("/chat");
            } else {
                setError(data.message || "Erro no login");
            }
        } catch (err) {
            setError("Erro no login");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
            <form onSubmit={handleLogin} className="bg-white dark:bg-gray-800 p-6 rounded shadow-md w-80">
                <h1 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Login</h1>
                {error && <p className="text-red-500 mb-2">{error}</p>}
                <input
                    type="email"
                    placeholder="E-mail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-2 mb-3 border rounded"
                    required
                />
                <input
                    type="password"
                    placeholder="Senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-2 mb-3 border rounded"
                    required
                />
                <button type="submit" className="w-full p-2 bg-green-500 text-white rounded hover:bg-green-600">
                    Entrar
                </button>
                <p className="mt-3 text-center">
                    Não tem conta? <a href="/register" className="text-blue-500">Cadastre-se</a>
                </p>
            </form>
        </div>
    );
}
