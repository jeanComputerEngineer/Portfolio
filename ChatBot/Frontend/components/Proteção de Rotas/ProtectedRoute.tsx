"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

interface ProtectedRouteProps {
    children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [authChecked, setAuthChecked] = useState(false);

    useEffect(() => {
        let storedUser = localStorage.getItem("user");
        if (!storedUser) {
            const userCookie = document.cookie
                .split("; ")
                .find((row) => row.startsWith("user="));
            if (userCookie) {
                try {
                    const cookieValue = decodeURIComponent(userCookie.split("=")[1]);
                    const userData = JSON.parse(cookieValue);
                    localStorage.setItem("user", JSON.stringify(userData));
                    storedUser = JSON.stringify(userData);
                } catch (err) {
                    console.error("Erro ao ler o cookie do usuário:", err);
                }
            }
        }

        if (!storedUser) {
            router.push("/login");
        } else {
            setAuthChecked(true);
        }
    }, [router]);

    useEffect(() => {
        // Se chegou com ?forceReload=1, forçamos o reload uma vez
        const forceReload = searchParams.get("forceReload");
        if (forceReload === "1") {
            // Para não entrar em loop, remove esse query param antes de recarregar
            const urlWithoutParam = window.location.href.replace(/(\?|&)forceReload=1/, "");
            window.history.replaceState({}, "", urlWithoutParam);
            // E agora forçamos reload
            window.location.reload();
        }
    }, [searchParams]);

    if (!authChecked) {
        return <div style={{ textAlign: "center", marginTop: "2rem" }}>Carregando...</div>;
    }

    return <>{children}</>;
}
