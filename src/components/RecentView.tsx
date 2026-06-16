import type { Movie } from "@/types/movie";
import { MovieGrid } from "./MovieGrid";
import { useState, useCallback } from "react";
import Buttons from "../components/Buttons";
import { useMoviePages } from "../utils/useMoviePages";
import { useRecentViewStore } from "../store/recent";

export function RecentView({ movies }: { movies: Movie[] }) {
    const [index, setIndex] = useState(0);
    const moviePages = useMoviePages();
    const current = movies.slice(index, index + moviePages);
    const { clearRecentView } = useRecentViewStore();

    const handlePrev = useCallback(() => {
        setIndex(Math.max(0, index - moviePages));
    }, [index, moviePages]);

    const handleNext = useCallback(() => {
        setIndex(Math.min(movies.length - moviePages, index + moviePages));
    }, [index, movies.length, moviePages]);

    return (
        <div className="relative max-w-8xl mx-auto p-8 py-10">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold mb-8 md:2xl lg:text-3xl">
                    최근 본 영화
                </h2>
                <button
                    onClick={clearRecentView}
                    className="text-sm text-gray-400 hover:text-gray-600 transition"
                >
                    기록 삭제
                </button>
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
