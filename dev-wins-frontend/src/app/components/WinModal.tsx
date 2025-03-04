import { useState, useEffect } from "react";
import { api } from "../utils/api";

interface Win {
    id?: number;
    title: string;
    description: string;
    category: string;
}

interface WinModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (winData: Partial<Win>) => void;
    win?: Win | null;
}

interface Category {
    id: number;
    name: string;
}

const WinModal: React.FC<WinModalProps> = ({
    isOpen,
    onClose,
    onSubmit,
    win,
}) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        if (win) {
            setTitle(win.title);
            setDescription(win.description);
            setCategory(win.category);
        } else {
            setTitle("");
            setDescription("");
            setCategory("");
        }
    }, [win, isOpen]);

    useEffect(() => {
        if (isOpen) {
            const fetchCategories = async () => {
                try {
                    const response = await api.get("/categories/read/all/");
                    console.log("Fetched Categories:", response.data);
                    setCategories(response.data);
                } catch (error) {
                    console.error("Error fetching categories:", error);
                }
            };
            fetchCategories();
        }
    }, [isOpen]);

    const handleSubmit = () => {
        if (!title || !description || !category) {
            alert("All fields are required!");
            return;
        }

        const winData: Win = { id: win?.id, title, description, category };

        onSubmit(winData);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-black p-6 rounded-lg shadow-md w-96">
                <h2 className="text-lg font-bold mb-4">
                    {win ? "Edit Win" : "Add a New Win"}
                </h2>

                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full p-2 border rounded mb-2"
                />

                <textarea
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full p-2 border rounded mb-2"
                />

                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full p-2 border rounded mb-2 bg-black text-white"
                >
                    <option value="">Select a category</option>
                    {categories.map((cat) => (
                        <option key={cat.id} value={cat.name}>
                            {cat.name}
                        </option>
                    ))}
                    <option value="">Create new category</option>
                    {/* Add logic for creating category */}
                </select>
                <div className="flex justify-end space-x-2">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-red-600 rounded"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="px-4 py-2 bg-blue-500 text-white rounded"
                    >
                        {win ? "Update Win" : "Add Win"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default WinModal;
