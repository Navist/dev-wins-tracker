"use client";
import { useRouter } from "next/navigation";
import { isAuthenticated } from "../utils/auth";
import WinList from "../components/WinList";
import { useEffect, useState } from "react";
import { api } from "../utils/api";
import WinModal from "../components/WinModal";

interface Win {
    id: number;
    title: string;
    category: string;
    description: string;
}

export default function WinsPage() {
    const router = useRouter();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [wins, setWins] = useState<Win[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedWin, setSelectedWin] = useState<Win | null>(null);

    useEffect(() => {
        if (!isAuthenticated()) {
            router.push("/users/login");
            return;
        }

        const fetchWins = async () => {
            try {
                const response = await api.get("/wins/read/all");
                setWins(response.data);
            } catch (error) {
                router.push("/users/login");
                console.error("Error fetching wins:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchWins();
    }, []);

    const handleDeleteWin = async (id: number) => {
        try {
            const response = await api.delete(`/wins/delete/${id}`);
            console.log("Win delete:", response.data);
            setWins((prevWins) => prevWins.filter((win) => win.id !== id));
        } catch (error) {
            console.error("Error deleting win:", error);
        }
    };

    const handleSaveWin = async (winData: Partial<Win>): Promise<void> => {
        try {
            if (winData.id) {
                // ✅ Editing an existing win (PUT)
                const response = await api.put(`/wins/update/`, winData);
                setWins((prevWins) =>
                    prevWins.map((win) =>
                        win.id === winData.id ? response.data : win
                    )
                );
            } else {
                // ✅ Adding a new win (POST)
                const response = await api.post("/wins/create/", winData);
                setWins((prevWins) => [...prevWins, response.data]);
            }

            setIsModalOpen(false);
            setSelectedWin(null);
        } catch (error) {
            console.error("Error saving win:", error);
        }
    };

    const handleEditWin = (win: Win) => {
        setSelectedWin(win);
        setIsModalOpen(true);
    };

    return (
        <div>
            <div className="flex flex-col items-center min-h-screen p-6">
                <h1 className="text-3xl font-bold mb-6">Your Wins 🏆</h1>
                <WinList
                    wins={wins}
                    loading={loading}
                    onDelete={handleDeleteWin}
                    onEdit={handleEditWin}
                />
                <button
                    className="mt-6 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                    onClick={() => {
                        setSelectedWin(null);
                        setIsModalOpen(true);
                    }}
                >
                    + Add Win
                </button>

                <WinModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onSubmit={handleSaveWin}
                    win={selectedWin}
                ></WinModal>
            </div>
        </div>
    );
}
