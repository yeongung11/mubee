import { useState, useEffect } from "react";
import { fetchGenre, fetchMovieGenre } from "@/api/tmdb";
import type { Movie, GenreType } from "@/types/movie";
import { useRating } from "../utils/useRating";

export default function Genre() {
    const { convertFive } = useRating();
    const [genres, setGenres] = useState<GenreType[]>([]);
    const [selectedGenre, setSelectedGenre] = useState<GenreType | null>(null);
    const [movies, setMovies] = useState<Movie[]>([]);
    const [, setPage] = useState(1);

    // 장르 목록
    useEffect(() => {
        fetchGenre().then((data) => setGenres(data.genres));
    }, []);

    // 장르 선택
    useEffect(() => {
        if (selectedGenre) {
            fetchMovieGenre(selectedGenre.id).then((data) => {
                setMovies(data.results);
                setPage(1);
            });
        }
    }, [selectedGenre]);

    return (
        <div className="min-h-screen  py-12 px-4 sm:px-6 lg:px-8 mt-15">
            <div className="max-w-7xl mx-auto">
                {/* 헤더 */}
                <div className="text-center mb-16">
                    <h1
                        className="text-5xl lg:text-6xl font-black 
                         
                        bg-clip-text text-black drop-shadow-2xl mb-6"
                    >
                        🎬 카테고리별 영화
                    </h1>
                    {selectedGenre && (
                        <p className="text-2xl font-semibold text-gray-700">
                            "{selectedGenre.name}"{" "}
                            <span className="text-blue-600">
                                ({movies.length}개)
                            </span>
                        </p>
                    )}
                </div>

                {/* 드롭다운 */}
                <div className="flex justify-center mb-16">
                    <select
                        value={selectedGenre?.id || ""}
                        onChange={(e) => {
                            const genreId = Number(e.target.value);
                            if (genreId) {
                                const genre = genres.find(
                                    (g) => g.id === genreId,
                                );
                                setSelectedGenre(genre || null);
                            } else {
                                setSelectedGenre(null);
                            }
                        }}
                        className="px-10 py-6 text-xl lg:text-2xl border-4 border-gray-200 rounded-3xl shadow-2xl 
                       bg-white/80 backdrop-blur-md font-bold text-gray-800
                       focus:outline-none focus:ring-8 focus:ring-blue-200 focus:border-blue-400
                       hover:shadow-3xl transition-all duration-300 cursor-pointer
                       min-w-[320px] lg:min-w-[380px]"
                    >
                        <option value=""> 카테고리 선택</option>
                        {genres.map((genre) => (
                            <option key={genre.id} value={genre.id}>
                                {genre.name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* 영화 그리드 */}
                {movies.length > 0 ? (
                    <div
                        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 
                         xl:grid-cols-6 gap-4 sm:gap-5 md:gap-6 lg:gap-8 auto-rows-fr"
                    >
                        {movies.map((movie) => (
                            <div
                                key={movie.id}
                                className="group cursor-pointer bg-white/70 backdrop-blur-sm rounded-2xl 
                          shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300
                          overflow-hidden border border-gray-100 hover:border-blue-200"
                            >
                                <img
                                    src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                                    alt={movie.title}
                                    className="w-full h-56 lg:h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                                <div className="p-4 lg:p-5">
                                    <h3 className="font-bold text-lg lg:text-xl line-clamp-2 text-gray-800 mb-2">
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
                ) : selectedGenre ? (
                    <div className="text-center py-32">
                        <div
                            className="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-blue-200 to-indigo-200 
                           rounded-2xl flex items-center justify-center"
                        >
                            <span className="text-3xl">🎥</span>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-600 mb-2">
                            "{selectedGenre.name}" 영화 로딩 중...
                        </h3>
                    </div>
                ) : null}
            </div>
        </div>
    );
}
