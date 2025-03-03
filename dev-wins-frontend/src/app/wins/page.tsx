"use client";
import { useRouter } from "next/navigation";
import { isAuthenticated } from "../utils/auth";
import NavBar from "../components/NavBar";
import WinList from "../components/WinList";
import { useEffect } from "react";

export default function WinsPage() {
    const router = useRouter();

    useEffect(() => {
        if (!isAuthenticated()) {
            router.push("/users/login");
            return;
        }
    });

    return (
        <div>
            <NavBar />
            <div className="flex flex-col items-center min-h-screen p-6">
                <h1 className="text-3xl font-bold mb-6">Your Wins 🏆</h1>
                <WinList />
            </div>
        </div>
    );
}
