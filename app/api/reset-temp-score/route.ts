import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
    const cookieStore = cookies();
    const rawTemp = cookieStore.get("tempScore")?.value;
    const tempScore = rawTemp ? parseInt(rawTemp, 10) : 0;

    cookieStore.set("tempScore", "0");

    return NextResponse.json({ tempScore });
}
