"use client";
import React, { useState, useEffect } from "react";
import {
    FiUser,
    FiGlobe,
    FiSun,
    FiMoon,
    FiLogOut,
    FiEdit,
    FiMenu,
    FiX,
} from "react-icons/fi";
import { useRouter } from "next/navigation";
import { useTheme } from "@/context/ThemeContext";
import { useTranslation } from "react-i18next";
import i18n, { languageNames } from "@/components/i18n/i18n";
import Select from "react-select";
import { useCsrfToken } from "@/hooks/useCsrfToken"; // Certifique-se do path correto

export interface TopMenuProps {
    toggleConversationsAction: () => void;
}

export function TopMenu({ toggleConversationsAction }: TopMenuProps) {
    const router = useRouter();
    const { darkMode, toggleDarkMode } = useTheme();
    const { t } = useTranslation();
    const [user, setUser] = useState<{ name: string; preferredLanguage: string } | null>(null);
    const [selectedLang, setSelectedLang] = useState("pt");
    // Estado para controlar o modal de edição de perfil
    const [profileModalOpen, setProfileModalOpen] = useState(false);
    // Estados para edição do perfil
    const [profileName, setProfileName] = useState("");
    const [profilePreferredLanguage, setProfilePreferredLanguage] = useState("");
    // Estado para o token CSRF
    const csrfToken = useCsrfToken();

    // Estado já existente para configurações (usado no mobile, se necessário)
    const [settingsOpen, setSettingsOpen] = useState(false);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            const parsed = JSON.parse(storedUser);
            setUser(parsed);
            setSelectedLang(parsed.preferredLanguage || "pt");
            setProfileName(parsed.name);
            setProfilePreferredLanguage(parsed.preferredLanguage);
        }
    }, []);

    const options = languageNames.map((lang) => ({ value: lang, label: lang.toUpperCase() }));

    const handleLanguageChange = (option: { value: string; label: string } | null) => {
        if (option) {
            setSelectedLang(option.value);
            i18n.changeLanguage(option.value);
            if (user) {
                const updatedUser = { ...user, preferredLanguage: option.value };
                setUser(updatedUser);
                localStorage.setItem("user", JSON.stringify(updatedUser));
            }
        }
    };

    // Ao clicar em editar, abre o modal de perfil
    const handleEditProfile = () => {
        setProfileModalOpen(true);
    };

    const handleLogout = () => {
        setSettingsOpen(false);
        localStorage.removeItem("user");
        router.push("/login");
    };

    // Atualiza o perfil via backend
    const handleProfileUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const res = await fetch("http://localhost:5000/api/auth/account", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRF-Token": csrfToken // Enviando o token CSRF
                },
                credentials: "include",
                body: JSON.stringify({ name: profileName, preferredLanguage: profilePreferredLanguage }),
            });
            if (res.ok) {
                const data = await res.json();
                localStorage.setItem("user", JSON.stringify(data.user));
                setUser(data.user);
                alert("Perfil atualizado!");
                setProfileModalOpen(false);
            } else {
                alert("Erro ao atualizar perfil.");
            }
        } catch (error) {
            alert("Erro ao atualizar perfil.");
        }
    };

    // Remove a conta do usuário
    const handleProfileDelete = async () => {
        if (confirm("Tem certeza que deseja excluir sua conta?")) {
            try {
                const res = await fetch("http://localhost:5000/api/auth/account", {
                    method: "DELETE",
                    headers: {
                        "X-CSRF-Token": csrfToken // Enviando o token CSRF
                    },
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
        <>
            <header className={`sticky top-0 z-50 w-full shadow ${darkMode ? "bg-black" : "bg-gray-100"}`}>
                <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
                    {/* Botão para abrir/recolher conversas – exibido em mobile */}
                    <button
                        className="md:hidden p-2 rounded focus:outline-none hover:opacity-80"
                        onClick={toggleConversationsAction}
                        title="Conversas"
                    >
                        <FiMenu className={`${darkMode ? "text-gray-100" : "text-gray-800"}`} size={24} />
                    </button>
                    <h1 className={`text-xl font-semibold ${darkMode ? "text-gray-100" : "text-gray-800"}`}>
                        ChatBot
                    </h1>
                    {/* Área de configurações */}
                    <div className="flex items-center">
                        {/* Em desktop, exibe os ícones */}
                        <div className="hidden md:flex items-center space-x-4">
                            {user && (
                                <div className="flex items-center space-x-2" title={t("usuario") || "Usuário"}>
                                    <FiUser className={`${darkMode ? "text-gray-100" : "text-gray-800"}`} size={20} />
                                    <span className={`text-sm ${darkMode ? "text-gray-100" : "text-gray-800"}`}>
                                        Olá, {user.name}
                                    </span>
                                </div>
                            )}
                            <div className="flex items-center space-x-1">
                                <FiGlobe
                                    className={`${darkMode ? "text-gray-100" : "text-gray-800"}`}
                                    size={20}
                                    title={t("idioma") || "Idioma"}
                                />
                                <div className="w-40 cursor-pointer">
                                    <Select
                                        options={options}
                                        value={options.find((o) => o.value === selectedLang)}
                                        onChange={handleLanguageChange}
                                        instanceId="language-select"
                                        className="react-select-container"
                                        classNamePrefix="react-select"
                                        placeholder="IDIOMA"
                                        isSearchable
                                        styles={{
                                            control: (provided) => ({
                                                ...provided,
                                                backgroundColor: "transparent",
                                                border: "none",
                                                boxShadow: "none",
                                            }),
                                            singleValue: (provided) => ({
                                                ...provided,
                                                color: darkMode ? "#f7fafc" : "#2d3748",
                                            }),
                                        }}
                                    />
                                </div>
                            </div>
                            <button
                                onClick={handleEditProfile}
                                className="p-2 rounded focus:outline-none hover:opacity-80"
                                title={t("editarPerfil") || "Editar Perfil"}
                            >
                                <FiEdit size={20} className="text-blue-500 hover:text-blue-400" />
                            </button>
                            <button
                                onClick={toggleDarkMode}
                                className="p-2 rounded focus:outline-none hover:opacity-80"
                                title={darkMode ? (t("modoClaro") || "Modo Claro") : (t("modoEscuro") || "Modo Escuro")}
                            >
                                {darkMode ? (
                                    <FiSun size={20} className="text-white hover:text-gray-200" title="Modo Claro" />
                                ) : (
                                    <FiMoon size={20} className="text-black hover:text-gray-700" title="Modo Escuro" />
                                )}
                            </button>
                            <button
                                onClick={handleLogout}
                                className="p-2 rounded focus:outline-none hover:opacity-80"
                                title={t("logout") || "Logout"}
                            >
                                <FiLogOut size={20} className="text-red-500 hover:text-red-400" />
                            </button>
                        </div>
                        {/* Em mobile, exibe ícone para abrir configurações */}
                        <div className="md:hidden">
                            <button
                                className="p-2 rounded focus:outline-none hover:opacity-80"
                                onClick={() => setSettingsOpen(true)}
                                title="Configurações"
                            >
                                <FiEdit className={`${darkMode ? "text-gray-100" : "text-gray-800"}`} size={24} />
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Modal de edição de perfil */}
            {profileModalOpen && (
                <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white dark:bg-gray-900 rounded-lg p-6 w-11/12 max-w-md">
                        <div className="flex justify-end">
                            <button
                                onClick={() => setProfileModalOpen(false)}
                                className="text-red-500 focus:outline-none hover:opacity-80"
                                title="Fechar"
                            >
                                <FiX size={24} />
                            </button>
                        </div>
                        <form onSubmit={handleProfileUpdate} className="mt-4">
                            <h1 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
                                Editar Perfil
                            </h1>
                            <input
                                type="text"
                                value={profileName}
                                onChange={(e) => setProfileName(e.target.value)}
                                className="w-full p-2 mb-3 border rounded bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                                placeholder="Nome"
                            />
                            <input
                                type="text"
                                value={profilePreferredLanguage}
                                onChange={(e) => setProfilePreferredLanguage(e.target.value)}
                                className="w-full p-2 mb-3 border rounded bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                                placeholder="Idioma Preferido"
                            />
                            <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                                Atualizar
                            </button>
                        </form>
                        <button
                            onClick={handleProfileDelete}
                            className="w-full p-2 bg-red-500 text-white rounded hover:bg-red-600 mt-3"
                        >
                            Excluir Conta
                        </button>
                    </div>
                </div>
            )}

            {/* Modal de configurações para mobile (opcional) */}
            {settingsOpen && (
                <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white dark:bg-gray-900 rounded-lg p-6 w-11/12 max-w-md">
                        <div className="flex justify-end">
                            <button
                                onClick={() => setSettingsOpen(false)}
                                className="text-red-500 focus:outline-none hover:opacity-80"
                                title="Fechar"
                            >
                                <FiX size={24} />
                            </button>
                        </div>
                        <div className="grid grid-cols-2 gap-4 mt-4">
                            <button
                                onClick={handleEditProfile}
                                className="flex flex-col items-center justify-center p-2 bg-blue-600 hover:bg-blue-500 rounded text-white"
                                title={t("editarPerfil") || "Editar Perfil"}
                            >
                                <FiEdit size={20} />
                                <span className="text-xs mt-1">Editar</span>
                            </button>
                            <button
                                onClick={toggleDarkMode}
                                className="flex flex-col items-center justify-center p-2 bg-gray-600 hover:bg-gray-500 rounded text-white"
                                title={darkMode ? (t("modoClaro") || "Modo Claro") : (t("modoEscuro") || "Modo Escuro")}
                            >
                                {darkMode ? <FiSun size={20} className="text-white" /> : <FiMoon size={20} className="text-black" />}
                                <span className="text-xs mt-1">{darkMode ? "Claro" : "Escuro"}</span>
                            </button>
                            <div
                                className="flex flex-col items-center justify-center p-2 bg-green-600 rounded text-white"
                                title={t("idioma") || "Idioma"}
                            >
                                <FiGlobe size={20} />
                                <div className="w-28 mt-1">
                                    <Select
                                        options={options}
                                        value={options.find((o) => o.value === selectedLang)}
                                        onChange={handleLanguageChange}
                                        className="react-select-container"
                                        classNamePrefix="react-select"
                                        placeholder="IDIOMA"
                                        isSearchable
                                        styles={{
                                            control: (provided) => ({
                                                ...provided,
                                                backgroundColor: "transparent",
                                                border: "none",
                                                boxShadow: "none",
                                            }),
                                            singleValue: (provided) => ({
                                                ...provided,
                                                color: darkMode ? "#f7fafc" : "#2d3748",
                                            }),
                                        }}
                                    />
                                </div>
                            </div>
                            <button
                                onClick={handleLogout}
                                className="flex flex-col items-center justify-center p-2 bg-black hover:bg-gray-700 rounded text-white"
                                title={t("logout") || "Logout"}
                            >
                                <FiLogOut size={20} />
                                <span className="text-xs mt-1">Sair</span>
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default TopMenu;
