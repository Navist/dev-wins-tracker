"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import NavBar from "../components/NavBar";
import { api } from "../utils/api";
import { isAuthenticated } from "../utils/auth";

interface Category {
    id: number;
    user_id: number;
    name: string;
    description: string;
    created_at: Date;
}

const CategoriesPage = () => {
    const router = useRouter();
    const [categories, setCategories] = useState<Category[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedWin, setSelectedWin] = useState<Category | null>(null);

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

    const onEdit = (category: Category) => {
        console.log("Edit Category:", category);
        // TODO: Implement edit functionality
    };

    const onDelete = async (categoryId: number) => {
        try {
            console.log(categoryId);
            await api.delete(
                `/categories/delete/custom_category/${categoryId}`
            );
            setCategories(categories.filter((cat) => cat.id !== categoryId)); // Update UI
        } catch (error) {
            console.error("Error deleting category:", error);
        }
    };

    return (
        <div>
            <div className="flex flex-col items-center min-h-screen p-6">
                <div className="mb-5 font-bold text-center text-4xl">
                    Manage Categories
                </div>
                {categories.length === 0 ? (
                    <p className="text-gray-400 text-lg">
                        No categories found. Create one!
                    </p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {categories.map((category) => (
                            <div
                                key={category.id}
                                className="relative border p-4 rounded shadow-md group hover:bg-gray-500 transition"
                            >
                                <button
                                    onClick={() => onEdit(category)}
                                    className="absolute bottom-2 left-2 text-gray-500 hover:text-red-500 opacity-0 group-hover:opacity-100 transition"
                                >
                                    ✏️
                                </button>
                                <button
                                    onClick={() => onDelete(category.id)}
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
                )}

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
