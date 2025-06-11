// app/quiz/[id]/page.tsx
import React from "react";
import { fetchQuiz } from "@/utils/fQuiz";
import fetchLevels from "@/utils/fLevels";
import { auth } from "@/auth";
import fetchUser, { PlayerWithMilestone } from "@/utils/fUser";
import QuizClient from "./QuizClient";

interface QuizType {
    question: string;
    comment: string;
    test_answer: number;
    answers: string[];
}

interface PageProps {
    params: { id: string };
}

export default async function Page({ params }: PageProps) {
    const levelId = params.id;

    // 1) Fetch quiz questions for the current route level (not player level)
    const data = await fetchQuiz(levelId);
    const Quizes: QuizType[] = data.test.question;

    // 2) Fetch level metadata for title
    const levels = (await fetchLevels()) || [];
    const levelNumber = Number(levelId);
    const levelTitle =
        levels.find((l) => l.Level_Id === levelNumber)?.Level_Title || "Unknown Level";

    // 3) Fetch session and player info
    const session = await auth();
    let player: PlayerWithMilestone | null = null;

    if (session?.user) {
        const memberId = Number(session.user.memberId);
        const firstName = session.user.firstName ?? "Anonymous";
        const email = session.user.email ?? "";
        player = await fetchUser(memberId, firstName, email);
    }

    // 4) Render quiz with correct level
    return (
        <QuizClient
            Quizes={Quizes}
            levelNumber={levelId}
            levelTitle={levelTitle}
            player={player}
        />
    );
}
