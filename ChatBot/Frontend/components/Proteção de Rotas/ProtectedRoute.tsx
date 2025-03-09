"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

interface ProtectedRouteProps {
    children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
    const router = useRouter();

    useEffect(() => {
        let storedUser = localStorage.getItem("user");
        if (!storedUser) {
            const userCookie = document.cookie.split('; ').find(row => row.startsWith('user='));
            if (userCookie) {
                try {
                    const cookieValue = decodeURIComponent(userCookie.split('=')[1]);
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
        }
    }, [router]);

    return <>{children}</>;
}
