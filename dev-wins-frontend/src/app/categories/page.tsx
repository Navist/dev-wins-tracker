"use client";
import React from "react";
import { api } from "../utils/api";
import { useState, useEffect } from "react";
import { isAuthenticated } from "../utils/auth";
import { useRouter } from "next/navigation";
import CatModal from "../components/CatModal";

interface Category {
    id: number;
    name: string;
    description: string;
}

export default function Categories() {
    const router = useRouter();
    const [categories, setCategories] = useState<Category[]>([]);
    const [selectedCat, setSelectedCat] = useState<Category | null>(null);
    const [modalState, setModalState] = useState(false);

    useEffect(() => {
        if (!isAuthenticated()) {
            router.push("/users/login");
            try {
                localStorage.removeItem("token");
            } catch (error) {
                console.log("Error removing token", error);
            } finally {
                return;
            }
        }

        const fetchCategories = async () => {
            try {
                const response = await api.get(
                    "/categories/read/custom_categories"
                );
                setCategories(response.data);
            } catch (error) {
                console.log("Error fetching data:", error);
                if (error.status === 401) {
                    // User Auth Invalid
                    try {
                        localStorage.removeItem("token");
                    } catch (error) {
                        console.log(
                            "Error removing token, doesn't exist?",
                            error
                        );
                        return;
                    }
                    router.push("/users/login");
                    return;
                }
            }
            // console.log(response.data);
        };
        fetchCategories();
    }, []);

    const handleCategoryCreate = async (
        catData: Partial<Category>
    ): Promise<void> => {
        // Add modal handling
        try {
            if (catData.id) {
                const response = await api.put("/categories/update", catData);
                setCategories((prevCats) =>
                    prevCats.map((cat) =>
                        cat.id === catData.id ? response.data : cat
                    )
                );
            } else {
                const response = await api.post(
                    "/categories/create/custom_category/",
                    catData
                );
                setCategories((prevCats) => [...prevCats, response.data]);
            }

            setModalState(false);
            setSelectedCat(null);
        } catch (error) {
            console.log("Error handling category manipulation", error);
        }
    };

    const handleDeleteCat = async (id: number) => {
        try {
            const response = await api.delete(
                `/categories/delete/custom_category/${id}`
            );

            setCategories((prevCats) =>
                prevCats.filter((cat) => cat.id !== id)
            );
        } catch (error) {
            console.log("Error deleting category:", error);
        }
    };

    const handleEditCat = (cat: Category) => {
        setSelectedCat(cat);
        setModalState(true);
    };

    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categories.map((cat) => (
                    <div className="relative border p-4 rounded shadow-md group hover:bg-gray-700 hover:shadow-blue-300 transition duration-150">
                        {cat.name}
                        <br></br>
                        {cat.description}
                    </div>
                ))}
            </div>

            <div className="flex flex-col items-center justify-center min-h-screen">
                <button
                    onClick={() => {
                        setSelectedCat(null);
                        setModalState(true);
                    }}
                    className="border w-40 px-2 py-2 bg-green-800 rounded"
                >
                    Add Category
                </button>
                <CatModal
                    isOpen={modalState}
                    onClose={() => setModalState(false)}
                    onSubmit={handleCategoryCreate}
                    cat={selectedCat}
                ></CatModal>
            </div>
        </div>
    );
}
