import { useParams } from "react-router-dom";
import { useEffect, useState, useCallback, useEffectEvent } from "react";
import type {
    Movie,
    MovieWithCredits,
    WatchProviderResult,
    Review,
} from "../types/movie";
import {
    fetchDetail,
    fetchWatchProvider,
    fetchReview,
    fetchSimilar,
    fetchByGenre,
    fetchRecommendations,
} from "../api/tmdb";
import { useRating } from "../utils/useRating";
import { useFavoritesStore } from "../store/favorite";
import { getEngTitle } from "../utils/movieTitle";
import { useMoviePages } from "../utils/useMoviePages";
import { DetailHeroBanner } from "../components/Detail/DetailHeroBanner";
import { DetailPosterRating } from "@/components/Detail/DetailPosterRating";
import { DetailStreamingPlatform } from "@/components/Detail/DetailStreamingPlatform";
import { DetailCast } from "@/components/Detail/DetailCast";
import { DetailSimilar } from "@/components/Detail/DetailSimilar";
import { DetailReviews } from "@/components/Detail/DetailReview";
import { DetailSkeleton } from "../components/Detail/DetailSkeleton";

export function Detail() {
    const { id } = useParams<{ id: string }>();
    const [reviews, setReviews] = useState<Review[]>([]);
    const [provider, setProvider] = useState<WatchProviderResult | null>(null);
    const [movie, setMovie] = useState<Movie | null>(null);
    const [userRating, setUserRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0); // hover
    const [castIdx, setCastIdx] = useState(0);
    const castPageSize = 10;
    const { convertFive } = useRating();
    const { isFavorite, toggleFavorite } = useFavoritesStore();
    const [sim, setSim] = useState<Movie[]>([]);
    const [simName, setSimName] = useState<
        "similar" | "recommendations" | "genre"
    >("similar");
    const simPageSize = useMoviePages(3, 4, 6);
    const [isWatching, setIsWatching] = useState(false);

    // 유사한 영화, 추천 영화, 장르 기반 추천 영화
    const movieId = movie?.id;
    const movieGenreId = movie?.genres?.[0]?.id;

    useEffect(() => {
        if (!movieId) return;

        const loadSimilar = async () => {
            // similar 호출
            const similarData = await fetchSimilar(movieId);
            let results = similarData.results.slice(0, 6);

            if (results.length > 0) {
                setSimName("similar");
            }

            // similar 없으면 recommendations 호출
            if (results.length === 0) {
                const recData = await fetchRecommendations(movieId); // tmdb.ts에 추가 필요
                results = recData.results.slice(0, 6);
                if (results.length > 0) {
                    setSimName("recommendations");
                }
            }

            // 같은 장르 영화 호출
            if (results.length === 0 && movieGenreId) {
                const genreData = await fetchByGenre(movieGenreId); // tmdb.ts에 추가 필요
                results = genreData.results.slice(0, 6);
                if (results.length > 0) {
                    setSimName("genre");
                }
            }

            const resolved = await Promise.all(
                results.map(async (m: Movie) => ({
                    ...m,
                    title: await getEngTitle(m),
                })),
            );
            setSim(resolved);
        };

        loadSimilar();
    }, [movieId, movieGenreId]);

    // 리뷰
    useEffect(() => {
        if (!movie?.id) return;
        fetchReview(movie.id).then((data) => {
            setReviews(data.results.slice(0, 3));
        });
    }, [movie?.id]);

    const loadRating = useEffectEvent(() => {
        if (movie?.id) {
            const saved = localStorage.getItem(`rating_${movie.id}`);
            setUserRating(saved ? parseInt(saved) : 0);
        }
    });

    useEffect(() => {
        loadRating();
    }, [movie?.id]);

    const setRating = (rating: number) => {
        if (!movie?.id) return;
        const newRating = userRating === rating ? 0 : rating;
        setUserRating(newRating);
        localStorage.setItem(`rating_${movie.id}`, newRating.toString());
    };

    useEffect(() => {
        if (!id) return;
        fetchDetail(id).then(async (data) => {
            const resolvedTitle = await getEngTitle(data);
            setMovie({ ...data, title: resolvedTitle });
        });
    }, [id]);

    // 스트리밍 플랫폼
    useEffect(() => {
        if (!movie?.id) return;
        fetchWatchProvider(movie.id).then(setProvider);
    }, [movie?.id]);

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
        setCastIdx(Math.max(0, castIdx - castPageSize));
    }, [castIdx, castPageSize]);

    const handleCastNext = useCallback(() => {
        const maxIndex =
            (movieWithCredits?.credits?.cast?.length || 0) - castPageSize;
        setCastIdx(Math.min(maxIndex, castIdx + castPageSize));
    }, [castIdx, castPageSize, movieWithCredits?.credits?.cast?.length]);

    // 로딩 스켈레톤 ui
    if (!movie) return <DetailSkeleton />;

    return (
        <div className="bg-[#f3f4f6] min-h-screen">
            <DetailHeroBanner movie={movie} />
            <DetailPosterRating
                movie={movie}
                userRating={userRating}
                hoverRating={hoverRating}
                setRating={setRating}
                setHoverRating={setHoverRating}
                isFavorite={isFavorite(movie.id)}
                toggleFavorite={() => toggleFavorite(movie)}
                isWatching={isWatching}
                setIsWatching={() => setIsWatching((prev) => !prev)}
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
