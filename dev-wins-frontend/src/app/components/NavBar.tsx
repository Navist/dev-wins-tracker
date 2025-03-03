"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { logout } from "../utils/auth";

export default function NavBar() {
    const router = useRouter();

    return (
        <nav className="flex gap-4 p-4 bg-gray-800 text-white">
            <button
                onClick={() => router.push("/wins")}
                className="px-4 py-2 bg-blue-500 rounded"
            >
                View Wins
            </button>
            <button
                onClick={() => router.push("/categories")}
                className="px-4 py-2 bg-green-500 rounded"
            >
                Manage Cateogories
            </button>
            <button
                onClick={() => router.push("/subscriptions")}
                className="px-4 py-2 bg-yellow-500 rounded"
            >
                View Subscription
            </button>
            <button
                onClick={() => {
                    logout();
                    router.push("/users/login");
                }}
                className="px-4 py-2 bg-red-500 rounded"
            >
                Logout
            </button>
        </nav>
    );
}
