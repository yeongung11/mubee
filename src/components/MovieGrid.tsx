import type { Movie } from "../types/movie";
import { Link } from "react-router-dom";
import { useRating } from "../utils/useRating";

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
                <li key={movie.id} className="relative w-48 group">
                    <Link to={`/movie/${movie.id}`}>
                        <img
                            src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                            className="w-full h-80 object-cover rounded mb-2 group-hover:scale-[1.02] transition-transform shadow-lg"
                            alt={movie.title}
                        />
                        <h3 className="font-bold text-sm truncate">
                            {movie.title}
                        </h3>
                        {renderBadge && renderBadge(movie, index)}
                        {showRating && (
                            <p className="text-xs ">
                                ⭐ {convertFive(movie.vote_average)}
                            </p>
                        )}
                    </Link>
                </li>
            ))}
        </ul>
    );
}
