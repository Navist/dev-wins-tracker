"use client";
import React, { useState } from "react";
import GenericButton from "@/app/components/GenericButton";
import { useRouter } from "next/navigation";
import { api } from "@/app/utils/api";

export default function SignUpPage() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const handleCreateSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post("/users/create/", {
                username,
                email,
                password,
            });
        } catch (error) {
            console.log("Failed to create account:", error);
        } finally {
        }
        router.push("/dashboard");
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h2 className="text-2xl mb-4">Create Account</h2>
            <form onSubmit={handleCreateSubmit} className="flex flex-col gap-4">
                <input
                    type="username"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    className="p-2 border rounded"
                />
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
                <GenericButton label="Create" type="submit"></GenericButton>
            </form>
            {/* <GenericButton label="Sign Up" /> */}
        </div>
    );
}
