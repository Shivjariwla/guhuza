// utils/fUser.ts
import prisma from "@/lib/prisma";

export type PlayerWithMilestone = Awaited<
    ReturnType<typeof prisma.player.findUnique>
>;

const fetchUser = async (
    userid: number,
    username: string,
    email: string
): Promise<PlayerWithMilestone> => {
    const existing = await prisma.player.findUnique({
        where: { Player_ID: userid },
        include: { milestone: true },
    });

    if (existing) {
        const lastLoginDate = new Date(existing.lastLogin);
        lastLoginDate.setHours(0, 0, 0, 0);

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const dayDiff =
            (today.getTime() - lastLoginDate.getTime()) / (1000 * 60 * 60 * 24);

        let newStreak = existing.streak;
        if (dayDiff === 1) {
            newStreak += 1;
        } else if (dayDiff > 1) {
            newStreak = 1;
        }

        // ✅ Get temp score via API route handler
        const tempRes = await fetch("http://localhost:3000/api/reset-temp-score", {
            method: "POST",
        });
        const { tempScore = 0 } = await tempRes.json();
        const totalPoints = existing.Playerpoint + tempScore;

        const updated = await prisma.player.update({
            where: { Player_ID: userid },
            data: {
                Player_name: username,
                email,
                streak: newStreak,
                lastLogin: today,
                Playerpoint: totalPoints,
            },
            include: { milestone: true },
        });

        return updated;
    }

    const created = await prisma.player.create({
        data: {
            Player_ID: userid,
            Player_name: username,
            email,
            Playerpoint: 0,
            Level_Id: 1,
            Milestone_Id: 1,
            lastLogin: new Date(),
            streak: 1,
        },
        include: { milestone: true },
    });

    return created;
};

export default fetchUser;
