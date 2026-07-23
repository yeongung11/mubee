import { useCallback } from "react";
import { fetchMainPageMovies } from "@/api/tmdb";
import { useSearchParams, useNavigate } from "react-router-dom";
import { MovieGrid } from "@/components/MovieGrid";
import { useInfiScrolls } from "@/hooks/useInfiScrolls";

const CATEGORY_MAP = {
    popular: "인기 영화",
    now_playing: "현재 상영중",
    top_rated: "평점 높은 영화",
    upcoming: "공개 예정 영화",
} as const;

// 첫 로딩용 스켈레톤
function InitialSkeleton() {
    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6 animate-pulse">
            {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className="rounded-2xl overflow-hidden">
                    <div className="w-full aspect-2/3 bg-gray-300 rounded-xl" />
                    <div className="p-3">
                        <div className="h-4 bg-gray-300 rounded w-3/4 mb-2" />
                        <div className="h-4 bg-gray-300 rounded w-1/2" />
                    </div>
                </div>
            ))}
        </div>
    );
}

// 추가 로딩용 스켈레톤
function LoadingSkeleton() {
    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mt-8 pb-12">
            {Array.from({ length: 5 }).map((_, i) => (
                <div
                    key={i}
                    className="rounded-2xl overflow-hidden animate-pulse"
                >
                    <div className="w-full aspect-2/3 bg-gray-300 rounded-xl" />
                    <div className="p-4">
                        <div className="h-5 bg-gray-300 rounded w-3/4 mb-2" />
                        <div className="h-5 bg-gray-300 rounded w-1/2" />
                    </div>
                </div>
            ))}
        </div>
    );
}

export function MainPageMovies() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const category = searchParams.get("category") || "popular";

    //  fetchFn을 useCallback으로 감싸서 category 바뀔 때만 재생성
    const fetchFn = useCallback(
        (page: number) => fetchMainPageMovies(category, page),
        [category],
    );

    const { movies, loading, error, retry, sentinelRef } = useInfiScrolls(
        fetchFn,
    );

    return (
        <div className="max-w-8xl mx-auto p-8 mt-12">
            {/* 카테고리 탭 */}
            <div className="flex gap-4 mb-8 overflow-x-auto pb-4">
                {Object.entries(CATEGORY_MAP).map(([key, label]) => (
                    <button
                        key={key}
                        onClick={() => navigate(`/movies?category=${key}`)}
                        className={`px-6 py-2 rounded-full font-bold transition-all ${
                            category === key
                                ? "bg-blue-500 text-white shadow-lg"
                                : "bg-white/10 text-gray-400 hover:bg-white/20"
                        }`}
                    >
                        {label}
                    </button>
                ))}
            </div>

            {/* 영화 그리드 */}
            {movies.length === 0 && loading ? (
                <InitialSkeleton />
            ) : (
                <>
                    <MovieGrid movies={movies} />
                    {loading && <LoadingSkeleton />}
                </>
            )}
            {error && (
                <div className="flex flex-col items-center gap-3 py-8">
                    <p className="text-red-500">{error}</p>

                    <button
                        type="button"
                        onClick={retry}
                        className="rounded bg-white px-4 py-2 text-black"
                    >
                        다시 시도
                    </button>
                </div>
            )}

            {/* 바닥 감지  */}
            <div
                ref={sentinelRef}
                className="py-12 text-center text-gray-400 text-sm"
            >
                {!loading && movies.length > 0 && "모든 영화를 불러왔습니다 ✓"}
            </div>
        </div>
    );
}
