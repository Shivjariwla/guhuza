"use client";

import { useState } from "react";
import { useLang } from "@/app/context/langContext";

type quizCardType = {
    Question: string;
    CorrectAns: number;
    Answers: string[];
    selectedAnswer: number;
    setSelectedAnswer: any;
    checked: boolean;
    setAnsCorrect: any;
};

export default function QuizCard({
    Question,
    Answers,
    CorrectAns,
    selectedAnswer,
    setSelectedAnswer,
    checked,
    setAnsCorrect,
}: quizCardType) {
    const { lang } = useLang(); // ✅ Get language from context

    // ✅ Voice playback helper with dynamic language
    const speakText = (text: string) => {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = lang === "fr" ? "fr-FR" : "en-US";
        window.speechSynthesis.speak(utterance);
    };

    const handleOptionSelected = (key: number) => {
        setSelectedAnswer(key);
        console.log(key);
    };

    const setButtonStyle = (key: number): string => {
        if (key === selectedAnswer) {
            if (checked) {
                if (selectedAnswer === CorrectAns) {
                    setAnsCorrect(true);
                    return "cQuizButton after:content-['✅'] after:absolute md:after:right-10";
                }
                return "FquizButton after:content-['❌'] after:absolute md:after:right-10";
            }
            return "selectedQBtn";
        }
        return "";
    };

    return (
        <div className="m-0 p-0">
            {/* ✅ 1. Voice for question (Black button, no underline) */}
            <div className="flex items-center justify-between">
                <h3 className="text-3xl font-semibold text-gray-800 dark:text-white motion-delay-150 motion-preset-slide-up">
                    {Question}
                </h3>
                <button
                    onClick={() => speakText(Question)}
                    className="text-black dark:text-white text-sm"
                >
                    🔊
                </button>
            </div>

            <div className="grid gap-8 pt-9 w-full">
                {Answers.map((answer: string, key: number) => (
                    <div key={key} className="w-full group relative">
                        <div className="flex items-center justify-between">
                            <button
                                className={
                                    setButtonStyle(key) +
                                    ` quizButton px-6 py-3 rounded-lg transition-transform transform active:translate-y-1 text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-lg w-full text-left motion-preset-slide-up-md motion-preset-fade`
                                }
                                onClick={() => handleOptionSelected(key)}
                                disabled={checked}
                            >
                                {answer}
                            </button>
                            {/* ✅ 2. Voice for answer (Black, no underline) */}
                            <button
                                onClick={() => speakText(answer)}
                                className="text-black dark:text-white text-sm ml-2"
                            >
                                🔊
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
