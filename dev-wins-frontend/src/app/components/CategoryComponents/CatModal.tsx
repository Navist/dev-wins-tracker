import React, { useEffect } from "react";
import { useState } from "react";

interface Cat {
    id?: number;
    name: string;
    description: string;
}

interface CatModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (catData: Partial<Cat>) => void;
    cat?: Cat | null;
}

const CatModal: React.FC<CatModalProps> = ({
    isOpen,
    onClose,
    onSubmit,
    cat,
}) => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    useEffect(() => {
        if (cat) {
            setName(cat.name);
            setDescription(cat.description);
        } else {
            setName("");
            setDescription("");
        }
    }, [cat, isOpen]);

    const handleSubmit = () => {
        if (!name || !description) {
            alert("All fields are required!");
            return;
        }

        const winData: Cat = { id: cat?.id, name, description };

        onSubmit(winData);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div>
                <h2 className="text-lg font-bold mb-4">
                    {cat ? "Edit Category" : "Create Category"}
                </h2>
                <input
                    type="text"
                    placeholder="Title"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-2 border roudned mb-2"
                />
                <textarea
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full p-2 border rounded mb-2"
                />
                <div className="flex place-content-evenly">
                    <button
                        onClick={handleSubmit}
                        className="px-4 py-2 bg-blue-500 rounded"
                    >
                        {cat ? "Update Category" : "Add Category"}
                    </button>
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-red-600 rounded"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CatModal;
