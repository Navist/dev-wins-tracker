"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "../utils/api";
import { isAuthenticated, logout } from "../utils/auth";
import NavBar from "../components/NavBar";

export default function DashboardPage() {
    const [user, setUser] = useState<{
        email: string;
        subscription: string | null;
        username: string;
    } | null>(null);
    const router = useRouter();

    useEffect(() => {
        if (!isAuthenticated()) {
            router.push("/users/login");
            return;
        }

        const fetchUser = async () => {
            try {
                const response = await api.get("users/get/");
                setUser(response.data);
            } catch (error) {
                console.error("Error fetching user:", error);
                logout();
                router.push("/users/login");
            }
        };

        fetchUser();
    }, []);

    return (
        <div className="min-h-screen">
            <NavBar />
            <h1 className="text-3xl font-bold p-6">
                Welcome to Your Dashboard {user?.username || "User"}!
            </h1>
        </div>
    );
}
