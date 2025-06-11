"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useLang } from "@/app/context/langContext";

type ProgressBarType = {
    percentage: number;
};

const ProgressBar = ({ percentage }: ProgressBarType) => (
    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full">
        <div
            className="bg-blue-600 text-xs font-medium text-white text-center p-0.5 leading-none rounded-full transition-all duration-300"
            style={{ width: `${percentage}%` }}
        >
            {Math.floor(percentage)}%
        </div>
    </div>
);

type milestoneType = {
    Milestone_Id: number;
    Milestone_Title: string;
    Milestone_description: string;
    UnlockingLevel: number;
    Milestone_reward_message: string;
    Milestone_Link: string;
    Milestone_Button_CTA: string;
};

type playerType = {
    Player_ID: number;
    Player_name: string;
    Playerpoint: number;
    streak: number;
    lastLogin: Date;
    Level_Id: number;
    Milestone_Id?: number;
    milestone: milestoneType;
};

type typePlayerHeroSection = {
    player: playerType;
    playerRank: number;
};

function ProfileHerosection({ player, playerRank }: typePlayerHeroSection) {
    const router = useRouter();
    const { lang } = useLang();
    const t = (en: string, fr: string) => (lang === "fr" ? fr : en);

    const handleClaimReward = () => {
        router.push("/reward");
    };

    const levelsRemaining = (player?.milestone?.UnlockingLevel || 0) - (player?.Level_Id || 0);
    const canClaim = player?.Level_Id >= player?.milestone?.UnlockingLevel;
    const progress = levelsRemaining <= 0
        ? 100
        : (player.Level_Id / player.milestone.UnlockingLevel) * 100;

    return (
        <div className="container mx-auto max-w-6xl transition-colors duration-300">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
                {t("Hello", "Bonjour")} {player?.Player_name}
            </h1>

            <div className="flex flex-col flex-wrap md:flex-row gap-8 md:gap-12">
                {/* Stats */}
                <div className="flex-1">
                    <div className="rounded-lg bg-blue-50 dark:bg-neutral-800 transition-colors duration-300">
                        <div className="grid grid-cols-3 py-6">
                            <div className="text-center">
                                <p className="text-gray-500 dark:text-gray-300 text-sm mb-1">
                                    {t("Ranking", "Classement")}
                                </p>
                                <p className="text-5xl font-bold text-gray-800 dark:text-white">{playerRank}</p>
                            </div>
                            <div className="text-center">
                                <p className="text-gray-500 dark:text-gray-300 text-sm mb-1">
                                    {t("Points Earned", "Points Gagnés")}
                                </p>
                                <p className="text-5xl font-bold text-gray-800 dark:text-white">
                                    {player?.Playerpoint}
                                </p>
                            </div>
                            <div className="text-center">
                                <p className="text-gray-500 dark:text-gray-300 text-sm mb-1">
                                    {t("Level", "Niveau")}
                                </p>
                                <p className="text-5xl font-bold text-gray-800 dark:text-white">
                                    {player?.Level_Id}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center justify-center bg-blue-50 dark:bg-neutral-800 rounded-b-lg py-6 border-t">
                            <span className="text-blue-300 dark:text-blue-400 mr-2 text-xl">🔥</span>
                            <p className="text-gray-700 dark:text-gray-200 text-xl">
                                {player?.streak} {t("Days Streak", "Jours d'affilée")}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Reward Section */}
                <div className="flex flex-row items-start gap-6 px-6 py-6 border border-blue-400 dark:border-blue-600 rounded-lg transition-colors duration-300 w-full max-w-full md:max-w-[520px] min-h-[180px]">
                    <Image
                        src="/ProfileGraphics/Gift.svg"
                        alt="Gift icon"
                        width={100}
                        height={140}
                        className="intersect:motion-preset-stretch-sm intersect-once"
                    />
                    <div className="flex-1">
                        <p className="text-gray-600 dark:text-gray-300 mb-1 text-sm md:text-base leading-snug text-balance max-w-full">
                            <span className="whitespace-nowrap">
                                {t("Solve", "Complétez encore")}{" "}
                                <span className="font-bold">{levelsRemaining <= 0 ? 0 : levelsRemaining}</span>{" "}
                                {t("more level(s)", "niveau(x)")}
                            </span>{" "}
                            {t("to get your reward", "pour obtenir votre récompense")}
                        </p>

                        <p className="mb-2 font-semibold text-gray-700 dark:text-white">
                            {player?.milestone?.Milestone_Title}
                        </p>
                        <ProgressBar percentage={progress} />
                        <button
                            className="quizPbtn mt-4"
                            disabled={!canClaim}
                            onClick={handleClaimReward}
                        >
                            {t("Claim Reward", "Réclamer la récompense")}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProfileHerosection;
