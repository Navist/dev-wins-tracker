"use client";
import React from "react";
import { api } from "../utils/api";
import { useState, useEffect } from "react";
import WinCard from "../components/WinCard";
import { isAuthenticated } from "../utils/auth";
import { useRouter } from "next/navigation";

interface Category {
    id: number;
    name: string;
    description: string;
}

export default function Categories() {
    const router = useRouter();
    const [categories, setCategories] = useState<Category[]>([]);

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

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((cat) => (
                <div className="relative border p-4 rounded shadow-md group hover:bg-gray-700 hover:shadow-blue-300 transition duration-150">
                    {cat.name}
                    <br></br>
                    {cat.description}
                </div>
            ))}
        </div>
    );
}
