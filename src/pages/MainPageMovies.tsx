import { useEffect, useState, useRef } from "react";
import type { Movie } from "@/types/movie";
import { fetchMainPageMovies } from "@/api/tmdb";
import { useSearchParams, useNavigate } from "react-router-dom";
import { MovieGrid } from "@/components/MovieGrid";

export function MainPageMovies() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [movies, setMovies] = useState<Movie[]>([]);
    const category = searchParams.get("category") || "popular";
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);
    const observerRef = useRef<HTMLDivElement>(null);

    const categoryMap = {
        popular: "인기 영화",
        now_playing: "현재 상영중",
        top_rated: "평점 높은 영화",
        upcoming: "공개 예정 영화",
    };

    // 탭 바뀌면 초기화
    useEffect(() => {
        setMovies([]);
        setPage(1);
        setHasMore(true);
    }, [category]);

    // page 바뀔 떄마다 추가 로드
    useEffect(() => {
        if (!hasMore || loading) return;
        setLoading(true);

        fetchMainPageMovies(category, page).then((data) => {
            setMovies((prev) =>
                page === 1 ? data.results : [...prev, ...data.results],
            );
            setHasMore(page < data.total_pages);
            setLoading(false);
        });
    }, [category, page]);

    // 바닥 감지
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && hasMore && !loading) {
                    setPage((prev) => prev + 1);
                }
            },
            { threshold: 0.1 },
        );
        if (observerRef.current) observer.observe(observerRef.current);
        return () => observer.disconnect();
    }, [hasMore, loading]);

    // 첫 로딩용 스켈레톤
    const renderInitialSkeleton = () => (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6 animate-pulse">
            {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className="rounded-2xl overflow-hidden">
                    <div className="w-full aspect-[2/3] bg-gray-300 rounded-xl" />
                    <div className="p-4">
                        <div className="h-5 bg-gray-300 rounded w-3/4 mb-2" />
                        <div className="h-5 bg-gray-300 rounded w-1/2" />
                    </div>
                </div>
            ))}
        </div>
    );

    // 추가 로딩용 스켈레톤
    const renderLoadingSkeleton = () => (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6 mt-8 pb-12">
            {Array.from({ length: 6 }).map((_, i) => (
                <div
                    key={i}
                    className="rounded-2xl overflow-hidden animate-pulse"
                >
                    <div className="w-full aspect-[2/3] bg-gray-300 rounded-xl" />
                    <div className="p-4">
                        <div className="h-5 bg-gray-300 rounded w-3/4 mb-2" />
                        <div className="h-5 bg-gray-300 rounded w-1/2" />
                    </div>
                </div>
            ))}
        </div>
    );

    return (
        <div className="max-w-8xl mx-auto p-8 mt-12">
            <div className="flex gap-4 mb-8 overflow-x-auto pb-4">
                {Object.entries(categoryMap).map(([key, label]) => (
                    <button
                        key={key}
                        onClick={() => navigate(`/movies?category=${key}`)}
                        className={`px-6 py-2 rounded-full font-bold transition-all
                            ${
                                category === key
                                    ? "bg-blue-500 text-white shadow-lg"
                                    : "bg-white/10 text-gray-400 hover:bg-white/20"
                            }`}
                    >
                        {label}
                    </button>
                ))}
            </div>
            <MovieGrid movies={movies} />
            {/* 영화 그리드 */}
            {movies.length === 0 && loading ? (
                renderInitialSkeleton()
            ) : (
                <>
                    <MovieGrid movies={movies} />
                    {/* 추가 로딩 스켈레톤 */}
                    {loading && renderLoadingSkeleton()}
                </>
            )}

            {/* 로딩 상태 텍스트 */}
            <div
                ref={observerRef}
                className="py-12 text-center text-gray-400 text-sm"
            >
                {!loading && !hasMore && "모든 영화를 불러왔습니다 ✓"}
            </div>
        </div>
    );
}
