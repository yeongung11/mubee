import type { Movie } from "@/types/movie";
import { MovieGrid } from "./MovieGrid";
import { useState, useCallback } from "react";
import Buttons from "../components/Buttons";
import { Link } from "react-router-dom";

export function TopRate({ movies }: { movies: Movie[] }) {
    const [index, setIndex] = useState(0);
    const moviePages = 5;
    const current = movies.slice(index, index + moviePages);

    const handlePrev = useCallback(() => {
        setIndex(Math.max(0, index - moviePages));
    }, [index, moviePages]);

    const handleNext = useCallback(() => {
        setIndex(Math.min(movies.length - moviePages, index + moviePages));
    }, [index, movies.length, moviePages]);

    return (
        <div className="relative max-w-6xl mx-auto p-8 py-10">
            <h2 className="text-2xl font-bold mb-6">평점 높은 작품</h2>
            <Link to="/movies?category=top_rated">더보기</Link>
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
