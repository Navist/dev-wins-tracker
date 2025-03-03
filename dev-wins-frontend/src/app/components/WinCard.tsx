import React from "react";

interface WinProps {
    id: number;
    category: string;
    description: string;
}

export default function WinCard({ id, category, description }: WinProps) {
    return (
        <div className="border p-4 rounded shadow-md">
            <h3 className="text-xl font-bold">{category}</h3>
            <p className="text-gray-700">{description}</p>
        </div>
    );
}
