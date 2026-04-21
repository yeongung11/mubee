import type { Movie } from "@/types/movie";
import { MovieGrid } from "./MovieGrid";
import { useState, useCallback } from "react";
import Buttons from "../components/Buttons";
import { Link } from "react-router-dom";

export function NowPlaying({ movies }: { movies: Movie[] }) {
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
        <div className="relative max-w-8xl mx-auto p-8 py-10">
            <div className="flex justify-between">
                <h2 className="text-2xl font-bold mb-6"> 최신 개봉작</h2>
                <Link to="/movies?category=now_playing"> 더보기</Link>
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
