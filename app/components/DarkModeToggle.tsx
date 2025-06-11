"use client";
import { useEffect, useState } from "react";

export default function DarkModeToggle() {
    const [dark, setDark] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        const theme = localStorage.getItem("theme");
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

        const isDark = theme === "dark" || (!theme && prefersDark);
        document.documentElement.classList.toggle("dark", isDark);
        setDark(isDark);
        setMounted(true);
    }, []);

    const toggleTheme = () => {
        const isDark = !dark;
        document.documentElement.classList.toggle("dark", isDark);
        localStorage.setItem("theme", isDark ? "dark" : "light");
        setDark(isDark);
    };

    if (!mounted) return null;

    return (
        <button
            onClick={toggleTheme}
            className="px-3 py-1 border rounded-md transition-colors duration-300 
                 border-white text-white"
        >
            {dark ? "☀️ Light" : "🌙 Dark"}
        </button>
    );
}
