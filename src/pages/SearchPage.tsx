import { useEffect, useState, useRef, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { searchMoviesByQuery, searchActorsByQuery } from "@/api/tmdb";
import { MovieGrid } from "../components/MovieGrid";
import { PersonCard } from "../components/PersonCard";
import type { Movie, Actor } from "@/types/movie";

interface SearchResultsProps {
    query: string;
    tab: "movie" | "actor";
    onTabChange: (tab: "movie" | "actor") => void;
}

export default function SearchPage() {
    const [searchParams] = useSearchParams();
    const query = searchParams.get("q") || "";

    const [tab, setTab] = useState<"movie" | "actor">("movie");

    return (
        <SearchResults
            key={`${query}-${tab}`}
            query={query}
            tab={tab}
            onTabChange={setTab}
        />
    );
}

function SearchResults({ query, tab, onTabChange }: SearchResultsProps) {
    const [movies, setMovies] = useState<Movie[]>([]);

    const [actors, setActors] = useState<Actor[]>([]);

    const [loading, setLoading] = useState(Boolean(query));

    const [more, setMore] = useState(true);

    const pageRef = useRef(1);

    const sentinelRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!query) return;

        let cancelled = false;

        const loadInitialResults = async () => {
            try {
                if (tab === "movie") {
                    const data = await searchMoviesByQuery(query, 1);

                    if (cancelled) return;

                    setMovies(data.results || []);
                    setMore(data.total_pages > 1);
                } else {
                    const data = await searchActorsByQuery(query, 1);

                    if (cancelled) return;

                    setActors(data.results || []);
                    setMore(data.total_pages > 1);
                }
            } catch (error) {
                if (!cancelled) {
                    console.error(error);
                }
            } finally {
                if (!cancelled) {
                    setLoading(false);
                }
            }
        };

        loadInitialResults();

        return () => {
            cancelled = true;
        };
    }, [query, tab]);

    // 추가 로딩
    const loadMore = useCallback(() => {
        if (loading || !more || !query) return;

        setLoading(true);
        const nextPage = pageRef.current + 1;

        if (tab === "movie") {
            searchMoviesByQuery(query, nextPage).then((data) => {
                setMovies((prev) => [...prev, ...(data.results || [])]);
                pageRef.current = nextPage;
                setMore(nextPage < data.total_pages);

                setLoading(false);
            });
        } else {
            searchActorsByQuery(query, nextPage).then((data) => {
                setActors((prev) => [...prev, ...(data.results || [])]);
                pageRef.current = nextPage;
                setMore(nextPage < data.total_pages);

                setLoading(false);
            });
        }
    }, [query, more, tab, loading]);

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

    const isEmpty = tab === "movie" ? movies.length === 0 : actors.length === 0;

    return (
        <div className="max-w-7xl mx-auto px-10 py-10 mt-16 min-h-screen">
            <div className="text-center mb-8">
                <h1 className="text-3xl lg:text-5xl font-bold text-gray-800 mb-4">
                    "{query}" 검색 결과
                </h1>
            </div>

            {/* 탭 */}
            <div className="flex gap-4 mb-8 border-b border-gray-200">
                <button
                    onClick={() => onTabChange("movie")}
                    className={`pb-2 text-sm font-semibold transition border-b-2 ${
                        tab === "movie"
                            ? "border-mubee-burgundy text-mubee-burgundy"
                            : "border-transparent text-gray-400 hover:text-gray-600"
                    }`}
                >
                    영화 {movies.length > 0 && `${movies.length}+`}
                </button>
                <button
                    onClick={() => onTabChange("actor")}
                    className={`pb-2 text-sm font-semibold transition border-b-2 ${
                        tab === "actor"
                            ? "border-mubee-burgundy text-mubee-burgundy"
                            : "border-transparent text-gray-400 hover:text-gray-600"
                    }`}
                >
                    배우 {actors.length > 0 && `${actors.length}+`}
                </button>
            </div>

            {isEmpty && !loading && (
                <div className="flex flex-col items-center justify-center py-32 text-gray-400">
                    <span className="text-5xl mb-4">결과 없음..</span>
                    <p className="text-xl font-semibold">검색 결과가 없어요</p>
                </div>
            )}

            {tab === "movie" && <MovieGrid movies={movies} />}
            {tab === "actor" && (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                    {actors.map((actor) => (
                        <PersonCard key={actor.id} person={actor} />
                    ))}
                </div>
            )}

            {loading && (
                <div className="flex justify-center mt-10">
                    <div className="w-8 h-8 border-4 border-mubee-burgundy border-t-transparent rounded-full animate-spin" />
                </div>
            )}

            <div ref={sentinelRef} className="h-20" />
        </div>
    );
}
