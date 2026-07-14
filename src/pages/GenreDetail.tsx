import { fetchMovieGenre } from "@/api/tmdb";
import { useInfiScrolls } from "@/utils/useInfiScrolls";
import { useParams } from "react-router-dom";
import { GENRE_NAMES } from "@/types/movie";
import { MovieGrid } from "../components/MovieGrid";
import { MovieGridSkeleton } from "../components/Skeleton";

export default function GenreDetail() {
    const { genreId } = useParams();
    const genreName = genreId ? GENRE_NAMES[Number(genreId)] || "영화" : "장르";
    const { movies, loading, sentinelRef } = useInfiScrolls(
        genreId ? Number(genreId) : null,
        fetchMovieGenre,
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
                <MovieGridSkeleton count={10} />
            ) : (
                <MovieGrid movies={movies} />
            )}
            {loading && movies.length > 0 && (
                <div className="mt-10">
                    <MovieGridSkeleton count={5} />
                </div>
            )}
            <div ref={sentinelRef} className="h-20" />
        </div>
    );
}
