import { useNavigate } from "react-router-dom";
import type { Movie } from "../../types/movie";

type SimName = "similar" | "recommendations" | "genre";

interface Props {
    sim: Movie[];
    simName: SimName;
    simPageSize: number;
    movieTitle: string;
}

export function DetailSimilar({
    sim,
    simName,
    simPageSize,
    movieTitle,
}: Props) {
    const navigate = useNavigate();

    if (sim.length === 0) return null;

    return (
        <section className="py-16 bg-gray-50">
            <div className="px-6 max-w-8xl mx-auto mb-10">
                <h2 className="text-xl md:text-2xl lg:text-3xl font-bold mb-8 pb-4 border-b border-white/30 text-left">
                    {simName === "similar" && `"${movieTitle}"와 유사한 영화`}
                    {simName === "recommendations" &&
                        `"${movieTitle}"의 추천 영화`}
                    {simName === "genre" &&
                        `"${movieTitle}"의 장르 기반 추천 영화`}
                </h2>
                <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-8">
                    {sim.slice(0, simPageSize).map((movie) => (
                        <div
                            key={movie.id}
                            onClick={() => navigate(`/movie/${movie.id}`)}
                            className="cursor-pointer transition-all duration-300"
                        >
                            {movie.poster_path ? (
                                <img
                                    src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                                    alt={movie.title}
                                    className="w-full h-full rounded-xl shadow-lg"
                                />
                            ) : (
                                <div className="w-full h-full rounded shrink-0 bg-linear-to-br from-gray-800 to-gray-900 flex items-center justify-center text-center">
                                    <span className="text-gray-400 text-xl font-medium">
                                        No Image
                                    </span>
                                </div>
                            )}

                            <p className="text-sm font-semibold mt-2 line-clamp-1">
                                {movie.title}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
