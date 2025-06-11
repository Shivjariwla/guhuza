import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
    let body;

    try {
        body = await req.json();
        console.log("🟢 Incoming Request Body:", body);
    } catch (error) {
        console.error("❌ Failed to parse JSON body");
        return NextResponse.json({ message: "Invalid JSON body" }, { status: 400 });
    }

    try {
        const { playerId, score = 0, newlevel } = body;

        // Validate input
        if (!playerId || typeof score !== "number") {
            console.warn("⚠️ Invalid input", { playerId, score, newlevel });
            return NextResponse.json(
                { message: "Invalid input", details: { score, newlevel, playerId } },
                { status: 400 }
            );
        }

        // Fetch player
        const existingPlayer = await prisma.player.findUnique({
            where: { Player_ID: playerId },
        });

        if (!existingPlayer) {
            console.error("❌ Player not found:", playerId);
            return NextResponse.json({ message: "Player not found" }, { status: 404 });
        }

        const updateData: any = {
            Playerpoint: { increment: score },
        };

        // ✅ Strict unlock condition:
        // Only unlock if requested newlevel is exactly one above current,
        // and player is playing their currently unlocked level
        if (
            newlevel &&
            newlevel === existingPlayer.Level_Id + 1
        ) {
            updateData.Level_Id = newlevel;
        }

        console.log("🛠 Performing update:", updateData);

        // Perform update
        const updatedPlayer = await prisma.player.update({
            where: { Player_ID: playerId },
            data: updateData,
            include: { milestone: true },
        });

        console.log("✅ Update successful:", updatedPlayer);

        return NextResponse.json(
            {
                message: "Score updated successfully.",
                player: updatedPlayer,
                levelAfterUpdate: updatedPlayer.Level_Id,
                pointsAfterUpdate: updatedPlayer.Playerpoint,
            },
            { status: 201 }
        );

    } catch (e) {
        console.error("🔥 UpdateScore Error:", e);
        return NextResponse.json(
            { message: "Internal server error", error: String(e) },
            { status: 500 }
        );
    }
}
