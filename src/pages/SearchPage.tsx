import { useEffect, useState, useRef, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { searchMoviesByQuery } from "@/api/tmdb";
import { MovieGrid } from "../components/MovieGrid";
import type { Movie } from "@/types/movie";

export default function SearchPage() {
    const [searchParams] = useSearchParams();
    const query = searchParams.get("q") || "";

    const [movies, setMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState(false);
    const [more, setMore] = useState(true);
    const pageRef = useRef(1);
    const loadingRef = useRef(false);
    const sentinelRef = useRef<HTMLDivElement>(null);

    // 쿼리 바뀔시 초기화
    useEffect(() => {
        if (!query) return;
        setMovies([]);
        pageRef.current = 1;
        setMore(true);
        loadingRef.current = true;
        setLoading(true);

        searchMoviesByQuery(query, 1).then((data) => {
            setMovies(data.results || []);
            setMore(data.total_pages > 1);
            loadingRef.current = false;
            setLoading(false);
        });
    }, [query]);

    // 추가 로딩
    const loadMore = useCallback(() => {
        if (loadingRef.current || !more || !query) return;
        loadingRef.current = true;
        setLoading(true);
        const nextPage = pageRef.current + 1;

        searchMoviesByQuery(query, nextPage).then((data) => {
            setMovies((prev) => [...prev, ...(data.results || [])]);
            pageRef.current = nextPage;
            setMore(nextPage < data.total_pages);
            loadingRef.current = false;
            setLoading(false);
        });
    }, [query, more]);

    // 스크롤 감지
    useEffect(() => {
        if (!more) return;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) loadMore();
            },
            { threshold: 0.1 },
        );
        if (sentinelRef.current) observer.observe(sentinelRef.current);
        return () => observer.disconnect();
    }, [loadMore, more]);

    return (
        <div className="max-w-7xl mx-auto px-10 py-10 mt-16 min-h-screen">
            <div className="text-center mb-12">
                <h1 className="text-3xl lg:text-5xl font-bold text-gray-800 mb-4">
                    "{query}" 검색 결과
                </h1>
                {movies.length > 0 && (
                    <p className="text-lg text-gray-500">
                        <span className="text-blue-600 font-bold">
                            {movies.length}+
                        </span>
                        개의 영화
                    </p>
                )}
            </div>

            {movies.length === 0 && !loading && (
                <div className="flex flex-col items-center justify-center py-32 text-gray-400">
                    <span className="text-5xl mb-4">결과 없음..</span>
                    <p className="text-xl font-semibold">검색 결과가 없어요</p>
                </div>
            )}

            <MovieGrid movies={movies} />

            {loading && (
                <div className="flex justify-center mt-10">
                    <div className="w-8 h-8 border-4 border-blue-400 border-t-transparent rounded-full animate-spin" />
                </div>
            )}

            <div ref={sentinelRef} className="h-20" />
        </div>
    );
}
