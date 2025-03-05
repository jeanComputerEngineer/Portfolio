"use client";
import React, { useState } from "react";
import { FiX, FiEye, FiEyeOff } from "react-icons/fi";
import { useTranslation } from "react-i18next";
import { csrfFetch } from "@/utils/csrfFetch";

// Função de validação de senha forte
function validateStrongPassword(password: string): boolean {
    // Exemplo: mínimo 8 caracteres, pelo menos 1 letra maiúscula, 1 minúscula, 1 dígito e 1 símbolo
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;
    return regex.test(password);
}

const ChangePasswordModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
    const { t } = useTranslation();
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [modalError, setModalError] = useState("");
    const [success, setSuccess] = useState("");
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            setModalError(t("passwordMismatch"));
            return;
        }
        if (!validateStrongPassword(newPassword)) {
            setModalError(t("passwordWeak") || "A senha não atende aos requisitos de segurança.");
            return;
        }
        try {
            const res = await csrfFetch("https://backchat.jeanhenrique.site/api/auth/changePassword", {
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
        // z-index elevado para ficar acima do modal de editar perfil
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black bg-opacity-50">
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
                    <div className="relative">
                        <input
                            type={showCurrentPassword ? "text" : "password"}
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            className="w-full p-2 pr-10 mb-3 border rounded bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                            required
                        />
                        <button
                            type="button"
                            className="absolute inset-y-0 right-0 pr-2 flex items-center"
                            onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                        >
                            {showCurrentPassword ? <FiEyeOff /> : <FiEye />}
                        </button>
                    </div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t("newPassword")}</label>
                    <div className="relative">
                        <input
                            type={showNewPassword ? "text" : "password"}
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="w-full p-2 pr-10 mb-3 border rounded bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                            required
                        />
                        <button
                            type="button"
                            className="absolute inset-y-0 right-0 pr-2 flex items-center"
                            onClick={() => setShowNewPassword(!showNewPassword)}
                        >
                            {showNewPassword ? <FiEyeOff /> : <FiEye />}
                        </button>
                    </div>
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

export default ChangePasswordModal;
