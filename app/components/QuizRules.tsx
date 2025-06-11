"use client";
import React from "react";
import { useTranslation } from "react-i18next";

export default function QuizRules() {
    const { t } = useTranslation();

    return (
        <div className="bg-white dark:bg-neutral-900 p-6 rounded-xl shadow-md w-full transition-colors duration-300 text-black dark:text-white">
            <h2 className="text-2xl font-bold mb-4">{t("quizhero.rules_title")}</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-800 dark:text-gray-300">
                <li>{t("quizhero.rules.1")}</li>
                <li>{t("quizhero.rules.2")}</li>
                <li>{t("quizhero.rules.3")}</li>
                <li>{t("quizhero.rules.4")}</li>
                <li>{t("quizhero.rules.5")}</li>
                <li>{t("quizhero.rules.6")}</li>
                <li>{t("quizhero.rules.7")}</li>
                <li>{t("quizhero.rules.8")}</li>
                <li>{t("quizhero.rules.9")}</li>
                <li>{t("quizhero.rules.10")}</li>
            </ul>
        </div>
    );
}
