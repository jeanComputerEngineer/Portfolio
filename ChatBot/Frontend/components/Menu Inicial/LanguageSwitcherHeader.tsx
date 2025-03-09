"use client";
import React, { useState, useEffect } from "react";
import Select, { StylesConfig } from "react-select";
import { languageNames } from "@/components/Tradutor/i18n";
import { useTranslation } from "react-i18next";
import i18n from "@/components/Tradutor/i18n";
import { useTheme } from "@/context/ThemeContext";

type OptionType = {
    value: string;
    label: string;
};

const allowedLanguages = [
    "English",
    "Portuguese",
    "Spanish",
    "French",
    "Arabic",
    "Chinese",
    "Russian",
    "German",
    "Japanese",
    "Korean"
];

const options: OptionType[] = languageNames
    .filter((lang) => allowedLanguages.includes(lang))
    .map((lang) => ({ value: lang, label: lang }));

const LanguageSwitcherHeader: React.FC = () => {
    const { t } = useTranslation();
    const { darkMode } = useTheme();
    const [selectedLang, setSelectedLang] = useState("Portuguese");

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            const parsed = JSON.parse(storedUser);
            const lang = parsed.preferredLanguage || "Portuguese";
            setSelectedLang(lang);
            i18n.changeLanguage(lang);
        } else {
            i18n.changeLanguage("Portuguese");
        }
    }, []);

    const handleLanguageChange = (option: OptionType | null) => {
        if (option) {
            setSelectedLang(option.value);
            i18n.changeLanguage(option.value);
        }
    };

    const selectStyles: StylesConfig<OptionType, false> = {
        control: (provided) => ({
            ...provided,
            backgroundColor: darkMode ? "#2d3748" : "#fff",
            border: "none",
            boxShadow: "none",
            cursor: "pointer"
        }),
        singleValue: (provided) => ({
            ...provided,
            color: darkMode ? "#f7fafc" : "#2d3748"
        }),
        menu: (provided) => ({
            ...provided,
            backgroundColor: darkMode ? "#2d3748" : "#fff"
        }),
        option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isFocused
                ? darkMode
                    ? "#4a5568"
                    : "#e2e8f0"
                : darkMode
                    ? "#2d3748"
                    : "#fff",
            color: darkMode ? "#f7fafc" : "#2d3748",
            cursor: "pointer"
        })
    };

    return (
        <header className={`w-full p-2 shadow ${darkMode ? "bg-gray-900" : "bg-gray-100"}`}>
            <div className="max-w-7xl mx-auto flex items-center justify-end gap-4">
                <Select
                    options={options}
                    value={options.find((o) => o.value === selectedLang)}
                    onChange={handleLanguageChange}
                    instanceId="header-language-select"
                    className="w-48"
                    classNamePrefix="react-select"
                    placeholder={t("changeLanguage")}
                    isSearchable
                    styles={selectStyles}
                />
            </div>
        </header>
    );
};

export default LanguageSwitcherHeader;
