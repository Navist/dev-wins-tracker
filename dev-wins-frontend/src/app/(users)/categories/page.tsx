"use client";
import React, { useMemo } from "react";
import { api } from "@/app/utils/api";
import { useState, useEffect } from "react";
import { isAuthenticated } from "@/app/utils/auth";
import { useRouter } from "next/navigation";
import CatModal from "@/app/components/CategoryComponents/CatModal";
import CatList from "@/app/components/CategoryComponents/CatList";
import { AxiosError } from "axios";

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
    const [loading, setLoading] = useState(true);

    // Add logic for detecting number of categories and if max is reached (based on sub tier), modal for upgrade path

    useEffect(() => {
        if (!isAuthenticated()) {
            router.push("/login");
            try {
                localStorage.removeItem("special_sauce");
            } catch (error) {
                console.log("Error removing special_sauce", error);
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
            } catch (error: unknown) {
                console.log("Error fetching data:", error);
                if (
                    error instanceof AxiosError &&
                    error.response?.status === 401
                ) {
                    // User Auth Invalid
                    try {
                        localStorage.removeItem("special_sauce");
                    } catch (error) {
                        console.log(
                            "Error removing special_sauce, doesn't exist?",
                            error
                        );
                        return;
                    }
                    router.push("/login");
                    return;
                }
            } finally {
                setLoading(false);
            }
        };
        fetchCategories();
    }, []);

    const categoryCount = categories ? categories.length : null;

    console.log("Count:", categoryCount);

    // setCategoryLength(categories.length);
    const handleCategoryCreate = async (
        catData: Partial<Category>
    ): Promise<void> => {
        // Add modal handling
        try {
            if (catData.id) {
                const response = await api.put("/categories/update/", catData);
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
            <div className="flex flex-col items-center min-h-screen p-6">
                <h1 className="text-3xl font-bold mb-6">Your Categories</h1>
                <CatList
                    categories={categories}
                    loading={loading}
                    onDelete={handleDeleteCat}
                    onEdit={handleEditCat}
                />
                <button
                    onClick={() => {
                        setSelectedCat(null);
                        setModalState(true);
                    }}
                    className={
                        !modalState
                            ? "border w-40 px-2 py-2 bg-green-800 rounded mt-4"
                            : "hidden"
                    }
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
