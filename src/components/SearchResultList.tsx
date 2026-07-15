import { Link } from "react-router-dom";
import type { Movie, Actor } from "../types/movie";

interface SearchResultListProps {
    results: (Movie | Actor)[];
    position?: "top" | "bottom";
    onSelect?: () => void;
}

export function SearchResultList({
    results,
    position = "top",
    onSelect,
}: SearchResultListProps) {
    const positionClass =
        position === "top"
            ? "absolute top-full mt-1"
            : "absolute bottom-full mb-1";
    return (
        <div
            className={`${positionClass} left-0 w-full bg-white/90 backdrop-blur-sm rounded-xl shadow-2xl max-h-96 overflow-auto z-50 border`}
        >
            {results.map((result) => {
                const isMovie = "poster_path" in result;
                const title = isMovie
                    ? (result as Movie).title
                    : (result as Actor).name;
                const imagePath = isMovie
                    ? (result as Movie).poster_path || ""
                    : (result as Actor).profile_path || "";
                return (
                    <Link
                        to={
                            isMovie
                                ? `/movie/${result.id}`
                                : `/actor/${result.id}`
                        }
                        key={result.id}
                        className="flex gap-3 p-3 hover:bg-gray-100 rounded-lg transition-colors"
                        onClick={onSelect}
                    >
                        {imagePath ? (
                            <img
                                src={`https://image.tmdb.org/t/p/w92${imagePath}`}
                                className="w-12 h-16 object-cover rounded shrink-0 bg-gray-200"
                                alt={title}
                            />
                        ) : (
                            <div className="w-12 h-16 rounded shrink-0 bg-linear-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                                <span className="text-gray-400 text-xs font-medium">
                                    No Image
                                </span>
                            </div>
                        )}
                        <div className="min-w-0 flex-1">
                            <p className="font-medium text-sm truncate text-black">
                                {title}
                            </p>
                            {isMovie && (
                                <p className="text-xs text-gray-500">
                                    {(result as Movie).release_date?.slice(
                                        0,
                                        4,
                                    )}
                                </p>
                            )}
                        </div>
                    </Link>
                );
            })}
        </div>
    );
}
