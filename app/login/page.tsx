"use client";
import React, { useState, useContext } from "react";
import { useRouter } from "next/navigation";
import { playerContext } from "../context/playerContext";

export default function Login() {
    const router = useRouter();
    const { AssignPlayerData } = useContext(playerContext);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const togglePasswordVisibility = () =>
        setShowPassword((p) => !p);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const res = await fetch("/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });
            const payload = await res.json();

            if (!res.ok) {
                setError(payload.error || "Login failed");
                setLoading(false);
            } else {
                AssignPlayerData(payload.player);
                await router.push("/quiz");
            }
        } catch (err: any) {
            setError(err.message || "Unexpected error");
            setLoading(false);
        }
    };

    return (
        <div className="flex h-full">
            <div className="w-fit mx-auto my-32 p-8 border rounded bg-white">
                <form onSubmit={handleLogin} className="space-y-4 w-96">
                    <h1 className="text-center mb-4">
                        <span className="inline-block bg-blue-400 text-black font-bold text-3xl px-4 py-1 rounded">
                            Welcome Back!
                        </span>
                    </h1>

                    {error && <p className="text-red-600">{error}</p>}

                    <div>
                        <label className="block mb-1">Email</label>
                        <input
                            type="email"
                            placeholder="you@example.com"
                            className="w-full border-2 rounded px-3 py-2"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label className="block mb-1">Password</label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter Your Password Here"
                                className="w-full border-2 rounded px-3 py-2"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <button
                                type="button"
                                onClick={togglePasswordVisibility}
                                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-sm text-blue-600"
                            >
                                {showPassword ? "Hide" : "Show"}
                            </button>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        style={{
                            display: "inline-flex",
                            flexWrap: "nowrap",
                            alignItems: "center",
                            justifyContent: "center",
                            width: "100%",
                            padding: "0.75rem",         // adjust to your quizPbtn padding
                            backgroundColor: "#1e293b", // your quizPbtn bg
                            color: "#fff",
                            borderRadius: "0.5rem",      // match your existing rounded
                            opacity: loading ? 0.7 : 1,
                        }}
                    >
                        {loading && (
                            <svg
                                className="animate-spin h-5 w-5 mr-2 text-white"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                />
                                <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                                />
                            </svg>
                        )}
                        {loading ? "Logging in..." : "Login"}
                    </button>

                    <div className="flex justify-between text-sm text-gray-600 pt-2">
                        <a href="/forgot-password" className="hover:underline">
                            Forgot password?
                        </a>
                        <a href="/signup" className="hover:underline">
                            New to Guhuza? Create account
                        </a>
                    </div>
                </form>
            </div>
        </div>
    );
}
