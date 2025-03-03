"use client";
import { useEffect, useState } from "react";
import { api } from "../utils/api";
import WinCard from "../components/WinCard";

interface Win {
    id: number;
    category: string;
    description: string;
}

export default function WinList() {
    const [wins, setWins] = useState<Win[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchWins = async () => {
            try {
                const response = await api.get("/wins/read/all");
                setWins(response.data);
            } catch (error) {
                console.error("Error fetching wins:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchWins();
    }, []);

    if (loading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, i) => (
                    <div
                        key={i}
                        className="border p-4 rounded shadow-md animate-pulse"
                    >
                        <div className="bg-gray-300 h-6 w-3/4 mb-2 rounded"></div>
                        <div className="bg-gray-300 h-4 w-full mb-2 rounded"></div>
                        <div className="bg-gray-300 h-4 w-1/2 rounded"></div>
                    </div>
                ))}
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {wins.length === 0 ? (
                <p className="text-gray-500">
                    No wins yet. Start tracking your progress!
                </p>
            ) : (
                wins.map((win) => <WinCard key={win.id} {...win} />)
            )}
        </div>
    );
}
