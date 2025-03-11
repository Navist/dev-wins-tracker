"use client";
import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import { api } from "../utils/api";
import { isAuthenticated } from "../utils/auth";
import { useRouter } from "next/navigation";

interface subStatus {
    expires_at: string; // Changed to string since API likely returns ISO format
    user_id: number;
    subscription_tier: string;
    id: number;
}

const SubscribersPage = () => {
    const [subStatus, setSubStatus] = useState<subStatus | null>(null);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        if (!isAuthenticated()) {
            router.push("/users/login");
            return;
        }

        const fetchSubStatus = async () => {
            try {
                const response = await api.get("/subscribers/read/");
                setSubStatus(response.data);
            } catch (error) {
                console.error("Error fetching subscription data:", error);
                setError("Failed to load subscription details.");
            }
        };
        fetchSubStatus();
    }, []);

    return (
        <div>
            <div className="flex flex-col items-center min-h-screen p-6">
                {error && <p className="text-red-400">{error}</p>}

                {!subStatus ? (
                    <p className="text-gray-400 text-lg">
                        Loading subscription details...
                    </p>
                ) : (
                    <div className="relative bg-gray-800 text-center border p-6 rounded-lg shadow-lg">
                        <h2 className="text-2xl font-semibold text-white">
                            Your Subscription
                        </h2>
                        <p className="text-lg text-green-400">
                            {subStatus.subscription_tier}
                        </p>
                        <p className="text-gray-400 text-sm">
                            Expires on:{" "}
                            {new Date(
                                subStatus.expires_at
                            ).toLocaleDateString()}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SubscribersPage;
