"use client";
import React, { useState, useContext } from "react";
import Link from "next/link";
import Image from "next/image";
import DarkModeToggle from "./DarkModeToggle";
import { LangContext } from "@/app/context/langContext";

function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { lang, toggleLang } = useContext(LangContext);
    const t = (en: string, fr: string) => (lang === "fr" ? fr : en);

    const LanguageButton = () => (
        <button
            onClick={toggleLang}
            className="text-white border px-3 py-1 rounded hover:bg-white hover:text-black transition"
        >
            {lang === "en" ? "FR" : "EN"}
        </button>
    );

    return (
        <header className="sticky top-0 z-50 bg-black dark:bg-black py-6 border-b border-neutral-700/60">
            <div className="container mx-auto px-4 py-3 flex items-center justify-between">
                {/* Logo */}
                <Link href="/quiz">
                    <img src="/logo/logo_white_large.png" alt="Logo" className="h-10" />
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center space-x-4">
                    <Link href="/quiz"><span className="text-white hover:underline">{t("Quiz", "Quiz")}</span></Link>
                    <Link href="/"><span className="text-white hover:underline">{t("Login", "Connexion")}</span></Link>
                    <Link href="/profile"><span className="text-white hover:underline">{t("Profile", "Profil")}</span></Link>
                    <a href="https://guhuza.com/" target="_blank">
                        <p className="text-white hover:underline flex items-center gap-1 group">
                            Guhuza{" "}
                            <Image
                                src="/icons/AnotherWebsite.svg"
                                className="transition-transform duration-300 group-hover:rotate-12"
                                alt="Guhuza Icon"
                                width={20}
                                height={20}
                            />
                        </p>
                    </a>
                    <DarkModeToggle />
                    <LanguageButton />
                </div>

                {/* Mobile Menu Icon */}
                <div className="md:hidden">
                    <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16m-7 6h7" />
                        </svg>
                    </button>
                </div>

                {/* Mobile Menu */}
                <div className={`fixed inset-y-0 right-0 w-64 bg-black transition-transform duration-300 z-50 ${isMenuOpen ? "translate-x-0" : "translate-x-full"}`}>
                    <div className="flex justify-end p-4">
                        <button onClick={() => setIsMenuOpen(false)} className="text-white">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    <div className="flex flex-col space-y-4 p-4 gap-8">
                        <Link href="/quiz"><span className="text-white hover:underline text-center">{t("Quiz", "Quiz")}</span></Link>
                        <Link href="/"><span className="text-white hover:underline text-center">{t("Login", "Connexion")}</span></Link>
                        <Link href="/profile"><span className="text-white hover:underline text-center">{t("Profile", "Profil")}</span></Link>
                        <a href="https://guhuza.com/" target="_blank" className="flex justify-center">
                            <p className="text-white hover:underline flex gap-1 group">
                                Guhuza{" "}
                                <Image src="/icons/AnotherWebsite.svg" className="transition-transform duration-300 group-hover:rotate-12" alt="" width={20} height={20} />
                            </p>
                        </a>
                        <div className="text-center mt-4"><DarkModeToggle /></div>
                        <div className="text-center"><LanguageButton /></div>
                    </div>
                </div>

                {/* Overlay for mobile menu */}
                {isMenuOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => setIsMenuOpen(false)} />
                )}
            </div>
        </header>
    );
}

export default Navbar;
