"use client";

import React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/app/utils/api";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        try {
            const response = await api.post("/users/login/", {
                email,
                password,
            });

            if (response.data.access_token) {
                localStorage.setItem(
                    "special_sauce",
                    response.data.access_token
                );
                router.push("/dashboard");
            }
        } catch (err) {
            console.log(err);
            setError("Invalid email or password");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h2 className="text-2xl mb-4">Login</h2>
            <form onSubmit={handleLogin} className="flex flex-col gap-4">
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="p-2 border rounded"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="p-2 border rounded"
                />
                <button
                    type="submit"
                    className="p-2 bg-blue-500 text-white rounded hover:bg-blue-800 cursor-pointer"
                >
                    Login
                </button>
                {error && <p className="text-red-500">{error}</p>}
            </form>

            {/* Move the Sign-Up Button OUTSIDE the form */}
            <a
                href="/users/signup"
                className="p-2 bg-blue-500 text-white rounded hover:bg-blue-800 cursor-pointer text-center mt-4 w-[215px]"
            >
                Sign Up
            </a>
        </div>
    );
}
