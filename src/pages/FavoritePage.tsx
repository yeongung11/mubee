import { useState } from "react";
import { useFavoritesStore } from "../store/favorite";
import { MovieGrid } from "../components/MovieGrid";
import { Link } from "react-router-dom";

type sortOptions = "default" | "rating_desc" | "rating_asc" | "title";

const SORT_OPTIONS: { label: string; value: sortOptions }[] = [
    { label: "전체", value: "default" },
    { label: " 평점 높은순", value: "rating_desc" },
    { label: " 평점 낮은순", value: "rating_asc" },
    { label: " 제목순", value: "title" },
];

export function FavoritePage() {
    const { favorites } = useFavoritesStore();
    const [sort, setSort] = useState<sortOptions>("default");

    const sorted = [...favorites].sort((a, b) => {
        if (sort === "rating_desc") return b.vote_average - a.vote_average;
        if (sort === "rating_asc") return a.vote_average - b.vote_average;
        if (sort === "title") return a.title.localeCompare(b.title, "ko");
        return 0;
    });

    if (favorites.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen gap-4 text-center">
                <span className="text-5xl">🎬</span>
                <h2 className="text-xl font-bold text-gray-700">
                    즐겨 찾는 영화가 없습니다
                </h2>
                <Link to="/" className="text-sm text-blue-500 hover:underline">
                    영화 목록 보러가기
                </Link>
            </div>
        );
    }
    return (
        <div className="max-w-screen-xl mx-auto px-10 py-10 mt-16">
            {/* 헤더 */}
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold">즐겨찾기한 영화</h1>
                <p className="text-sm text-gray-400 mt-1">
                    총 {favorites.length}편
                </p>
            </div>

            {/* 모바일 드롭다운 */}
            <div className="md:hidden mb-8">
                <select
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 bg-white text-gray-800 font-bold text-sm focus:border-blue-400 focus:outline-none"
                    value={sort}
                    onChange={(e) => setSort(e.target.value as sortOptions)}
                >
                    {SORT_OPTIONS.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            </div>

            {/* 데스크탑 정렬 필터 */}
            <div className="hidden md:flex gap-2 flex-wrap justify-center mb-8">
                {SORT_OPTIONS.map((option) => (
                    <button
                        key={option.value}
                        onClick={() => setSort(option.value)}
                        className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all
                            ${
                                sort === option.value
                                    ? "bg-blue-600 text-white shadow-md"
                                    : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                            }`}
                    >
                        {option.label}
                    </button>
                ))}
            </div>

            <MovieGrid movies={sorted} />
        </div>
    );
}
