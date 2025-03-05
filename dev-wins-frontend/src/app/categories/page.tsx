"use client";
import React from "react";
import NavBar from "../components/NavBar";
import Categories from "../components/Categories";
import { api } from "../utils/api";
import { useState, useEffect } from "react";
import { isAuthenticated } from "../utils/auth";
import { useRouter } from "next/navigation";
import WinList from "../components/WinList";
import WinModal from "../components/WinModal";
import WinCard from "../components/WinCard";

interface Category {
    id: number;
    user_id: number;
    name: string;
    description: string;
    created_at: Date;
}

const CategoriesPage = ({ id, name, description }: Category) => {
    const router = useRouter();
    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        if (!isAuthenticated()) {
            router.push("/users/login");
            return;
        }

        const fetchCategories = async () => {
            try {
                const response = await api.get(
                    "/categories/read/custom_categories"
                );
                setCategories(response.data);
            } catch (error) {
                router.push("/users/login");
                console.error("Error fetching categories:", error);
            }
        };
        fetchCategories();
    }, []);

    return (
        <div>
            <NavBar />
            <div className="flex flex-col items-center min-h-screen p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {categories.map((category) => (
                        <div className="relative border p-4 rounded shadow-md group hover:bg-gray-500 transition">
                            <button
                                onClick={() =>
                                    onEdit({ id, name, description })
                                }
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
                            <h3 className="text-xl font-bold">
                                {category.name}
                            </h3>
                            <p className="text-white mb-4">
                                {category.description}
                            </p>
                        </div>
                    ))}
                </div>
                <button
                    className="mt-6 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                    onClick={() => {
                        setSelectedWin(null);
                        setIsModalOpen(true);
                    }}
                >
                    + Add Win
                </button>
            </div>
        </div>
    );
};

export default CategoriesPage;
