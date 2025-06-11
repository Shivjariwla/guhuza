"use client";
import React, { useEffect, useState } from "react";

interface TimerProps {
    initialSeconds: number;
    onExpire: () => void;
}

export default function Timer({ initialSeconds, onExpire }: TimerProps) {
    const [seconds, setSeconds] = useState(initialSeconds);

    // Reset when initialSeconds changes
    useEffect(() => {
        setSeconds(initialSeconds);
    }, [initialSeconds]);

    useEffect(() => {
        if (seconds <= 0) {
            onExpire();
            return;
        }
        const id = setInterval(() => setSeconds((s) => s - 1), 1000);
        return () => clearInterval(id);
    }, [seconds, onExpire]);

    const minutes = Math.floor(seconds / 60);
    const rem = seconds % 60;
    return (
        <div className="text-lg font-medium mb-4">
            Time Remaining: {minutes}:{rem.toString().padStart(2, "0")}
        </div>
    );
}
