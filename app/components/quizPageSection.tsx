"use client";
import React, { useState } from "react";
import QuizCard from "./quizCard";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { setCookie } from "cookies-next";
import { useLang } from "../context/langContext";

type quizeType = {
    question: string;
    comment: string;
    test_answer: number;
    answers: string[];
};

export default function QuizPageSection({ Quizes, levelNumber, levelTitle, player }: any) {
    const { lang } = useLang();
    const t = (en: string, fr: string) => (lang === "fr" ? fr : en);

    const len = Quizes.length;
    const router = useRouter();
    const [score, setScore] = useState<number>(0);
    const [questionNumber, setQuestionNumber] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(-1);
    const [answerChecked, setAnswerChecked] = useState(false);
    const [ansCorrect, setAnsCorrect] = useState(false);
    const [usedHint, setUsedHint] = useState(false);
    const [retried, setRetried] = useState(false);

    const quizer: quizeType = Quizes[questionNumber];

    const setDefault = () => {
        setSelectedAnswer(-1);
        setAnswerChecked(false);
        setAnsCorrect(false);
        setUsedHint(false);
        setRetried(false);
    };

    const handleNextLevel = async () => {
        if (!player.Playerpoint) {
            setCookie("tempScore", score);
            router.push("/");
        } else {
            const nextLevel = Number(levelNumber) + 1;
            const finalScore = score + player?.Playerpoint;
            const playerId = player?.Player_ID;
            const newlevel = Math.max(player.Level_Id, nextLevel);

            try {
                const response = await fetch("/api/updateScore", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ playerId, finalScore, newlevel }),
                });

                if (response.ok) {
                    const data = await response.json();
                    router.push(`/quiz/${newlevel}`);
                }
            } catch (error) {
                console.error("Score update failed", error);
            }
        }
    };

    const handleScore = () => {
        setAnswerChecked(true);
        if (selectedAnswer === quizer.test_answer) {
            setScore(score + (retried ? 10 : 30));
        }
    };

    const handleRetry = () => {
        setScore(0);
        setQuestionNumber(0);
        router.push("/quiz/" + levelNumber);
    };

    const handleNextQuestion = () => {
        if (questionNumber < len) {
            setQuestionNumber(questionNumber + 1);
            setDefault();
        }
    };

    return questionNumber < len ? (
        <div className="md:py-16 pt-8 pb-28">
            <div className="container flex justify-between flex-wrap">
                <h2 className="title mb-4 md:mb-16">
                    {t("Level", "Niveau")} {levelNumber} : {levelTitle}
                </h2>
                <p>
                    {t("Question", "Question")} : {questionNumber + 1}/{len}
                </p>
            </div>

            <div className="container">
                <div className="flex justify-start md:gap-20">
                    <div className="flex-1">
                        <QuizCard
                            Question={quizer.question}
                            CorrectAns={quizer.test_answer}
                            Answers={quizer.answers}
                            selectedAnswer={selectedAnswer}
                            setSelectedAnswer={setSelectedAnswer}
                            checked={answerChecked}
                            setAnsCorrect={setAnsCorrect}
                        />

                        <div className="mt-10">
                            {answerChecked ? (
                                !ansCorrect ? (
                                    <div>
                                        <div className="flex gap-10">
                                            <button
                                                className="quizPbtn"
                                                onClick={() => {
                                                    setSelectedAnswer(-1);
                                                    setAnswerChecked(false);
                                                    setRetried(true);
                                                }}
                                                disabled={usedHint}
                                            >
                                                {t("Retry", "Recommencer")}
                                            </button>
                                            <button
                                                className="quizSbtn"
                                                onClick={() => {
                                                    setSelectedAnswer(quizer.test_answer);
                                                    setUsedHint(true);
                                                }}
                                            >
                                                {t("Display Answer", "Afficher la réponse")}
                                            </button>
                                        </div>
                                        <p className="mt-6 text-sm absolute">
                                            {t(
                                                "You can use Display Answer to force move to next question without any point",
                                                "Vous pouvez utiliser « Afficher la réponse » pour passer à la question suivante sans gagner de points"
                                            )}
                                        </p>
                                    </div>
                                ) : (
                                    <div className="flex">
                                        <button className="quizPbtn ml-auto" onClick={handleNextQuestion}>
                                            {questionNumber < len - 1
                                                ? t("Next Question", "Question suivante")
                                                : t("Finish Quiz", "Terminer le quiz")}
                                        </button>
                                    </div>
                                )
                            ) : (
                                <button
                                    className="quizPbtn"
                                    onClick={handleScore}
                                    disabled={selectedAnswer === -1}
                                >
                                    {t("Check Answer", "Vérifier la réponse")}
                                </button>
                            )}
                        </div>
                    </div>

                    <div className="hidden md:block flex-1/2 w-100">
                        <Image
                            src={
                                answerChecked
                                    ? ansCorrect
                                        ? "/mascot/greetingMascot.svg"
                                        : "/mascot/sadMascot.svg"
                                    : "/mascot/proudMascot.svg"
                            }
                            alt="Mascot"
                            height={100}
                            width={200}
                            className="motion-preset-fade"
                        />
                    </div>
                </div>
            </div>
        </div>
    ) : (
        <div className="md:py-16 py-8">
            <div className="container flex flex-col items-center">
                <h1 className="title text-center">{t("Lesson Complete !", "Leçon terminée !")}</h1>

                <div className="flex flex-wrap-reverse justify-center gap-8 items-center mt-6">
                    <div className="flex flex-col gap-8">
                        <div className="bg-yellow-50 border-2 border-yellow-300 rounded px-6 py-4 flex flex-col items-center">
                            <p className="mt-4 text-xl">⭐ {t("PTS GAINED", "POINTS GAGNÉS")}</p>
                            <h1 className="text-6xl font-bold">{score}</h1>
                        </div>
                        <div className="bg-blue-50 border-2 border-blue-100 rounded px-6 py-4 flex flex-col items-center">
                            <p className="mt-4 text-xl">🏆 {t("TOTAL SCORE", "SCORE TOTAL")}</p>
                            <h1 className="text-6xl font-bold">
                                {player?.Playerpoint ? player.Playerpoint + score : score}
                            </h1>
                        </div>
                    </div>

                    <Image
                        src="/mascot/proudMascot.svg"
                        width={250}
                        height={30}
                        alt="Guhuza Mascot"
                        className="mt-8"
                    />
                </div>

                <button className="quizPbtn mt-20" onClick={handleNextLevel}>
                    {t("Save Score", "Enregistrer le score")}
                </button>

                <div className="flex flex-wrap justify-center gap-6 mt-8">
                    <button className="flex gap-4" onClick={handleRetry}>
                        🔁 {t("Retry Same Lesson", "Recommencer la même leçon")}
                    </button>
                    <button className="flex gap-4" onClick={() => console.log("share")}>
                        📤 {t("Share Score on social Media", "Partager le score sur les réseaux sociaux")}
                    </button>
                </div>
            </div>
        </div>
    );
}
