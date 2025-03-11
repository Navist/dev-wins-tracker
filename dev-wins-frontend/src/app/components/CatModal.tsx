import React, { useEffect } from "react";
import { useState } from "react";

interface Cat {
    id?: number;
    title: string;
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
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    useEffect(() => {
        if (cat) {
            setTitle(cat.title);
            setDescription(cat.description);
        } else {
            setTitle("");
            setDescription("");
        }
    }, [cat, isOpen]);

    const handleSubmit = () => {
        if (!title || !description) {
            alert("All fields are required!");
            return;
        }

        const winData: Cat = { id: cat?.id, title, description };

        onSubmit(winData);
        onClose();
    };

    return (
        <div>
            <div>
                <h2>Create Category</h2>
                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <textarea
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <button onClick={onClose}>Cancel</button>
                <button onClick={handleSubmit}>Create</button>
            </div>
        </div>
    );
};

export default CatModal;
