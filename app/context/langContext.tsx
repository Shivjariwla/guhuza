"use client";
import { createContext, useState, useContext, ReactNode, useEffect } from "react";
import i18n from "i18next";

type Lang = "en" | "fr";

interface LangContextType {
    lang: Lang;
    toggleLang: () => void;
}

export const LangContext = createContext<LangContextType>({
    lang: "en",
    toggleLang: () => { },
});

export const LangProvider = ({ children }: { children: ReactNode }) => {
    const [lang, setLang] = useState<Lang>("en");

    useEffect(() => {
        const storedLang = (typeof window !== "undefined" && localStorage.getItem("lang")) as Lang | null;
        const initialLang = storedLang || "en";
        setLang(initialLang);
        i18n.changeLanguage(initialLang);
    }, []);

    const toggleLang = () => {
        const newLang = lang === "en" ? "fr" : "en";
        setLang(newLang);
        if (typeof window !== "undefined") {
            localStorage.setItem("lang", newLang);
        }
        i18n.changeLanguage(newLang);
    };

    return (
        <LangContext.Provider value={{ lang, toggleLang }}>
            {children}
        </LangContext.Provider>
    );
};

export const useLang = () => useContext(LangContext);
