"use client";
import { FiUser, FiGlobe, FiSun, FiMoon, FiLogOut, FiTrash2, FiEdit } from "react-icons/fi";
import { useRouter } from "next/navigation";
import { useTheme } from "@/context/ThemeContext";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import i18n, { languageNames } from "@/components/i18n/i18n";

export function TopMenu() {
    const router = useRouter();
    const { darkMode, toggleDarkMode } = useTheme();
    const { t } = useTranslation();
    const [user, setUser] = useState<{ name: string; preferredLanguage: string } | null>(null);
    const [selectedLang, setSelectedLang] = useState(user?.preferredLanguage || "pt");

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            const parsed = JSON.parse(storedUser);
            setUser(parsed);
            setSelectedLang(parsed.preferredLanguage || "pt");
        }
    }, []);

    const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const lang = e.target.value;
        setSelectedLang(lang);
        i18n.changeLanguage(lang);
        if (user) {
            const updatedUser = { ...user, preferredLanguage: lang };
            setUser(updatedUser);
            localStorage.setItem("user", JSON.stringify(updatedUser));
        }
    };

    const handleEditProfile = () => router.push("/profile");

    const handleDeleteAccount = async () => {
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
                console.error("Erro ao excluir conta:", error);
            }
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("user");
        router.push("/login");
    };

    return (
        <header className="sticky top-0 z-50 w-full bg-gray-100 dark:bg-gray-800 p-4 flex flex-wrap justify-between items-center shadow">
            <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100">ChatBot</h1>
            <div className="flex items-center space-x-4">
                {user ? (
                    <>
                        <div className="flex items-center space-x-2">
                            <FiUser className="text-lg" />
                            <span className="text-sm">Olá, {user.name}</span>
                            <FiGlobe className="text-lg" />
                            <select
                                value={selectedLang}
                                onChange={handleLanguageChange}
                                className="bg-transparent text-sm outline-none"
                            >
                                {languageNames.map((lang) => (
                                    <option key={lang} value={lang}>
                                        {lang.toUpperCase()}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <button
                            onClick={handleEditProfile}
                            className="flex items-center px-3 py-2 bg-blue-600 hover:bg-blue-500 rounded text-sm text-white"
                        >
                            <FiEdit className="mr-1" /> {t("editarPerfil") || "Editar Perfil"}
                        </button>
                        <button
                            onClick={toggleDarkMode}
                            className="flex items-center px-3 py-2 bg-gray-600 hover:bg-gray-500 rounded text-sm text-white"
                        >
                            {darkMode ? <FiSun className="mr-1" /> : <FiMoon className="mr-1" />}
                            {darkMode ? (t("modoClaro") || "Modo Claro") : (t("modoEscuro") || "Modo Escuro")}
                        </button>

                        <button
                            onClick={handleLogout}
                            className="flex items-center px-3 py-2 bg-gray-800 hover:bg-gray-700 rounded text-sm text-white"
                        >
                            <FiLogOut className="mr-1" /> {t("logout") || "Logout"}
                        </button>
                    </>
                ) : (
                    <a href="/login" className="text-sm hover:underline">
                        Login
                    </a>
                )}
            </div>
        </header>
    );
}
