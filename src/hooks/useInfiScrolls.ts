import { useEffect, useRef, useState, useCallback } from "react";
import type { Movie } from "@/types/movie";
import { getEngTitle } from "../utils/movieTitle";

interface FetchFn {
    (page: number): Promise<{
        results: Movie[];
        total_pages: number;
    }>;
}

export function useInfiScrolls(fetchFn: FetchFn, enabled = true) {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState(false);
    const [more, setMore] = useState(true);
    const pageRef = useRef(1);
    const loadingRef = useRef(false);
    const sentinelRef = useRef<HTMLDivElement>(null);

    // 초기 로딩
    useEffect(() => {
        if (!enabled) return;
        loadingRef.current = true;
        setLoading(true);
        pageRef.current = 1;
        setMovies([]);

        fetchFn(1)
            .then(async (data) => {
                const resolved = await Promise.all(
                    (data.results || []).map(async (movie: Movie) => ({
                        ...movie,
                        title: await getEngTitle(movie),
                    })),
                );
                setMovies(resolved);
                setMore(data.total_pages > 1);
            })
            .finally(() => {
                loadingRef.current = false;
                setLoading(false);
            });
    }, [enabled, fetchFn]);

    // 추가 로딩
    const loadMore = useCallback(async () => {
        if (loadingRef.current || !more || !enabled) return;

        loadingRef.current = true;
        setLoading(true);
        const nextPage = pageRef.current + 1;

        fetchFn(nextPage)
            .then(async (data) => {
                const resolved = await Promise.all(
                    (data.results || []).map(async (movie: Movie) => ({
                        ...movie,
                        title: await getEngTitle(movie),
                    })),
                );
                setMovies((prev) => [...prev, ...resolved]);
                pageRef.current = nextPage;
                setMore(nextPage < data.total_pages);
            })
            .finally(() => {
                loadingRef.current = false;
                setLoading(false);
            });
    }, [enabled, more, fetchFn]);

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
    }, [loadMore, more, fetchFn]);

    return { movies, loading, sentinelRef };
}
