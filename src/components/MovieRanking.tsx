import type { Movie } from "../types/movie";
import { useState, useCallback } from "react";
import { MovieGrid } from "./MovieGrid";
import Buttons from "../components/Buttons";
import { Link } from "react-router-dom";
import { useMoviePages } from "../utils/useMoviePages";

interface MovieRankingProps {
    movies: Movie[];
}

export function MovieRanking({ movies }: MovieRankingProps) {
    const [index, setIndex] = useState(0);
    const moviePages = useMoviePages();

    const currentMovies = movies.slice(index, index + moviePages);

    const handlePrev = useCallback(() => {
        setIndex(Math.max(0, index - moviePages));
    }, [index, moviePages]);

    const handleNext = useCallback(() => {
        setIndex(Math.min(movies.length - moviePages, index + moviePages));
    }, [index, movies.length, moviePages]);

    // -----------------------------------------------
    return (
        <div className="max-w-8xl mx-auto p-8 mt-15 relative">
            <div className="flex justify-between">
                <h1 className="text-xl font-bold mb-8 md:2xl lg:text-3xl">
                    Mubee HOT 랭킹
                </h1>
                <Link
                    to="/movies?category=popular"
                    className="text-sm md:2xl lg:text-3xl"
                >
                    더보기
                </Link>
            </div>

            <MovieGrid
                movies={currentMovies}
                renderBadge={(movie) => {
                    const overallRank =
                        movies.findIndex((m) => m.id === movie.id) + 1;

                    return (
                        <div className="absolute top-2 left-2 w-12 h-8 lg:w-14 lg:h-12 text-lg md:text-xl lg:text-2xl bg-black/70 rounded-xl shadow-2xl border-2 border-white/50 flex items-center justify-center font-bold text-amber-50 drop-shadow-xl z-10 gap-2">
                            {overallRank}
                        </div>
                    );
                }}
            />

            <div className="flex items-center justify-center mt-7 gap-5 ">
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
        </div>
    );
}
