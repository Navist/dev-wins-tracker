"use client";
import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import { api } from "../utils/api";
import { isAuthenticated } from "../utils/auth";
import { useRouter } from "next/navigation";

interface subStatus {
    expires_at: Date;
    user_id: number;
    subscription_tier: string;
    id: number;
}

const SubscribersPage = () => {
    const [subStatus, setSubStatus] = useState("");
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
                console.error("Error fetching sub data:", error);
            }
        };
        fetchSubStatus();
    }, []);

    return (
        <div>
            <NavBar />
            <div className="relative text-center border p-4 rounded shadow-md group hover:bg-gray-500 transition">
                <h2>Your Subscription Tier</h2>
                <p>{subStatus.subscription_tier}</p>
            </div>
        </div>
    );
};

export default SubscribersPage;
