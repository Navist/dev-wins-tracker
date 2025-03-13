import React from "react";

interface Win {
    id: number;
    title: string;
    category: string;
    description: string;
}

interface WinProps {
    id: number;
    title: string;
    category: string;
    description: string;
    onDelete: (id: number) => Promise<void>;
    onEdit: (win: Win) => void;
}

export default function WinCard({
    id,
    title,
    category,
    description,
    onDelete,
    onEdit,
}: WinProps) {
    return (
        <div className="relative border p-4 rounded shadow-md group hover:bg-gray-700 hover:shadow-blue-300 transition duration-150">
            <button
                onClick={() => onEdit({ id, title, category, description })}
                className="absolute bottom-2 left-2 text-gray-500 hover:text-red-500 opacity-0 group-hover:opacity-100 transition cursor-pointer"
            >
                ✏️
            </button>
            <button
                onClick={() => onDelete(id)}
                className="absolute bottom-2 right-2 text-gray-500 hover:text-red-500 opacity-0 group-hover:opacity-100 transition cursor-pointer"
            >
                🗑️
            </button>
            <h3 className="text-xl font-bold text-green-400">{title}</h3>
            <p className="text-sm border-b-2">{category}</p>
            <p className="text-white mb-4 mt-2">{description}</p>
        </div>
    );
}
