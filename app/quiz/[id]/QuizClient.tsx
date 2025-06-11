"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Timer from "@/app/components/Timer";
import QuizCard from "@/app/components/quizCard";
import Image from "next/image";
import ShareIconsOnly from "@/app/components/buttons/shareIconsOnly";
import { PlayerWithMilestone } from "@/utils/fUser";
import { useLang } from "@/app/context/langContext";

interface QuizType {
    question: string;
    comment: string;
    test_answer: number;
    answers: string[];
}

interface Props {
    Quizes: QuizType[];
    levelNumber: string;
    levelTitle: string;
    player: PlayerWithMilestone | null;
}

export default function QuizClient({ Quizes, levelNumber, levelTitle, player }: Props) {
    const router = useRouter();
    const { lang } = useLang();
    const len = Array.isArray(Quizes) ? Quizes.length : 0;

    const [currentIndex, setCurrentIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(-1);
    const [answerChecked, setAnswerChecked] = useState(false);
    const [ansCorrect, setAnsCorrect] = useState(false);
    const [usedHint, setUsedHint] = useState(false);
    const [retried, setRetr] = useState(false);
    const [scoreSaved, setScoreSaved] = useState(false);
    const [showUnlockPopup, setShowUnlockPopup] = useState(false);
    const [translatedQuiz, setTranslatedQuiz] = useState<QuizType[]>([]);


    const speakText = (text: string) => {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = lang === "fr" ? "fr-FR" : "en-US";
        speechSynthesis.speak(utterance);
    };

    const quizer = translatedQuiz[currentIndex] ?? {
        question: "",
        comment: "",
        test_answer: 0,
        answers: [],
    };


    const t = (en: string, fr: string) => (lang === "fr" ? fr : en);

    const translateText = async (text: string, targetLang = "fr") => {
        const res = await fetch(
            `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${targetLang}&dt=t&q=${encodeURIComponent(text)}`
        );
        const data = await res.json();
        return data[0][0][0];
    };

    useEffect(() => {
        const translateAll = async () => {
            if (lang === "fr") {
                const translated = await Promise.all(
                    Quizes.map(async (q) => {
                        const translatedQuestion = await translateText(q.question);
                        const translatedAnswers = await Promise.all(
                            q.answers.map((a) => translateText(a))
                        );
                        return {
                            ...q,
                            question: translatedQuestion,
                            answers: translatedAnswers,
                        };
                    })
                );
                setTranslatedQuiz(translated);
            } else {
                setTranslatedQuiz(Quizes);
            }
        };
        translateAll();
    }, [Quizes, lang]);



    useEffect(() => {
        if (currentIndex >= len && !scoreSaved) {
            handleNextLevel();
        }
    }, [currentIndex, len, scoreSaved]);

    useEffect(() => {
        setSelectedAnswer(-1);
        setAnswerChecked(false);
        setAnsCorrect(false);
        setUsedHint(false);
        setRetr(false);
    }, [currentIndex]);

    const nextQuestion = useCallback(() => {
        setCurrentIndex((i) => i + 1);
    }, []);

    const handleScore = () => {
        setAnswerChecked(true);
        const correct = selectedAnswer === quizer.test_answer;
        setAnsCorrect(correct);
        if (correct) {
            setScore((prev) => prev + 1);
        }
    };

    const handleExpire = () => nextQuestion();

    const handleNextLevel = async () => {
        const playerId = player?.Player_ID;
        const earnedScore = score;
        const currentLevel = parseInt(levelNumber);

        if (!playerId || isNaN(earnedScore)) return;

        // ✅ Always send score
        const payload = {
            playerId,
            score: earnedScore,
            newlevel:
                player?.Level_Id === currentLevel && earnedScore === len
                    ? currentLevel + 1
                    : player?.Level_Id, // if not unlocking, send same level
        };

        try {
            const res = await fetch("/api/updateScore", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            const data = await res.json();
            console.log("✅ updateScore response:", data);

            if (res.ok) {
                setScoreSaved(true);
                if (payload.newlevel !== player?.Level_Id) {
                    setShowUnlockPopup(true); // 🎉 only show if unlocked
                }
            }
        } catch (e) {
            console.error("🔥 Fetch failed:", e);
        }
    };





    const handleRetry = () => {
        setScore(0);
        setScoreSaved(false);
        window.location.href = `/quiz/${levelNumber}`;
    };

    if (len === 0) {
        return (
            <div className="text-center py-10">
                <p className="text-xl text-red-500 font-semibold">⚠️ No quiz data available.</p>
            </div>
        );
    }

    return (
        <div className="bg-white dark:bg-[#111] text-black dark:text-white transition-colors duration-300 pt-12 pb-10">
            {showUnlockPopup && (
                <div className="fixed inset-0 z-50 bg-black bg-opacity-60 flex items-center justify-center">
                    <div className="bg-white dark:bg-neutral-900 text-black dark:text-white p-6 rounded-xl shadow-lg w-[90%] max-w-md text-center">
                        <h2 className="text-2xl font-bold mb-4">🎉 {t("New Level Unlocked!", "Nouveau niveau débloqué !")}</h2>
                        <p className="mb-6">{t("Great job! You've unlocked the next level. Ready to keep going?", "Bravo ! Vous avez débloqué le niveau suivant. Prêt à continuer ?")}</p>
                        <div className="flex justify-center gap-4">
                            <button
                                onClick={() => setShowUnlockPopup(false)}
                                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg"
                            >
                                {t("Continue", "Continuer")}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className="container mx-auto px-4 max-w-3xl">
                {currentIndex < len ? (
                    <>
                        <div className="flex justify-between items-center mb-8">
                            <h1 className="text-3xl font-bold">{t("Level", "Niveau")} {levelNumber}: {levelTitle}</h1>
                            <div className="flex space-x-6 text-gray-600 dark:text-gray-300">
                                <span className="text-sm">{t("Question", "Question")} {currentIndex + 1}/{len}</span>
                                <span className="text-sm">{t("Score", "Score")} {score}</span>
                            </div>
                        </div>

                        <div className="mb-6">
                            <Timer key={currentIndex} initialSeconds={60} onExpire={handleExpire} />
                        </div>

                        <div className="flex flex-col md:flex-row md:space-x-8 items-start">
                            <div className="md:w-3/4">
                                <QuizCard
                                    Question={quizer.question}
                                    CorrectAns={quizer.test_answer}
                                    Answers={quizer.answers}
                                    selectedAnswer={selectedAnswer}
                                    setSelectedAnswer={setSelectedAnswer}
                                    checked={answerChecked}
                                    setAnsCorrect={setAnsCorrect}
                                />

                                <div className="mt-8">
                                    {answerChecked ? (
                                        !ansCorrect ? (
                                            <div className="space-y-4">
                                                <div className="flex space-x-4">
                                                    <button className="quizPbtn" onClick={() => { setRetr(true); setAnswerChecked(false); }} disabled={usedHint}>{t("Retry", "Réessayer")}</button>
                                                    <button className="quizSbtn" onClick={() => { setSelectedAnswer(quizer.test_answer); setUsedHint(true); }}>{t("Display Answer", "Afficher la réponse")}</button>
                                                </div>
                                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                                    {t("Use Display Answer to move on without points.", "Utilisez 'Afficher la réponse' pour continuer sans gagner de points.")}
                                                </p>
                                            </div>
                                        ) : (
                                            <button className="quizPbtn mt-4" onClick={nextQuestion}>
                                                {currentIndex < len - 1 ? t("Next Question", "Question suivante") : t("Finish Quiz", "Terminer le quiz")}
                                            </button>
                                        )
                                    ) : (
                                        <button className="quizPbtn" onClick={handleScore} disabled={selectedAnswer < 0}>
                                            {t("Check Answer", "Vérifier la réponse")}
                                        </button>
                                    )}
                                </div>
                            </div>

                            <div className="md:w-1/4 flex justify-center self-start md:-mt-8">
                                <Image
                                    src={
                                        answerChecked
                                            ? ansCorrect
                                                ? "/mascot/greetingMascot.svg"
                                                : "/mascot/sadMascot.svg"
                                            : "/mascot/proudMascot.svg"
                                    }
                                    alt="Mascot"
                                    width={200}
                                    height={200}
                                />
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="text-center mt-16 space-y-6">
                        <h2 className="text-4xl font-bold">🎉 {t("Quiz Completed!", "Quiz terminé !")}</h2>

                        <Image
                            src="/mascot/greetingMascot.svg"
                            alt="Mascot"
                            width={200}
                            height={200}
                            className="mx-auto"
                        />

                        <p className="text-2xl">{t("Your Score", "Votre score")}: <strong>{score}</strong> / {len}</p>

                        <div className="flex justify-center gap-4 flex-wrap mt-4">
                            <button className="quizPbtn" onClick={handleRetry}>
                                {t("Play Again", "Rejouer")}
                            </button>

                            <button className="quizSbtn" onClick={() => router.push("/profile")}>
                                {t("Go to Profile", "Aller au profil")}
                            </button>

                            <ShareIconsOnly score={score} levelTitle={levelTitle} levelNumber={levelNumber} />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}


