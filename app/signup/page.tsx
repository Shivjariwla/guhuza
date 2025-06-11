"use client";
import React, { useState, useContext } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { playerContext } from "../context/playerContext";

function SignUp() {
    const router = useRouter();
    const { AssignPlayerData, tempScore, setTempScore } = useContext(playerContext);

    // Form state variables
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // Success and error messaging
    const [successMessage, setSuccessMessage] = useState("");
    const [error, setError] = useState("");

    // Loading state
    const [loading, setLoading] = useState(false);

    // Show/hide password toggle
    const [showPassword, setShowPassword] = useState(false);
    const togglePasswordVisibility = () => setShowPassword(prev => !prev);

    // Handle sign-up form submission
    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setSuccessMessage("");
        setLoading(true);

        try {
            const response = await fetch("/api/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, username, password, tempScore }),
            });

            // Read JSON exactly once
            const payload = await response.json();

            if (!response.ok) {
                setError(payload.error || payload.message || "Signup failed");
            } else {
                // Show success message at top
                setSuccessMessage(payload.message || "Account created successfully");
                AssignPlayerData(payload.player);
                setTempScore(0);
                // Optionally auto-redirect after a delay
                setTimeout(() => router.push("/login"), 2000);
            }
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
            setUsername("");
            setEmail("");
            setPassword("");
        }
    };

    return (
        <div className="flex h-full">
            <div className="w-fit mx-auto my-32 p-8 border rounded bg-white">
                <form onSubmit={handleSignUp} className="space-y-4 w-96">
                    <h1 className="text-center mb-4">
                        <span className="inline-block bg-blue-400 text-black font-bold text-3xl px-4 py-1 rounded">
                            Create New Account
                        </span>
                    </h1>

                    {/* Success Message */}
                    {successMessage && (
                        <p className="text-green-600">{successMessage}</p>
                    )}

                    {/* Error Message */}
                    {error && <p className="text-red-600">{error}</p>}

                    <div>
                        <label className="block mb-1">Username</label>
                        <input
                            placeholder="@YourUsername"
                            type="text"
                            className="w-full border-2 rounded px-3 py-2"
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label className="block mb-1">Email</label>
                        <input
                            placeholder="Your Email"
                            type="email"
                            className="w-full border-2 rounded px-3 py-2"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label className="block mb-1">Password</label>
                        <div className="relative">
                            <input
                                placeholder="Enter Password here"
                                type={showPassword ? "text" : "password"}
                                className="w-full border-2 rounded px-3 py-2"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
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
                        className="quizPbtn w-full py-2 mt-2"
                    >
                        {loading ? "Signing up..." : "Sign Up"}
                    </button>

                    <div className="mt-4 text-sm text-gray-600">
                        <p>
                            Already have an account?{' '}
                            <Link href="/login" className="text-blue-600 hover:underline">
                                Log in here
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default SignUp;