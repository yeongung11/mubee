interface RecentDropdownProps {
    position?: "top" | "bottom";
    recentSearches: string[];
    onSelect: (query: string) => void;
    onDelete: (query: string) => void;
    onClearAll: () => void;
}

export function RecentDropDown({
    position = "top",
    recentSearches,
    onSelect,
    onDelete,
    onClearAll,
}: RecentDropdownProps) {
    const positionClass =
        position === "top" ? "top-full mt-1" : "bottom-full mb-1";

    return (
        <div
            className={`absolute ${positionClass} left-0 w-full bg-white/90 backdrop-blur-sm rounded-xl shadow-2xl z-50 border`}
        >
            <div className="flex items-center justify-between px-3 pt-2 pb-1">
                <p className="text-xs text-gray-400">최근 검색어</p>
                <button
                    className="text-xs text-gray-400 hover:text-red-400 transition"
                    onClick={onClearAll}
                >
                    전체 삭제
                </button>
            </div>
            {recentSearches.map((q) => (
                <div
                    key={q}
                    className="flex items-center justify-between px-3 py-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                    <button
                        className="flex items-center gap-2 text-sm text-gray-700 flex-1 text-left"
                        onClick={() => onSelect(q)}
                    >
                        <span className="text-gray-400 text-xs">🕐</span>
                        {q}
                    </button>
                    <button
                        className="text-gray-300 hover:text-red-400 transition text-xs ml-2"
                        onClick={() => onDelete(q)}
                    >
                        ✕
                    </button>
                </div>
            ))}
        </div>
    );
}
