import React from "react";

interface CatProps {
    id: number;
    name: string;
    description: string;
}
// Defined both predefined and custom
export default function Categories({ id, name, description }: CatProps) {
    return (
        <div className="border p-4 rounded shadow-md">
            <h3 className="text-xl font-bold">{name}</h3>
            <p className="text-gray-700">{description}</p>
        </div>
    );
}
