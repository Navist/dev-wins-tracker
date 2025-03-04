import React, { useState } from "react";

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
        <div className="relative border p-4 rounded shadow-md group hover:bg-gray-500 transition">
            <button
                onClick={() => onEdit({ id, title, category, description })}
                className="absolute bottom-2 left-2 text-gray-500 hover:text-red-500 opacity-0 group-hover:opacity-100 transition"
            >
                ✏️
            </button>
            <button
                onClick={() => onDelete(id)}
                className="absolute bottom-2 right-2 text-gray-500 hover:text-red-500 opacity-0 group-hover:opacity-100 transition"
            >
                🗑️
            </button>
            <h3 className="text-xl font-bold">{title}</h3>
            <p>Category: {category}</p>
            <p className="text-gray-700 mb-4">{description}</p>
        </div>
    );
}
