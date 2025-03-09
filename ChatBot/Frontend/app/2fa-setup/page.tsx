"use client";

export const dynamic = "force-dynamic";

import React, { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import LanguageSwitcherHeader from "@/components/Menu Inicial/LanguageSwitcherHeader";
import { csrfFetch } from "@/utils/csrfFetch";
import { useTheme } from "@/context/ThemeContext";
import Image from "next/image";

function TwoFactorSetupContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { darkMode } = useTheme();
    const email = searchParams.get("email") || "";
    const [qrCode, setQrCode] = useState("");
    const [secret, setSecret] = useState("");
    const [token, setToken] = useState("");
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

    useEffect(() => {
        if (email) {
            // Chama o endpoint para gerar o QR Code e o segredo 2FA
            fetch(`https://backchat.jeanhenrique.site/api/auth/2fa/setup?email=${encodeURIComponent(email)}`)
                .then((res) => res.json())
                .then((data) => {
                    if (data.qrCode) {
                        setQrCode(data.qrCode);
                        setSecret(data.secret);
                    } else {
                        setError(data.message || "Erro ao obter QR Code.");
                    }
                })
                .catch(() => setError("Erro ao obter QR Code."));
        }
    }, [email]);

    const handleVerify = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await csrfFetch("https://backchat.jeanhenrique.site/api/auth/2fa/verify", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, token }),
            });
            const data = await res.json();
            if (res.ok) {
                setMessage("2FA configurado com sucesso! Agora você pode fazer login.");
                // Redireciona para a tela de login após alguns segundos
                setTimeout(() => {
                    router.push("/login");
                }, 2000);
            } else {
                setError(data.message || "Token inválido.");
            }
        } catch {
            setError("Erro ao verificar token.");
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
                <form
                    onSubmit={handleVerify}
                    className={`p-6 rounded shadow-md w-80 md:w-[400px] ${darkMode ? "bg-gray-950 text-white" : "bg-gray-100 text-gray-900"
                        }`}
                    aria-label="2FA Setup Form"
                >
                    <h1 className="text-xl font-bold mb-4">Configurar 2FA</h1>
                    {error && <p className="text-red-500 mb-2">{error}</p>}
                    {message && <p className="text-green-500 mb-2">{message}</p>}
                    {qrCode ? (
                        <div className="mb-4">
                            <p className="mb-2">Escaneie o QR Code com seu aplicativo autenticador:</p>
                            <Image src={qrCode} alt="QR Code for 2FA" className="mx-auto" width={200} height={200} />
                            <p className="mt-2 text-sm">Segredo: {secret}</p>
                        </div>
                    ) : (
                        <p>Carregando QR Code...</p>
                    )}
                    <input
                        type="text"
                        placeholder="Digite o código do autenticador"
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
            </div>
        </>
    );
}

export default function TwoFactorSetup() {
    return (
        <Suspense fallback={<div>Carregando...</div>}>
            <TwoFactorSetupContent />
        </Suspense>
    );
}
