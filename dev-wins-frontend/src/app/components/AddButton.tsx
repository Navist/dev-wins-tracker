interface AddCat {
    id: number;
    category: string;
    description: string;
}

interface AddButtonProp {
    setSelectedWin: boolean;
    setIsModalOpen: boolean;
    id: number;
    category: string;
    description: string;
    onAdd: (add: AddCat) => void;
}

export default function AddButton({
    id,
    category,
    description,
    setSelectedWin,
    setIsModalOpen,
    onAdd,
}: AddButtonProp) {
    return (
        <button
            className="mt-6 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            onClick={() => onAdd({ id, category, description })}
        >
            + Add Win
        </button>
    );
}
