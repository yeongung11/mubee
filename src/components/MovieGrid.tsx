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
    const [noImage, setNoImage] = useState(false);

    useEffect(() => {
        setDisplayTitle(movie.title);
        getEngTitle(movie).then(setDisplayTitle); // 여기서만 async 호출
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [movie.id]);

    return (
        <li className="relative group">
            <Link to={`/movie/${movie.id}`}>
                {!noImage && movie.poster_path ? (
                    <>
                        <div className="relative mb-2">
                            <img
                                src={`https://image.tmdb.org/t/p/w342${movie.poster_path}`}
                                className="w-full aspect-2/3 object-cover rounded shadow-lg"
                                alt={displayTitle ?? movie.title}
                                onError={() => setNoImage(true)}
                            />
                            <div className="absolute inset-0  rounded bg-black/0 group-hover:bg-black/50 transition-all duration-300 flex flex-col items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                                <span className="text-white font-bold text-sm text-center px-2 leading-snug">
                                    {displayTitle ?? movie.title}
                                </span>
                                <span className="text-mubee-burgundy font-bold text-sm">
                                    ⭐ {convertFive(movie.vote_average)}
                                </span>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="w-full aspect-2/3 rounded mb-2 bg-gray-800 flex items-center justify-center">
                        <span className="text-gray-500 text-sm">No Image</span>
                    </div>
                )}

                <h3 className="font-bold text-sm md:text-lg lg:text-xl truncate">
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
        <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4 lg:gap-6">
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
