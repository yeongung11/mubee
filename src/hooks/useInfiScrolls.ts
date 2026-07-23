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
    const [error, setError] = useState<string | null>(null);
    const [retryKey, setRetryKey] = useState(0);
    const pageRef = useRef(1);
    const loadingRef = useRef(false);
    const sentinelRef = useRef<HTMLDivElement>(null);

    // 초기 로딩
    useEffect(() => {
        if (!enabled) return;

        loadingRef.current = true;
        setLoading(true);
        setError(null);
        setMore(true);
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
            .catch((error) => {
                console.error(error);
                setError("로딩 실패");
            })
            .finally(() => {
                loadingRef.current = false;
                setLoading(false);
            });
    }, [enabled, fetchFn, retryKey]);

    // 추가 로딩
    const loadMore = useCallback(async () => {
        if (loadingRef.current || !more || !enabled) return;

        loadingRef.current = true;
        setLoading(true);
        setError(null);

        const nextPage = pageRef.current + 1;
        try {
            const data = await fetchFn(nextPage);

            const resolved = await Promise.all(
                (data.results || []).map(async (movie: Movie) => ({
                    ...movie,
                    title: await getEngTitle(movie),
                })),
            );

            setMovies((prev) => [...prev, ...resolved]);
            pageRef.current = nextPage;
            setMore(nextPage < data.total_pages);
        } catch (error) {
            console.error(error);
            setError("추가 로드 실패.");
        } finally {
            loadingRef.current = false;
            setLoading(false);
        }
    }, [enabled, more, fetchFn]);

    // 실패한 요청 재시도
    const retry = useCallback(() => {
        setError(null);

        if (movies.length === 0) {
            setRetryKey((prev) => prev + 1);
            return;
        }

        loadMore();
    }, [movies.length, loadMore]);

    // 스크롤 감지
    useEffect(() => {
        if (!more) return;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) loadMore();
            },
            { threshold: 0.1 },
        );
        const sentinel = sentinelRef.current;

        if (sentinel) observer.observe(sentinel);
        return () => observer.disconnect();
    }, [loadMore, more, error]);

    return { movies, loading, error, retry, sentinelRef };
}
