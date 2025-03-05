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
    FiKey
} from "react-icons/fi";
import { useRouter } from "next/navigation";
import { useTheme } from "@/context/ThemeContext";
import { useTranslation } from "react-i18next";
import i18n, { languageNames } from "@/components/Tradutor/i18n";
import Select from "react-select";

const ChangePasswordModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
    const { t } = useTranslation();
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [modalError, setModalError] = useState("");
    const [success, setSuccess] = useState("");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            setModalError(t("passwordMismatch"));
            return;
        }
        try {
            const res = await fetch("https://backchat.jeanhenrique.site/api/auth/changePassword", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },

                body: JSON.stringify({ currentPassword, newPassword }),
            });
            if (res.ok) {
                setSuccess(t("passwordChangedSuccessfully"));
                setModalError("");
                setTimeout(() => onClose(), 1500);
            } else {
                const data = await res.json();
                setModalError(data.message || t("passwordChangeError"));
            }
        } catch (err) {
            console.error("Password change error:", err);
            setModalError(t("passwordChangeError"));
        }
    };

    return (
        <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white dark:bg-gray-900 rounded-lg p-6 w-11/12 max-w-sm">
                <div className="flex justify-end">
                    <button onClick={onClose} className="text-red-500 focus:outline-none hover:opacity-80" title={t("close")}>
                        <FiX size={24} />
                    </button>
                </div>
                <h2 className="text-lg font-bold mb-4 text-gray-900 dark:text-white">{t("changePassword")}</h2>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">{t("passwordChangeInstruction")}</p>
                {modalError && <p className="text-red-500 mb-2">{modalError}</p>}
                {success && <p className="text-green-500 mb-2">{success}</p>}
                <form onSubmit={handleSubmit}>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t("currentPassword")}</label>
                    <input
                        type="password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        className="w-full p-2 mb-3 border rounded bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                        required
                    />
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t("newPassword")}</label>
                    <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="w-full p-2 mb-3 border rounded bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                        required
                    />
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t("confirmPassword")}</label>
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full p-2 mb-3 border rounded bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                        required
                    />
                    <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                        {t("updatePassword")}
                    </button>
                </form>
            </div>
        </div>
    );
};

export interface TopMenuProps {
    toggleConversationsAction: () => void;
}

export function TopMenu({ toggleConversationsAction }: TopMenuProps) {
    const router = useRouter();
    const { darkMode, toggleDarkMode } = useTheme();
    const { t } = useTranslation();
    const [user, setUser] = useState<{ name: string; preferredLanguage: string } | null>(null);
    const [selectedLang, setSelectedLang] = useState("English");

    // Modal para edição de perfil e troca de senha
    const [profileModalOpen, setProfileModalOpen] = useState(false);
    const [profileName, setProfileName] = useState("");
    const [passwordModalOpen, setPasswordModalOpen] = useState(false);
    const [settingsOpen, setSettingsOpen] = useState(false);

    const options = languageNames
        .filter((lang) => {
            const allowed = [
                "English",
                "Portuguese",
                "Spanish",
                "French",
                "Arabic",
                "Chinese",
                "Russian",
                "Hindi",
                "Bengali",
                "Indonesian",
            ];
            return allowed.includes(lang);
        })
        .map((lang) => ({ value: lang, label: lang }));

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            const parsed = JSON.parse(storedUser);
            setUser(parsed);
            setSelectedLang(parsed.preferredLanguage || "English");
            setProfileName(parsed.name);
        }
    }, []);

    const handleLanguageChange = async (option: { value: string; label: string } | null) => {
        if (option) {
            setSelectedLang(option.value);
            i18n.changeLanguage(option.value);
            if (user) {
                try {
                    const res = await fetch("https://backchat.jeanhenrique.site/api/auth/account", {
                        method: "PUT",
                        headers: { "Content-Type": "application/json" },

                        body: JSON.stringify({ name: user.name, preferredLanguage: option.value }),
                    });
                    if (res.ok) {
                        const data = await res.json();
                        localStorage.setItem("user", JSON.stringify(data.user));
                        setUser(data.user);
                    }
                } catch (err) {
                    console.error("Error updating language:", err);
                }
            }
        }
    };

    const handleEditProfile = () => setProfileModalOpen(true);
    const handleLogout = () => {
        setSettingsOpen(false);
        localStorage.removeItem("user");
        router.push("/login");
    };

    const handleProfileUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const res = await fetch("https://backchat.jeanhenrique.site/api/auth/account", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },

                body: JSON.stringify({ name: profileName }),
            });
            if (res.ok) {
                const data = await res.json();
                localStorage.setItem("user", JSON.stringify(data.user));
                setUser(data.user);
                alert(t("profileUpdated"));
                setProfileModalOpen(false);
            } else {
                alert(t("profileUpdateError"));
            }
        } catch (err) {
            console.error("Profile update error:", err);
            alert(t("profileUpdateError"));
        }
    };

    const handleOpenPasswordModal = () => setPasswordModalOpen(true);

    const handleProfileDelete = async () => {
        if (confirm(t("confirmDeleteAccount"))) {
            try {
                const res = await fetch("https://backchat.jeanhenrique.site/api/auth/account", {
                    method: "DELETE",

                });
                if (res.ok) {
                    localStorage.removeItem("user");
                    router.push("/register");
                } else {
                    alert(t("accountDeleteError"));
                }
            } catch {
                alert(t("accountDeleteError"));
            }
        }
    };

    return (
        <>
            <header className={`sticky top-0 z-50 w-full shadow ${darkMode ? "bg-black" : "bg-gray-100"}`}>
                <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
                    <button
                        className="md:hidden p-2 rounded focus:outline-none hover:opacity-80"
                        onClick={toggleConversationsAction}
                        title={t("conversations")}
                    >
                        <FiMenu className={darkMode ? "text-gray-100" : "text-gray-800"} size={24} />
                    </button>
                    <h1 className={`text-xl font-semibold ${darkMode ? "text-gray-100" : "text-gray-800"}`}>ChatBot</h1>
                    <div className="flex items-center">
                        <div className="hidden md:flex items-center space-x-4">
                            {user && (
                                <div className="flex items-center space-x-2" title={t("userGreeting")}>
                                    <FiUser className={darkMode ? "text-gray-100" : "text-gray-800"} size={20} />
                                    <span className={`text-sm ${darkMode ? "text-gray-100" : "text-gray-800"}`}>
                                        {t("userGreeting", { name: user.name })}
                                    </span>
                                </div>
                            )}
                            <div className="flex items-center space-x-1">
                                <FiGlobe className={darkMode ? "text-gray-100" : "text-gray-800"} size={20} title={t("language")} />
                                <div className="w-40 cursor-pointer">
                                    <Select
                                        options={options}
                                        value={options.find((o) => o.value === selectedLang)}
                                        onChange={handleLanguageChange}
                                        instanceId="language-select"
                                        className="react-select-container"
                                        classNamePrefix="react-select"
                                        placeholder={t("changeLanguage")}
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
                            <button onClick={handleEditProfile} className="p-2 rounded focus:outline-none hover:opacity-80" title={t("editProfile")}>
                                <FiEdit size={20} className="text-blue-500 hover:text-blue-400" />
                            </button>
                            <button onClick={toggleDarkMode} className="p-2 rounded focus:outline-none hover:opacity-80" title={darkMode ? t("lightMode") : t("darkMode")}>
                                {darkMode ? (
                                    <FiSun size={20} className="text-white hover:text-gray-200" title={t("lightMode")} />
                                ) : (
                                    <FiMoon size={20} className="text-black hover:text-gray-700" title={t("darkMode")} />
                                )}
                            </button>
                            <button onClick={handleLogout} className="p-2 rounded focus:outline-none hover:opacity-80" title={t("logout")}>
                                <FiLogOut size={20} className="text-red-500 hover:text-red-400" />
                            </button>
                        </div>
                        <div className="md:hidden">
                            <button className="p-2 rounded focus:outline-none hover:opacity-80" onClick={() => setSettingsOpen(true)} title={t("settings")}>
                                <FiEdit className={darkMode ? "text-gray-100" : "text-gray-800"} size={24} />
                            </button>
                        </div>
                    </div>
                </div>
            </header>
            {profileModalOpen && (
                <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white dark:bg-gray-900 rounded-lg p-6 w-11/12 max-w-md">
                        <div className="flex justify-end">
                            <button onClick={() => setProfileModalOpen(false)} className="text-red-500 focus:outline-none hover:opacity-80" title={t("close")}>
                                <FiX size={24} />
                            </button>
                        </div>
                        <form onSubmit={handleProfileUpdate} className="mt-4">
                            <h1 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">{t("editProfile")}</h1>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t("name")}</label>
                            <input
                                type="text"
                                value={profileName}
                                onChange={(e) => setProfileName(e.target.value)}
                                className="w-full p-2 mb-3 border rounded bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                                required
                            />
                            <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                                {t("updateProfile")}
                            </button>
                        </form>
                        <div className="mt-4">
                            <button onClick={handleOpenPasswordModal} className="w-full p-2 bg-yellow-500 text-white rounded hover:bg-yellow-600">
                                <FiKey className="inline mr-2" /> {t("changePassword")}
                            </button>
                        </div>
                        <div className="mt-4">
                            <button onClick={handleProfileDelete} className="w-full p-2 bg-red-500 text-white rounded hover:bg-red-600">
                                {t("deleteAccount")}
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {passwordModalOpen && <ChangePasswordModal onClose={() => setPasswordModalOpen(false)} />}
            {settingsOpen && (
                <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white dark:bg-gray-900 rounded-lg p-6 w-11/12 max-w-md">
                        <div className="flex justify-end">
                            <button onClick={() => setSettingsOpen(false)} className="text-red-500 focus:outline-none hover:opacity-80" title={t("close")}>
                                <FiX size={24} />
                            </button>
                        </div>
                        <div className="grid grid-cols-2 gap-4 mt-4">
                            <button onClick={handleEditProfile} className="flex flex-col items-center justify-center p-2 bg-blue-600 hover:bg-blue-500 rounded text-white" title={t("editProfile")}>
                                <FiEdit size={20} />
                                <span className="text-xs mt-1">{t("editProfile")}</span>
                            </button>
                            <button onClick={toggleDarkMode} className="flex flex-col items-center justify-center p-2 bg-gray-600 hover:bg-gray-500 rounded text-white" title={darkMode ? t("lightMode") : t("darkMode")}>
                                {darkMode ? <FiSun size={20} className="text-white" /> : <FiMoon size={20} className="text-black" />}
                                <span className="text-xs mt-1">{darkMode ? t("lightMode") : t("darkMode")}</span>
                            </button>
                            <div className="flex flex-col items-center justify-center p-2 bg-green-600 rounded text-white" title={t("language")}>
                                <FiGlobe size={20} />
                                <div className="w-28 mt-1">
                                    <Select
                                        options={options}
                                        value={options.find((o) => o.value === selectedLang)}
                                        onChange={handleLanguageChange}
                                        className="react-select-container"
                                        classNamePrefix="react-select"
                                        placeholder={t("changeLanguage")}
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
                            <button onClick={handleLogout} className="flex flex-col items-center justify-center p-2 bg-black hover:bg-gray-700 rounded text-white" title={t("logout")}>
                                <FiLogOut size={20} />
                                <span className="text-xs mt-1">{t("logout")}</span>
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default TopMenu;
