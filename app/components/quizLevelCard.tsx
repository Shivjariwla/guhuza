"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import Pbtn from "./buttons/primarybtn";

type QuizLevelCardTypes = {
    levelName: string;
    levelLink: string;
    levelNumber: number;
    currentLevel: number;
};

function QuizLevelCard({
    levelName,
    levelLink,
    levelNumber,
    currentLevel,
}: QuizLevelCardTypes) {
    const { t } = useTranslation();
    const router = useRouter();
    const [showRules, setShowRules] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleAcceptRules = () => {
        setShowRules(false);
        router.push(levelLink);
    };

    if (!mounted) return null;

    return (
        <>
            <div
                className={`levelContainer rounded-lg p-6 border-b-4 border-2 mt-10 lg:w-1/2 duration-300 lg:even:ml-auto
                    first-element-gradient intersect:motion-preset-slide-up-lg motion-delay-${1000 - levelNumber * 100
                    } intersect-once`}
            >
                <div className="flex gap-4">
                    <div className="flex items-center justify-center bg-blue-400 border-blue-400 text-[#191A23] w-8 h-8 rounded-full border-2 mb-4">
                        <p className="font-bold">{levelNumber}</p>
                    </div>
                    <div>
                        <h3 className="text-2xl font-semibold mb-2">{levelName}</h3>
                        <p className="text mb-4">
                            {t("quizlevelcard.num_questions")}: 10
                        </p>
                    </div>
                </div>

                <div className="pt-4 flex justify-end">
                    <div onClick={() => setShowRules(true)} className="cursor-pointer">
                        <Pbtn
                            toDestination="#"
                            theme={levelNumber === currentLevel ? "light" : "dark"}
                            message={t("quizlevelcard.start_quiz")}
                        />
                    </div>
                </div>
            </div>

            {showRules && (
                <div className="fixed inset-0 z-50 bg-black bg-opacity-70 flex justify-center items-center">
                    <div className="relative bg-white dark:bg-neutral-900 p-8 rounded-xl shadow-xl w-[90%] max-w-xl text-center transition-colors duration-300">
                        {/* Close Button */}
                        <button
                            onClick={() => setShowRules(false)}
                            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:hover:text-white text-xl font-bold"
                            aria-label="Close"
                        >
                            ✖
                        </button>

                        <h2 className="text-3xl font-bold mb-4 text-black dark:text-white">
                            {t("quizhero.rules_title")}
                        </h2>

                        <ul className="text-left list-disc list-inside text-gray-800 dark:text-gray-300 space-y-2 mb-6">
                            {[...Array(10)].map((_, i) => (
                                <li key={i}>{t(`quizhero.rules.${i + 1}`)}</li>
                            ))}
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
        </>
    );
}

export default QuizLevelCard;
