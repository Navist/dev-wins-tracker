"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { logout } from "../utils/auth";

export default function NavBar() {
    const router = useRouter();

    return (
        <nav className="absolute top-0 left-0 flex flex-col gap-4 p-4 bg-gray-800 text-white h-screen w-40">
            <button
                onClick={() => router.push("/wins")}
                className="px-4 py-2 bg-blue-500 hover:bg-blue-800 rounded w-full cursor-pointer"
            >
                View Wins
            </button>
            <button
                onClick={() => router.push("/categories")}
                className="px-4 py-2 bg-green-800 hover:bg-cyan-600 hover:w-40 rounded w-full cursor-pointer duration-100"
            >
                Manage Categories
            </button>
            <button
                onClick={() => router.push("/subscriptions")}
                className="px-4 py-2 bg-green-800 hover:bg-cyan-600 hover:w-40 rounded w-full cursor-pointer duration-100"
            >
                View Subscription
            </button>
            <button
                onClick={() => {
                    logout();
                    router.push("/users/login");
                }}
                className="absolute bottom-10 left-3 px-4 py-2 bg-red-500 hover:bg-red-900 rounded w-32 cursor-pointer"
            >
                Logout
            </button>
        </nav>
    );
}
