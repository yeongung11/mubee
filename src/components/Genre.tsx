import { useState, useEffect } from "react";
import { fetchGenre, fetchMovieGenre } from "@/api/tmdb";
import type { Movie, GenreType } from "@/types/movie";
import { useRating } from "../utils/useRating";
import { useNavigate } from "react-router-dom";
import { getEngTitle } from "../utils/movieTitle";

export default function Genre() {
    const navigate = useNavigate();
    const { convertFive } = useRating();
    const [genres, setGenres] = useState<GenreType[]>([]);
    const [selectedGenre, setSelectedGenre] = useState<GenreType | null>(null);
    const [movies, setMovies] = useState<Movie[]>([]);
    const [, setPage] = useState(1);
    const [loading, setLoading] = useState(false);

    // 장르 목록
    useEffect(() => {
        fetchGenre().then((data) => setGenres(data.genres));
    }, []);

    // 장르 선택
    useEffect(() => {
        if (selectedGenre) {
            setLoading(true);
            setMovies([]);

            fetchMovieGenre(selectedGenre.id).then(async (data) => {
                const resolved = await Promise.all(
                    (data.results || []).map(async (movie: Movie) => ({
                        ...movie,
                        title: await getEngTitle(movie),
                    })),
                );
                setMovies(resolved);
                setPage(1);
            });
        }
    }, [selectedGenre]);

    return (
        <div className="max-w-screen-xl mx-auto px-10 py-10 mt-16 min-h-screen to-blue-50">
            <div className="max-w-7xl mx-auto">
                {/* 헤더 */}
                <div className="text-center mb-16">
                    <h1 className="text-5xl lg:text-6xl font-black bg-clip-text text-black drop-shadow-2xl mb-6">
                        🎬 카테고리별 영화
                    </h1>

                    {selectedGenre && !loading && (
                        <p className="text-2xl font-semibold text-gray-700">
                            "{selectedGenre.name}"{" "}
                            <span className="text-blue-600">
                                ({movies.length}개)
                            </span>
                        </p>
                    )}

                    {selectedGenre && loading && (
                        <div className="flex justify-center">
                            <div className="h-8 w-44 bg-gray-300 rounded-lg animate-pulse" />
                        </div>
                    )}
                </div>

                {/* 드롭다운 */}
                <div className="flex flex-wrap justify-center gap-4 mb-16 max-w-4xl mx-auto">
                    {genres.slice(0, 12).map((genre) => (
                        <button
                            key={genre.id}
                            onClick={() => setSelectedGenre(genre)}
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

                {selectedGenre && movies.length > 0 && !loading && (
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold text-gray-800">
                            "{selectedGenre.name}" 영화
                        </h2>

                        <button
                            onClick={() =>
                                navigate(`/genre/${selectedGenre.id}`)
                            }
                            className="text-sm font-semibold text-blue-600 hover:text-blue-700"
                        >
                            더보기
                        </button>
                    </div>
                )}

                {selectedGenre && loading && (
                    <div className="flex items-center justify-between mb-6 animate-pulse">
                        <div className="h-8 w-40 bg-gray-300 rounded" />
                        <div className="h-5 w-12 bg-gray-300 rounded" />
                    </div>
                )}

                {/* 영화 그리드 */}
                {movies.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 lg:gap-8">
                        {movies.map((movie) => (
                            <div
                                key={movie.id}
                                onClick={() => navigate(`/movie/${movie.id}`)}
                                className="group cursor-pointer rounded-2xl hover:-translate-y-2 transition-all duration-300 overflow-hidden"
                            >
                                <img
                                    src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                                    alt={movie.title}
                                    className="w-full h-72 lg:h-80 object-cover rounded-2xl group-hover:scale-[1.02] transition-all"
                                />
                                <div className="p-4 lg:p-5">
                                    <h3 className="text-lg lg:text-xl line-clamp-2 text-gray-800 mb-2">
                                        {movie.title}
                                    </h3>
                                    <div className="flex items-center text-sm text-yellow-500 font-semibold">
                                        ⭐{" "}
                                        {convertFive(movie.vote_average) ||
                                            "N/A"}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : selectedGenre && loading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 lg:gap-8 animate-pulse">
                        {Array.from({ length: 10 }).map((_, i) => (
                            <div
                                key={i}
                                className="rounded-2xl overflow-hidden"
                            >
                                <div className="w-full h-72 lg:h-80 bg-gray-300 rounded-2xl" />
                                <div className="p-4 lg:p-5">
                                    <div className="h-5 bg-gray-300 rounded w-3/4 mb-2" />
                                    <div className="h-5 bg-gray-300 rounded w-1/2 mb-3" />
                                    <div className="h-4 bg-gray-300 rounded w-16" />
                                </div>
                            </div>
                        ))}
                    </div>
                ) : selectedGenre ? (
                    <div className="text-center py-32">
                        <div className="w-24 h-24 mx-auto mb-6 bg-linear-to-r from-blue-200 to-indigo-200 rounded-2xl flex items-center justify-center">
                            <span className="text-3xl">🎥</span>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-600 mb-2">
                            "{selectedGenre.name}" 영화가 없습니다
                        </h3>
                    </div>
                ) : null}
            </div>
        </div>
    );
}
