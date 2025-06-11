"use client";
import React from "react";
import { useTranslation } from "react-i18next";

export default function BadgeDisplay({ badge }: { badge: string }) {
    const { t } = useTranslation();

    if (!badge) return null;

    return (
        <div className="inline-block px-4 py-1 bg-yellow-100 dark:bg-yellow-800 text-yellow-800 dark:text-yellow-100 rounded text-sm font-semibold shadow transition-colors">
            🏅 {t(badge)}
        </div>
    );
}
