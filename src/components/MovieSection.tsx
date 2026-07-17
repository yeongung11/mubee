import type { Movie } from "@/types/movie";
import { MovieGrid } from "./MovieGrid";
import { useState, useCallback } from "react";
import Buttons from "./Buttons";
import { Link } from "react-router-dom";
import { useMoviePages } from "../hooks/useMoviePages";

interface MovieSectionProps {
    movies: Movie[];
    title: string;
    moreLink: string;
}

export function MovieSection({ movies, title, moreLink }: MovieSectionProps) {
    const [index, setIndex] = useState(0);
    const moviePages = useMoviePages();
    const current = movies.slice(index, index + moviePages);

    const handlePrev = useCallback(() => {
        setIndex(Math.max(0, index - moviePages));
    }, [index, moviePages]);

    const handleNext = useCallback(() => {
        setIndex(Math.min(movies.length - moviePages, index + moviePages));
    }, [index, movies.length, moviePages]);

    return (
        <div className="relative max-w-8xl mx-auto p-8 py-10">
            <div className="flex justify-between">
                <h2 className="text-xl font-bold mb-8 md:2xl lg:text-3xl text-mubee-burgundy">
                    {title}
                </h2>
                <Link
                    to={moreLink}
                    className="text-sm md:2xl lg:text-3xl hover:text-mubee-burgundy"
                >
                    더보기
                </Link>
            </div>
            <MovieGrid movies={current} />
            {movies.length > moviePages && (
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
