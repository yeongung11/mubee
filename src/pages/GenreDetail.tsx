import { useParams } from "react-router-dom";
import { useEffect, useEffectEvent, useState, useCallback } from "react";
import { fetchMovieGenre } from "@/api/tmdb";
import { useRating } from "../utils/useRating";
import type { Movie } from "@/types/movie";
import { GENRE_NAMES } from "@/types/movie";
import { useNavigate } from "react-router-dom";
import { getEngTitle } from "../utils/movieTitle";

export default function GenreDetail() {
    const navigate = useNavigate();
    const params = useParams();
    const genreId = params.genreId as string;
    const { convertFive } = useRating();

    const [movies, setMovies] = useState<Movie[]>([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [more, setMore] = useState(true);

    const genreName = genreId ? GENRE_NAMES[Number(genreId)] || "영화" : "장르";

    // 로딩
    const onFetch = useEffectEvent((id: number) => {
        setLoading(true);
        setPage(1);
        setMovies([]);

        fetchMovieGenre(id, 1)
            .then(async (data) => {
                const resolved = await Promise.all(
                    (data.results || []).map(async (movie: Movie) => {
                        const title = await getEngTitle(movie);
                        return { ...movie, title };
                    }),
                );
                setMovies(resolved);
                setMore(data.total_pages > 1);
            })
            .finally(() => setLoading(false));
    });

    useEffect(() => {
        if (genreId) onFetch(Number(genreId));
    }, [genreId]);

    // 무한 스크롤
    const loadMore = useCallback(async () => {
        if (loading || !more || !genreId) return;

        setLoading(true);
        const nextPage = page + 1;
        fetchMovieGenre(Number(genreId), nextPage)
            .then((data) => {
                setMovies((prev) => [...prev, ...(data.results || [])]);
                setPage(nextPage);
                setMore(nextPage < data.total_pages);
            })
            .finally(() => setLoading(false));
    }, [genreId, page, loading, more]);

    // 스크롤 감지
    useEffect(() => {
        if (!more) return;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    loadMore();
                }
            },
            { threshold: 0.1 },
        );

        const sentinel = document.querySelector("#sentinel");
        if (sentinel) observer.observe(sentinel);

        return () => observer.disconnect();
    }, [loadMore]);

    const renderSkeletonCards = (count: number) => (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 lg:gap-8 animate-pulse">
            {Array.from({ length: count }).map((_, i) => (
                <div key={i}>
                    <div className="w-full h-72 lg:h-80 bg-gray-300 rounded-2xl" />
                    <div className="p-4 mt-3">
                        <div className="h-5 bg-gray-300 rounded w-3/4 mb-2" />
                        <div className="h-4 bg-gray-300 rounded w-1/2" />
                    </div>
                </div>
            ))}
        </div>
    );

    return (
        <div className="max-w-screen-xl mx-auto px-10 py-10 mt-16 min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
            {/* 헤더 */}
            <div className="text-center mb-16">
                <h1 className="text-3xl lg:text-5xl font-bold text-gray-800 mb-8 drop-shadow-lg">
                    {genreName}
                </h1>
                {movies.length > 0 ? (
                    <p className="text-xl lg:text-2xl font-semibold text-gray-700">
                        총{" "}
                        <span className="text-blue-600 font-bold">
                            {movies.length}+
                        </span>
                        개의 영화
                    </p>
                ) : loading ? (
                    <div className="flex justify-center">
                        <div className="h-8 w-36 bg-gray-300 rounded-lg animate-pulse" />
                    </div>
                ) : null}
            </div>

            {movies.length === 0 && loading ? (
                renderSkeletonCards(10)
            ) : (
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 lg:gap-8">
                        {movies.map((movie: Movie) => (
                            <div
                                key={movie.id}
                                onClick={() => navigate(`/movie/${movie.id}`)}
                                className="group cursor-pointer hover:scale-105 transition-all duration-300"
                            >
                                <img
                                    src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                                    alt={movie.title}
                                    className="w-full h-72 lg:h-80 object-cover rounded-2xl shadow-lg group-hover:shadow-2xl group-hover:scale-[1.02] transition-all"
                                />
                                <div className="p-4 mt-3">
                                    <h3 className="font-bold text-lg line-clamp-2 text-gray-800">
                                        {movie.title}
                                    </h3>
                                    <div className="flex items-center mt-2 text-sm">
                                        <span className="text-yellow-500 font-semibold mr-1">
                                            ⭐
                                        </span>
                                        <span>
                                            {convertFive(movie.vote_average)}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}

            {/* 그리드 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 lg:gap-8">
                {movies.map((movie: Movie) => (
                    <div
                        key={movie.id}
                        onClick={() => navigate(`/movie/${movie.id}`)}
                        className="group cursor-pointer hover:scale-105 transition-all duration-300"
                    >
                        <img
                            src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                            alt={movie.title}
                            className="w-full h-72 lg:h-80 object-cover rounded-2xl shadow-lg 
                      group-hover:shadow-2xl group-hover:scale-[1.02] transition-all"
                        />
                        <div className="p-4 mt-3">
                            <h3 className="font-bold text-lg line-clamp-2 text-gray-800">
                                {movie.title}
                            </h3>
                            <div className="flex items-center mt-2 text-sm">
                                <span className="text-yellow-500 font-semibold mr-1">
                                    ⭐
                                </span>
                                <span>{convertFive(movie.vote_average)}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* 추가 로딩 */}
            {loading && movies.length > 0 && (
                <div className="mt-10">{renderSkeletonCards(5)}</div>
            )}

            <div id="sentinel" className="h-20" />
        </div>
    );
}
