import { useParams } from "react-router-dom";
import { useCallback, useState } from "react";
import { convertFive } from "../utils/rating";
import { useFavoritesStore } from "../store/favorite";
import { useMoviePages } from "../hooks/useMoviePages";
import { DetailHeroBanner } from "../components/Detail/DetailHeroBanner";
import { DetailPosterRating } from "@/components/Detail/DetailPosterRating";
import { DetailStreamingPlatform } from "@/components/Detail/DetailStreamingPlatform";
import { DetailCast } from "@/components/Detail/DetailCast";
import { DetailSimilar } from "@/components/Detail/DetailSimilar";
import { DetailReviews } from "@/components/Detail/DetailReview";
import { DetailSkeleton } from "../components/Detail/DetailSkeleton";
import { DetailTrailer } from "@/components/Detail/DetailTrailer";
import { useMovieDetail } from "../hooks/useMovieDetail";
import { useMovieSimilar } from "@/hooks/useMovieSimilar";
import { useDetailExtras } from "@/hooks/useDetailExtras";
import type { MovieWithCredits } from "../types/movie";

const castPageSize = 10;

export function Detail() {
    const { id } = useParams<{ id: string }>();

    const [hoverRating, setHoverRating] = useState(0); // hover
    const [castIdx, setCastIdx] = useState(0);

    const { isFavorite, toggleFavorite } = useFavoritesStore();
    const simPageSize = useMoviePages(3, 4, 6);
    const { movie } = useMovieDetail(id);
    const { sim, simName } = useMovieSimilar(movie?.id, movie?.genres?.[0]?.id);
    const {
        trailerKey,
        reviews,
        provider,
        userRating,
        setRating,
        isWatching,
        toggleWatching,
    } = useDetailExtras(movie?.id);

    // 감독/출연
    const movieWithCredits = movie ? (movie as MovieWithCredits) : null;
    const director = movieWithCredits?.credits?.crew?.find(
        (person) =>
            person.job === "Director" || person.department === "Directing",
    );
    const displayPeople = director
        ? [director, ...(movieWithCredits?.credits?.cast || [])]
        : movieWithCredits?.credits?.cast || [];

    const currentCasts = displayPeople.slice(castIdx, castIdx + castPageSize);

    const handleCastPrev = useCallback(() => {
        setCastIdx((prev) => Math.max(0, prev - castPageSize));
    }, []);

    const handleCastNext = useCallback(() => {
        const castLength = movieWithCredits?.credits?.cast?.length ?? 0;

        const maxIndex = Math.max(0, castLength - castPageSize);

        setCastIdx((prev) => Math.min(maxIndex, prev + castPageSize));
    }, [movieWithCredits?.credits?.cast?.length]);

    // 로딩 스켈레톤 ui
    if (!movie) return <DetailSkeleton />;

    return (
        <div className="bg-[#f3f4f6] min-h-screen">
            <DetailHeroBanner movie={movie} />
            {trailerKey && <DetailTrailer trailerKey={trailerKey} />}
            <DetailPosterRating
                movie={movie}
                userRating={userRating}
                hoverRating={hoverRating}
                setRating={setRating}
                setHoverRating={setHoverRating}
                isFavorite={isFavorite(movie.id)}
                toggleFavorite={() => toggleFavorite(movie)}
                isWatching={isWatching}
                setIsWatching={toggleWatching}
                convertFive={convertFive}
            />
            <DetailStreamingPlatform provider={provider} />
            <DetailCast
                currentCasts={currentCasts}
                castIdx={castIdx}
                handleCastPrev={handleCastPrev}
                handleCastNext={handleCastNext}
                totalCastLength={movieWithCredits?.credits?.cast?.length || 0}
                castPageSize={castPageSize}
            />
            <DetailSimilar
                sim={sim}
                simName={simName}
                simPageSize={simPageSize}
                movieTitle={movie.title}
            />
            <DetailReviews reviews={reviews} />
        </div>
    );
}
