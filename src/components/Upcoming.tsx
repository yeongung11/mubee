import type { Movie, ExtendedMovie } from "../types/movie";
import { useState, useCallback, useMemo } from "react";

interface UpcomingProps {
    movies: Movie[];
}

export function Upcoming({ movies }: UpcomingProps) {
    const futureMovies = useMemo(() => {
        return movies.filter((movie) => {
            const releaseDate = new Date(movie.release_date + "T00:00:00");
            return releaseDate > new Date();
        });
    }, [movies]);

    const sortedFutureMovies = useMemo(() => {
        return futureMovies
            .map((movie) => ({
                ...movie,
                releaseDate: new Date(movie.release_date + "T00:00:00"),
            }))
            .sort((a, b) => a.releaseDate.getTime() - b.releaseDate.getTime());
    }, [futureMovies]);

    const [index, setIndex] = useState(0);
    const moviePages = 5;
    const currentMovies = sortedFutureMovies.slice(index, index + moviePages);

    const handlePrev = useCallback(() => {
        setIndex(Math.max(0, index - moviePages));
    }, [index, moviePages]);

    const handleNext = useCallback(() => {
        setIndex(
            Math.min(
                sortedFutureMovies.length - moviePages,
                index + moviePages,
            ),
        );
    }, [index, sortedFutureMovies.length, moviePages]);

    // -----------------------------------------------
    return (
        <div className="max-w-6xl mx-auto p-8">
            <h1 className="text-3xl font-bold mb-8">공개 예정작</h1>
            <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                {currentMovies.map((movie: ExtendedMovie) => {
                    const today = new Date();
                    const diffTime =
                        movie.releaseDate.getTime() - today.getTime();
                    const diffDays = Math.ceil(
                        diffTime / (1000 * 60 * 60 * 24),
                    );
                    return (
                        <li key={movie.id} className="relative w-48">
                            <img
                                src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                                className="w-full h-80 object-cover rounded mb-2"
                            />
                            <div
                                className="absolute top-2 left-2 bg-gradient-to-r from-orange-400 to-red-500 
                      text-white px-2 py-1 rounded-lg text-xs font-bold shadow-lg z-10"
                            >
                                D-{diffDays > 0 ? diffDays : "개봉"}
                            </div>
                            {movie.title}
                            <br />
                        </li>
                    );
                })}
            </ul>

            {futureMovies.length > moviePages && (
                <div className="flex justify-center mt-8 gap-4">
                    <button
                        onClick={handlePrev}
                        disabled={index === 0}
                        className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
                    >
                        이전
                    </button>
                    <button
                        onClick={handleNext}
                        disabled={index + moviePages >= futureMovies.length}
                        className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
                    >
                        다음
                    </button>
                </div>
            )}
        </div>
    );
}
