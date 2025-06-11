"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import ShareButton from "./buttons/sharebtn";
import { useTranslation } from "react-i18next";

function QuizHero() {
    const [showRules, setShowRules] = useState(false);
    const router = useRouter();
    const { t } = useTranslation();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleAcceptRules = () => {
        setShowRules(false);
        router.push("/quiz/1?showRules=true");
    };

    if (!mounted) return null;

    return (
        <div>
            {/* Hero Section */}
            <div className="container mx-auto px-4 py-16 mt-10 bg-white dark:bg-black transition-colors duration-300">
                <div className="flex flex-col md:flex-row items-center">
                    {/* Text Section */}
                    <div className="md:w-1/2 space-y-6 text-center md:text-left">
                        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-gray-800 dark:text-white">
                            {t("quizhero.heading")}
                        </h1>

                        <p className="text-gray-600 dark:text-gray-300 text-lg">
                            {t("quizhero.description")}
                        </p>

                        <div className="flex justify-center md:justify-start space-x-4">
                            <button
                                onClick={() => setShowRules(true)}
                                className="bg-[#2d3748] text-white font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-[#1a202c] transition"
                            >
                                {t("quizhero.start_quiz")}
                            </button>
                            <ShareButton />
                        </div>
                    </div>

                    {/* Image Section */}
                    <div className="mt-8 md:mt-0 md:w-1/2 flex justify-center">
                        <Image
                            src="/Images/herosection/heroimage.webp"
                            alt="A person giving an interview and smiling"
                            className="rounded-md shadow-lg w-full hidden lg:max-w-lg md:block"
                            width={500}
                            height={300}
                            priority
                        />
                    </div>
                </div>
            </div>

            {/* Rules Modal */}
            {showRules && (
                <div className="fixed inset-0 z-50 bg-black bg-opacity-70 flex justify-center items-center">
                    <div className="relative bg-white dark:bg-neutral-900 p-8 rounded-xl shadow-xl w-[90%] max-w-xl text-center transition-colors duration-300">
                        {/* ✖ Close Button */}
                        <button
                            onClick={() => setShowRules(false)}
                            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:hover:text-white text-xl font-bold"
                            aria-label="Close"
                        >
                            ✖
                        </button>

                        <h2 className="text-3xl font-bold mb-4 text-black dark:text-white">{t("quizhero.rules_title")}</h2>
                        <ul className="text-left list-disc list-inside text-gray-800 dark:text-gray-300 space-y-2 mb-6">
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
                        <button
                            onClick={handleAcceptRules}
                            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
                        >
                            {t("quizhero.understood")}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default QuizHero;
