import React from "react";
import QuizLevelSections from "../components/quizLevelSections";
import LeaderBoardSection from "../components/leaderBoardSection";
import ProfileHerosection from "../components/profileHerosection";
import LoginButton from "../components/buttons/loginBtn";
import fetchUser from "@/utils/fUser";
import fetchRank from "@/utils/fRanking";
import { auth } from "@/auth";
import dynamic from "next/dynamic";

// 👇 Dynamically import the client component
const BadgeDisplay = dynamic(() => import("../components/BadgeDisplay"), { ssr: false });

export default async function ProfilePage() {
    const session = await auth();

    if (!session?.user) {
        return (
            <div className="flex h-full">
                <div className="px-8 my-32 rounded py-8 border-2 mx-auto w-fit bg-white dark:bg-neutral-900 text-black dark:text-white transition-colors duration-300">
                    <h1 className="text-3xl font-bold mb-5 w-fit px-4 py-1 bg-blue-400 dark:bg-blue-600 rounded text-center">
                        Log in Required
                    </h1>
                    <p>You have to log in to access this page</p>
                    <div className="mt-5 w-full">
                        <LoginButton />
                    </div>
                </div>
            </div>
        );
    }

    const user = session.user;
    const name = user?.firstName || "Anonymous";
    const player = await fetchUser(Number(user.memberId), name, user.email || "");
    const playerPoint: number = player ? player.Playerpoint : 0;
    const playerRank = player ? await fetchRank(Number(playerPoint)) : 100;
    const playerLevel = player?.Level_Id ?? 1;
    const stars = Math.min(Math.floor(playerPoint / 25), 6);

    let badge = "";
    if (stars >= 6) badge = "legend";
    else if (stars >= 4) badge = "quiz_master";
    else if (stars >= 2) badge = "rising_star";

    return (
        <div className="p-6 min-h-screen bg-white text-black dark:bg-black dark:text-white transition-colors duration-300">
            <ProfileHerosection player={player} playerRank={playerRank} />

            <div className="mt-8 max-w-md mx-auto bg-white dark:bg-neutral-900 text-black dark:text-white border dark:border-neutral-700 rounded-lg p-4 shadow transition-colors duration-300">
                <p className="font-semibold text-lg mb-2">Your Rating</p>

                <div className="flex gap-1 text-yellow-400 text-xl mb-2">
                    {[...Array(6)].map((_, i) => (
                        <span key={i}>{i < stars ? "⭐" : ""}</span>
                    ))}
                </div>

                {/* 🏅 Badge display (client-only) */}
                <BadgeDisplay badge={badge} />
            </div>

            <div className="mt-12">
                <QuizLevelSections playerLevel={playerLevel} />
            </div>

            <div className="mt-12 container">
                <LeaderBoardSection />
            </div>
        </div>
    );
}
