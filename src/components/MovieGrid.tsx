import type { Movie } from "../types/movie";
import { Link } from "react-router-dom";
import { useRating } from "../utils/useRating";
import { getEngTitle } from "../utils/movieTitle";
import { useState, useEffect } from "react";

function MovieCard({
    movie,
    index,
    renderBadge,
    showRating,
    convertFive,
}: {
    movie: Movie;
    index: number;
    renderBadge?: (movie: Movie, index?: number) => React.ReactNode;
    showRating: boolean;
    convertFive: (n: number) => string;
}) {
    const [displayTitle, setDisplayTitle] = useState(movie.title);

    useEffect(() => {
        getEngTitle(movie).then(setDisplayTitle); // 여기서만 async 호출
    }, [movie.id]);

    return (
        <li className="relative w-48 group">
            <Link to={`/movie/${movie.id}`}>
                <img
                    src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                    className="w-full h-80 object-cover rounded mb-2 group-hover:scale-[1.02] transition-transform shadow-lg"
                    alt={displayTitle ?? movie.title}
                />
                <h3 className="font-bold text-sm truncate">
                    {displayTitle ?? (
                        <span className="block h-4 w-24 bg-gray-300 rounded animate-pulse" />
                    )}
                </h3>
                {renderBadge && renderBadge(movie, index)}
                {showRating && (
                    <p className="text-xs">
                        ⭐ {convertFive(movie.vote_average)}
                    </p>
                )}
            </Link>
        </li>
    );
}

interface MovieGridProps {
    movies: Movie[];
    renderBadge?: (movie: Movie, index?: number) => React.ReactNode;
    showRating?: boolean;
}

export function MovieGrid({
    movies,
    renderBadge,
    showRating = true,
}: MovieGridProps) {
    const { convertFive } = useRating();
    return (
        <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {movies.map((movie, index) => (
                <MovieCard
                    key={movie.id}
                    movie={movie}
                    index={index}
                    renderBadge={renderBadge}
                    showRating={showRating}
                    convertFive={convertFive}
                />
            ))}
        </ul>
    );
}
