import { fetchMovieGenre } from "@/api/tmdb";
import { useInfiScrolls } from "@/utils/useInfiScrolls";
import { useParams } from "react-router-dom";
import { GENRE_NAMES } from "@/types/movie";
import { MovieGrid } from "../components/MovieGrid";

export default function GenreDetail() {
    const { genreId } = useParams();
    const genreName = genreId ? GENRE_NAMES[Number(genreId)] || "영화" : "장르";
    const { movies, loading, sentinelRef } = useInfiScrolls(
        genreId ? Number(genreId) : null,
        fetchMovieGenre,
    );

    const renderSkeletonCards = (count: number) => (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 lg:gap-8 animate-pulse">
            {Array.from({ length: count }).map((_, i) => (
                <div key={i}>
                    <div className="w-full h-72 lg:h-80 bg-gray-300 rounded-2xl" />
                    <div className="p-4 mt-3">
                        <div className="h-5 bg-gray-300 rounded w-3/4 mb-2" />
                        <div className="h-4 bg-gray-300 rounded w-1/2" />
                    </div>
                </div>
            ))}
        </div>
    );

    return (
        <div className="max-w-7xl mx-auto px-10 py-10 mt-16 min-h-screen">
            {/* 헤더 */}
            <div className="text-center mb-16">
                <h1 className="text-3xl lg:text-5xl font-bold text-gray-800 mb-8 drop-shadow-lg">
                    {genreName}
                </h1>
                {movies.length > 0 ? (
                    <p className="text-xl lg:text-2xl font-semibold text-gray-700">
                        총{" "}
                        <span className="text-mubee-burgundy font-bold">
                            {movies.length}+
                        </span>
                        개의 영화
                    </p>
                ) : loading ? (
                    <div className="flex justify-center">
                        <div className="h-8 w-36 bg-gray-300 rounded-lg animate-pulse" />
                    </div>
                ) : null}
            </div>
            {movies.length === 0 && loading ? (
                renderSkeletonCards(10)
            ) : (
                <MovieGrid movies={movies} />
            )}

            {/* 추가 로딩 */}
            {loading && movies.length > 0 && (
                <div className="mt-10">{renderSkeletonCards(5)}</div>
            )}

            <div ref={sentinelRef} className="h-20" />
        </div>
    );
}
