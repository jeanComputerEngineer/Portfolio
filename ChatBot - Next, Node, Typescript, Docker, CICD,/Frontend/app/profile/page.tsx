"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Profile() {
    const router = useRouter();
    const [user, setUser] = useState<any>(null);
    const [name, setName] = useState("");
    const [preferredLanguage, setPreferredLanguage] = useState("");

    useEffect(() => {
        const stored = localStorage.getItem("user");
        if (stored) {
            const parsed = JSON.parse(stored);
            setUser(parsed);
            setName(parsed.name);
            setPreferredLanguage(parsed.preferredLanguage);
        }
    }, []);

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await fetch("http://localhost:5000/api/auth/account", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ name, preferredLanguage }),
            });
            if (res.ok) {
                const data = await res.json();
                localStorage.setItem("user", JSON.stringify(data.user));
                alert("Perfil atualizado!");
            } else {
                alert("Erro ao atualizar perfil.");
            }
        } catch (error) {
            alert("Erro ao atualizar perfil.");
        }
    };

    const handleDelete = async () => {
        if (confirm("Tem certeza que deseja excluir sua conta?")) {
            try {
                const res = await fetch("http://localhost:5000/api/auth/account", {
                    method: "DELETE",
                    credentials: "include",
                });
                if (res.ok) {
                    localStorage.removeItem("user");
                    router.push("/register");
                } else {
                    alert("Erro ao excluir conta.");
                }
            } catch (error) {
                alert("Erro ao excluir conta.");
            }
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
            <form onSubmit={handleUpdate} className="bg-white dark:bg-gray-800 p-6 rounded shadow-md w-80" aria-label="Formulário de Edição de Perfil">
                <h1 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Editar Perfil</h1>
                <label htmlFor="profile-name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Nome</label>
                <input
                    id="profile-name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-2 mb-3 border rounded"
                    placeholder="Nome"
                    required
                />
                <label htmlFor="profile-language" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Idioma Preferido</label>
                <input
                    id="profile-language"
                    type="text"
                    value={preferredLanguage}
                    onChange={(e) => setPreferredLanguage(e.target.value)}
                    className="w-full p-2 mb-3 border rounded"
                    placeholder="Idioma Preferido"
                    required
                />
                <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600" aria-label="Atualizar Perfil">
                    Atualizar
                </button>
                <button
                    type="button"
                    onClick={handleDelete}
                    className="w-full p-2 bg-red-500 text-white rounded hover:bg-red-600 mt-3"
                    aria-label="Excluir Conta"
                >
                    Excluir Conta
                </button>
            </form>

        </div>
    );
}
