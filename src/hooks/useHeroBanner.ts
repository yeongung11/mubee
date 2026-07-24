import { useEffect, useState } from "react";
import { fetchHeroBanner, fetchMovieLogos } from "../api/tmdb";
import type { Movie } from "../types/movie";

const AUTO_SLIDE = 5000;

export function useHeroBanner() {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [index, setIndex] = useState(0);
    const [logoPath, setLogoPath] = useState<string | null>(null);
    const [isPaused, setIsPaused] = useState(false);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        if (movies.length === 0 || isPaused) return;

        const id = setInterval(() => {
            setProgress(0);
            setIndex((prevIndex) =>
                prevIndex === movies.length - 1 ? 0 : prevIndex + 1,
            );
        }, AUTO_SLIDE);

        return () => clearInterval(id);
    }, [movies.length, isPaused]);

    useEffect(() => {
        fetchHeroBanner().then((data) => {
            setMovies(data.results.slice(0, 5));
        });
    }, []);

    // 슬라이드 진행바
    useEffect(() => {
        if (isPaused) return;
        const start = Date.now();
        const id = setInterval(() => {
            const elapsed = Date.now() - start;
            setProgress(Math.min((elapsed / AUTO_SLIDE) * 100, 100));
        }, 50);
        return () => clearInterval(id);
    }, [index, isPaused]);

    useEffect(() => {
        if (!movies.length) return;
        fetchMovieLogos(movies[index].id).then(setLogoPath);
    }, [index, movies]);

    // 이전, 다음 버튼
    const handlePrev = () => {
        setProgress(0);
        setIndex(Math.max(0, index - 1));
    };
    const handleNext = () => {
        setProgress(0);
        setIndex(Math.min(movies.length - 1, index + 1));
    };

    return {
        movies,
        index,
        logoPath,
        isPaused,
        progress,
        setIsPaused,
        handlePrev,
        handleNext,
    };
}
