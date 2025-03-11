"use client";
import WinCard from "../components/WinCard";
import { useRouter } from "next/navigation";
import LoadingTest from "../loadingtest/page";

interface Win {
    id: number;
    title: string;
    category: string;
    description: string;
}

interface WinListProps {
    wins: Win[];
    loading: boolean;
    onDelete: (id: number) => Promise<void>;
    onEdit: (win: Win) => void;
}

export default function WinList({
    wins,
    loading,
    onDelete,
    onEdit,
}: WinListProps) {
    const router = useRouter();

    if (loading) {
        return <LoadingTest />;
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {wins.length === 0 ? (
                <p className="text-white">
                    No wins yet. Start tracking your progress!
                </p>
            ) : (
                wins.map((win) => (
                    <WinCard
                        key={win.id}
                        {...win}
                        onDelete={onDelete}
                        onEdit={onEdit}
                    />
                ))
            )}
        </div>
    );
}
