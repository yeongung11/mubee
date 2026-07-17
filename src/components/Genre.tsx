import { useState, useEffect } from "react";
import { fetchGenre, fetchMovieGenre } from "@/api/tmdb";
import type { Movie, GenreType } from "@/types/movie";
import { useNavigate } from "react-router-dom";
import { MovieGrid } from "@/components/MovieGrid";
import { GenreHeader } from "@/components/Genre/GenreHeader";
import { GenreFilter } from "@/components/Genre/GenreFilter";
import { GenreSkeleton } from "@/components/Genre/GenreSkeleton";

export default function Genre() {
    const navigate = useNavigate();
    const [genres, setGenres] = useState<GenreType[]>([]);
    const [selectedGenre, setSelectedGenre] = useState<GenreType | null>(null);
    const [movies, setMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchGenre().then((data) => setGenres(data.genres));
    }, []);

    useEffect(() => {
        if (!selectedGenre) return;
        setLoading(true);
        setMovies([]);
        fetchMovieGenre(selectedGenre.id)
            .then((data) => setMovies(data.results || []))
            .catch(() => {})
            .finally(() => setLoading(false));
    }, [selectedGenre]);

    return (
        <div className="max-w-screen-xl mx-auto px-10 py-10 mt-16 min-h-screen">
            <div className="max-w-7xl mx-auto">
                <GenreHeader
                    selectedGenre={selectedGenre}
                    movieCount={movies.length}
                    loading={loading}
                />
                <GenreFilter
                    genres={genres}
                    selectedGenre={selectedGenre}
                    onSelect={setSelectedGenre}
                />

                {selectedGenre && movies.length > 0 && !loading && (
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold text-gray-800">
                            {selectedGenre.name} 장르 영화
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

                {movies.length > 0 ? (
                    <MovieGrid movies={movies} />
                ) : selectedGenre && loading ? (
                    <GenreSkeleton />
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
