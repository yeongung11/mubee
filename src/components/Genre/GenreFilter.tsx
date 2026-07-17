import type { GenreType } from "@/types/movie";

interface GenreFilterProps {
    genres: GenreType[];
    selectedGenre: GenreType | null;
    onSelect: (genre: GenreType) => void;
}

export function GenreFilter({
    genres,
    selectedGenre,
    onSelect,
}: GenreFilterProps) {
    return (
        <>
            {/* 데스크탑 버튼 */}
            <div className="hidden md:flex flex-wrap justify-center gap-4 mb-16 max-w-4xl mx-auto">
                {genres.slice(0, 12).map((genre) => (
                    <button
                        key={genre.id}
                        onClick={() => onSelect(genre)}
                        className={`px-6 py-3 rounded-xl font-bold text-lg transition-all shadow-lg border-2
                            min-w-[120px] flex-1 sm:flex-none
                            ${
                                selectedGenre?.id === genre.id
                                    ? "bg-linear-to-r from-blue-600 to-purple-600 text-white shadow-blue-500/50 border-blue-400"
                                    : "bg-white/90 hover:bg-white text-gray-800 hover:shadow-xl hover:-translate-y-1 border-gray-200"
                            }`}
                    >
                        {genre.name}
                    </button>
                ))}
            </div>

            {/* 모바일 드롭다운 */}
            <div className="md:hidden mb-8">
                <select
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 bg-white text-gray-800 font-bold text-base focus:border-blue-400 focus:outline-none"
                    value={selectedGenre?.id ?? ""}
                    onChange={(e) => {
                        const found = genres.find(
                            (g) => g.id === Number(e.target.value),
                        );
                        if (found) onSelect(found);
                    }}
                >
                    <option value="" disabled>
                        장르를 선택하세요
                    </option>
                    {genres.slice(0, 12).map((genre) => (
                        <option key={genre.id} value={genre.id}>
                            {genre.name}
                        </option>
                    ))}
                </select>
            </div>
        </>
    );
}
