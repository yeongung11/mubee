import type { Movie, ExtendedMovie } from "../types/movie";
import { useState, useCallback, useMemo } from "react";
import { MovieGrid } from "./MovieGrid";
import Buttons from "../components/Buttons";
import { Link } from "react-router-dom";


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
        <div className="max-w-8xl mx-auto p-8 relative">
            <div className="flex justify-between">
                <h1 className="text-3xl font-bold mb-8">공개 예정작</h1>
                <Link to="/movies?category=upcoming">더보기</Link>
            </div>

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
                        <div className="absolute top-2 left-2 w-14 h-8 bg-gradient-to-r bg-black/70 rounded-xl shadow-2xl border-2 border-white/50 flex items-center justify-center text-base sm:text-base font-bold text-amber-50 drop-shadow-xl z-10 gap-2">
                            D-{diffDays > 0 ? diffDays : "개봉"}
                        </div>
                    );
                }}
            />

            {futureMovies.length > moviePages && (
                <div className="flex justify-between mt-8 gap-4">
                    <Buttons
                        direction="left"
                        onClick={handlePrev}
                        disabled={index === 0}
                    />
                    <Buttons
                        direction="right"
                        onClick={handleNext}
                        disabled={index + moviePages >= movies.length}
                    />
                </div>
            )}
        </div>
    );
}
