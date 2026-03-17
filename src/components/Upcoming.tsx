import type { Movie, ExtendedMovie } from "../types/movie";
import { useState, useCallback, useMemo } from "react";
import { MovieGrid } from "./MovieGrid";

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
        <div className="max-w-6xl mx-auto p-8 relative">
            <h1 className="text-3xl font-bold mb-8">공개 예정작</h1>
            <MovieGrid
                showRating={false}
                movies={currentMovies}
                renderBadge={(movie) => {
                    const typedMovie = movie as ExtendedMovie;
                    const today = new Date();
                    const diffTime =
                        typedMovie.releaseDate!.getTime() - today.getTime();
                    const diffDays = Math.ceil(
                        diffTime / (1000 * 60 * 60 * 24),
                    );

                    return (
                        <div className="absolute top-2 left-2 bg-gradient-to-r from-orange-400 to-red-500 text-white px-2 py-1 rounded-lg text-xs font-bold shadow-lg z-10">
                            D-{diffDays > 0 ? diffDays : "개봉"}
                        </div>
                    );
                }}
            />

            {futureMovies.length > moviePages && (
                <div className="flex justify-between mt-8 gap-4">
                    <button
                        onClick={handlePrev}
                        disabled={index === 0}
                        className="absolute left-1 top-[55%] -translate-y-1/2 z-20 text-2xl font-bold bg-white/50 text-black  px-4 py-2 rounded-full backdrop-blur-sm disabled:opacity-0"
                    >
                        ‹
                    </button>
                    <button
                        onClick={handleNext}
                        disabled={index + moviePages >= futureMovies.length}
                        className="absolute right-1 top-[55%] -translate-y-1/2 z-20 text-2xl font-bold bg-black/150 text-black px-4 py-2 rounded-full backdrop-blur-sm shadow-2xl shadow-black/4 disabled:opacity-0"
                    >
                        ›
                    </button>
                </div>
            )}
        </div>
    );
}
