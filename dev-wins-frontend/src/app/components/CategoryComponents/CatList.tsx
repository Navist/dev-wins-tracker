"use client";
import React from "react";
import LoadingTest from "@/app/loadingtest/page";
import Categories from "./Categories";

interface Cat {
    id: number;
    name: string;
    description: string;
}

interface CatProps {
    categories: Cat[];
    loading: boolean;
    onDelete: (id: number) => Promise<void>;
    onEdit: (cat: Cat) => void;
}

const CatList = ({ categories, loading, onDelete, onEdit }: CatProps) => {
    if (loading) {
        return <LoadingTest />;
    }

    return (
        <div className="grid grid-cols-3 gap-6">
            {categories.length === 0 ? (
                <p className="text-white">
                    Nothing to see here. Create your first category!
                </p>
            ) : (
                categories.map((cat) => (
                    <Categories
                        key={cat.id}
                        {...cat}
                        onDelete={onDelete}
                        onEdit={onEdit}
                    />
                ))
            )}
        </div>
    );
};

export default CatList;
