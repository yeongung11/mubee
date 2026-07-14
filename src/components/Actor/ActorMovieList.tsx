import type { Movie } from "@/types/movie";
import { useNavigate } from "react-router-dom";
import { useRating } from "@/utils/useRating";

type Props = {
    sortedMovies: Movie[];
    moreMovie: number;
    setMoreMovie: React.Dispatch<React.SetStateAction<number>>;
};

export function ActorMovieList({
    sortedMovies,
    moreMovie,
    setMoreMovie,
}: Props) {
    const navigate = useNavigate();
    const { convertFive } = useRating();

    return (
        <section>
            <h1 className="text-2xl mb-8">출연작</h1>

            <div className="hidden lg:grid lg:grid-cols-[2fr_1fr_1fr] text-gray-700 text-sm mb-4 px-2">
                <span>제목</span>
                <span>역할</span>
                <span>평가</span>
            </div>
            <div className="w-full h-px bg-gray-300 mb-4" />

            {sortedMovies.slice(0, moreMovie).map((movie) => {
                const year = movie.release_date
                    ? movie.release_date.split("-")[0]
                    : "미정";

                return (
                    <div key={movie.id}>
                        {/* 모바일: (포스터 | 정보) / 데스크탑: 기존 grid */}
                        <div className="flex items-center gap-4 mb-4 px-2 lg:grid lg:grid-cols-[2fr_1fr_1fr]">
                            {/* 포스터 */}
                            <div
                                className="flex items-center gap-4 shrink-0"
                                onClick={() => navigate(`/movie/${movie.id}`)}
                            >
                                {movie.poster_path ? (
                                    <img
                                        src={`https://image.tmdb.org/t/p/w185${movie.poster_path}`}
                                        alt={movie.title}
                                        className="w-20 h-28 lg:w-36 lg:h-48 cursor-pointer rounded"
                                    />
                                ) : (
                                    <div className="w-20 h-28 lg:w-36 lg:h-48 rounded-xl bg-linear-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                                        <span className="text-gray-200 text-xs font-medium">
                                            No Image
                                        </span>
                                    </div>
                                )}
                                {/* 데스크탑 제목 포스터 옆에 표시 */}
                                <div className="hidden lg:block">
                                    <span className="text-sm text-gray-700">
                                        {year}
                                    </span>
                                    <p className="mt-1">{movie.title}</p>
                                </div>
                            </div>

                            {/* 모바일 오른쪽 3열 정보 */}
                            <div className="flex flex-col gap-2 flex-1 lg:hidden">
                                <p className="font-semibold text-sm line-clamp-2">
                                    {movie.title}
                                </p>
                                <p className="text-xs text-gray-500">{year}</p>
                                <p className="text-xs text-yellow-600">
                                    ⭐ {convertFive(movie.vote_average)}
                                </p>
                            </div>

                            {/* 데스크탑 역할 */}
                            <p className="hidden lg:block text-gray-700">
                                {movie.character}
                            </p>

                            {/* 데스크탑 별점 */}
                            <p className="hidden lg:block text-yellow-700">
                                ⭐ {convertFive(movie.vote_average)}
                            </p>
                        </div>

                        <div className="w-full h-px bg-gray-300 mb-4" />
                    </div>
                );
            })}
            {moreMovie < sortedMovies.length && (
                <button
                    onClick={() => setMoreMovie((prev) => prev + 10)}
                    className="w-full py-3 mt-2 mb-10 text-sm text-gray-500 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
                >
                    더보기
                </button>
            )}
        </section>
    );
}
