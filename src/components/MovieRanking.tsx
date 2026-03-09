import type { Movie } from "../types/movie";
import { useState, useCallback, useMemo } from "react";

interface MovieRankingProps {
    movies: Movie[];
}

export function MovieRanking({ movies }: MovieRankingProps) {
    const [index, setIndex] = useState(0);
    const moviePages = 5;
    const currentMovies = movies.slice(index, index + moviePages);

    const dailyRanks = useMemo(() => {
        const ranks: Record<number, number> = {};
        movies.forEach((movie, idx) => {
            ranks[movie.id] = idx + 1;
        });
        return ranks;
    }, [movies]);

    const handlePrev = useCallback(() => {
        setIndex(Math.max(0, index - moviePages));
    }, [index, moviePages]);

    const handleNext = useCallback(() => {
        setIndex(Math.min(movies.length - moviePages, index + moviePages));
    }, [index, movies.length, moviePages]);

    // -----------------------------------------------
    return (
        <div className="max-w-6xl mx-auto p-8">
            <h1 className="text-3xl font-bold mb-8">
                Mubee HOT 랭킹 {movies.length}편
            </h1>
            <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                {currentMovies.map((movie: Movie) => {
                    const overallRank =
                        movies.findIndex((m) => m.id === movie.id) + 1;
                    const prevRank = dailyRanks[movie.id];
                    const rankChange =
                        prevRank !== undefined ? overallRank - prevRank : 0;

                    return (
                        <li key={movie.id} className="relative w-48">
                            <img
                                src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                                className="w-full h-80 object-cover rounded mb-2"
                            />
                            <div
                                className="absolute top-2 left-2 w-14 h-12 sm:w-14 sm:h-8 
    bg-black/70 rounded-xl shadow-2xl border-2 border-white/50
    flex items-center justify-center text-2xl sm:text-xl 
    font-bold text-amber-50 drop-shadow-xl z-10 gap-2"
                            >
                                {overallRank}
                                {rankChange === 0 && <span>-</span>}
                                {rankChange < 0 && <span>↗</span>}
                                {rankChange > 0 && <span>↙</span>}
                            </div>
                            {movie.title}
                            <br />⭐ {movie.vote_average.toFixed(1)}
                        </li>
                    );
                })}
            </ul>

            <div className="flex items-center justify-center mt-7 gap-5">
                <button onClick={handlePrev} disabled={index === 0}>
                    이전
                </button>
                <button
                    onClick={handleNext}
                    disabled={index + moviePages >= movies.length}
                >
                    다음
                </button>
            </div>
        </div>
    );
}
