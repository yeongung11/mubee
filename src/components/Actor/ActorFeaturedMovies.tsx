import type { Movie } from "@/types/movie";
import { useNavigate } from "react-router-dom";

type Props = {
    movies: Movie[];
};

export function ActorFeaturedMovies({ movies }: Props) {
    const navigate = useNavigate();

    return (
        <div className="flex-1 hidden lg:block">
            <div className="flex gap-12 overflow-x-auto justify-center">
                {movies.slice(0, 3).map((movie) => (
                    <div
                        key={movie.id}
                        className="min-w-45 cursor-pointer"
                        onClick={() => navigate(`/movie/${movie.id}`)}
                    >
                        <div className="w-65 h-95 overflow-hidden rounded-lg">
                            <img
                                src={`https://image.tmdb.org/t/p/w342${movie.poster_path}`}
                                alt={movie.title}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="mt-3">
                            <p>{movie.title}</p>
                            {movie.release_date ? (
                                <p className="text-sm text-gray-500">
                                    {movie.release_date?.slice(0, 4)}
                                </p>
                            ) : (
                                <p className="text-sm text-gray-500">미정</p>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
