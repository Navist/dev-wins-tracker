import React from "react";

interface Cat {
    id: number;
    name: string;
    description: string;
}

interface CatProps {
    id: number;
    name: string;
    description: string;
    onDelete: (id: number) => Promise<void>;
    onEdit: (cat: Cat) => void;
}
// Defined both predefined and custom
export default function Categories({
    id,
    name,
    description,
    onDelete,
    onEdit,
}: CatProps) {
    return (
        <div className="relative border p-4 rounded shadow-md group hover:bg-gray-700 hover:shadow-blue-300 transition duration-150">
            <button
                onClick={() => onEdit({ id, name, description })}
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
            <h3 className="text-xl font-bold text-green-400">{name}</h3>
            <p className="text-white mb-4 mt-2">{description}</p>
        </div>
    );
}
