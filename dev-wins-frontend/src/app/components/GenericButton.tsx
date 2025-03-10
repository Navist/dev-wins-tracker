export default function GenericButton({ label }: { label: string }) {
    return (
        <button
            className="relative min-w-[120px] px-4 py-3 rounded-lg border-none shadow-[inset_0_0_0_1px_rgba(255,255,255,0.1)]
          bg-gradient-to-b from-gray-700 to-gray-900 text-white/66 transition-transform duration-500 
          hover:text-white hover:scale-110 hover:-translate-y-1"
        >
            {label}
            <span
                className="absolute bottom-0 left-[15%] w-[70%] h-[1px] opacity-20 transition-opacity duration-500 
          bg-gradient-to-r from-transparent via-white to-transparent hover:opacity-100"
            />
        </button>
    );
}
