// app/components/LeaderBoard.tsx
import { auth } from "@/auth";
import fetchPlayers from "@/utils/fPlayers";
import fetchRank from "@/utils/fRanking";
import fetchUser from "@/utils/fUser";

type milestoneType = {
    Milestone_Id: number;
    Milestone_Title: string;
    Milestone_description: string;
    UnlockingLevel: number;
    UploadRequired: boolean;
};

type playerType = {
    Player_ID: number;
    Player_name: string;
    Playerpoint: number;
    streak: number;
    lastLogin: Date;
    Level_Id?: number;
    Milestone_Id?: number;
    milestone: milestoneType;
};

export default async function LeaderBoard() {
    const Players = (await fetchPlayers()) || [];
    const session = await auth();
    const user = session?.user;
    const fullName = user?.firstName
        ? `${user.firstName} ${user.lastName}`
        : "Anonymous";

    const player = session
        ? await fetchUser(Number(user.memberId), fullName, user.email || "")
        : null;
    const playerId = player?.Player_ID ?? null;
    const actualRank = player
        ? await fetchRank(player.Playerpoint)
        : Players.length + 1;

    const sorted = [...Players].sort((a, b) => b.Playerpoint - a.Playerpoint);
    let topPlayers = sorted.slice(0, 20);

    if (
        playerId !== null &&
        !topPlayers.some((p) => p.Player_ID === playerId)
    ) {
        const me = Players.find((p) => p.Player_ID === playerId);
        if (me) topPlayers.push(me);
    }

    return (
        <div className="py-24">
            {/* Title */}
            <div className="container mx-auto px-4 text-center">
                <h2 className="inline-block bg-blue-400 text-gray-900 dark:text-white text-4xl font-bold px-4 py-1 rounded">
                    LeaderBoard
                </h2>
                <p className="mt-6 mb-10 text-gray-600 dark:text-gray-300">
                    Check our top performers
                </p>
            </div>

            {/* Scrollable table container */}
            <div className="mx-auto max-w-4xl border bg-white dark:bg-neutral-900 rounded-lg shadow-lg transition-colors duration-300">
                <div className="max-h-[32rem] overflow-y-auto">
                    <table className="min-w-full table-auto border-collapse">
                        <thead className="sticky top-0">
                            <tr>
                                <th className="w-1/6 bg-gradient-to-b from-gray-950 to-gray-800 text-white uppercase text-sm font-semibold px-4 py-3 text-center rounded-tl-lg">
                                    Ranking
                                </th>
                                <th className="w-1/6 bg-gradient-to-b from-gray-950 to-gray-800 text-white uppercase text-sm font-semibold px-4 py-3 text-center">
                                    Name
                                </th>
                                <th className="w-1/6 bg-gradient-to-b from-gray-950 to-gray-800 text-white uppercase text-sm font-semibold px-4 py-3 text-center">
                                    Points
                                </th>
                                <th className="w-1/6 bg-gradient-to-b from-gray-950 to-gray-800 text-white uppercase text-sm font-semibold px-4 py-3 text-center rounded-tr-lg">
                                    Level
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                            {topPlayers.map((p, idx) => {
                                const isCurrent = p.Player_ID === playerId;
                                const displayRank = isCurrent ? actualRank : idx + 1;
                                const rowClass = isCurrent
                                    ? "bg-blue-50 dark:bg-blue-800"
                                    : "bg-white dark:bg-neutral-900";

                                return (
                                    <tr key={p.Player_ID} className={`${rowClass} transition-colors duration-200`}>
                                        <td className="px-4 py-4 text-sm text-center text-gray-800 dark:text-white">
                                            {displayRank}
                                        </td>
                                        <td className="px-4 py-4 text-sm text-center text-gray-800 dark:text-white">
                                            {p.Player_name}
                                        </td>
                                        <td className="px-4 py-4 text-sm text-center text-gray-800 dark:text-white">
                                            {p.Playerpoint}
                                        </td>
                                        <td className="px-4 py-4 text-sm text-center text-gray-800 dark:text-white">
                                            {p.Level_Id}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
