import React from "react";

export default function LoadingTest() {
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
