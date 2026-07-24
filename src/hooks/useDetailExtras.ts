import { useEffect, useState } from "react";
import { fetchTrailer, fetchReview, fetchWatchProvider } from "@/api/tmdb";
import type { Review, WatchProviderResult } from "@/types/movie";

function getStoredRating(movieId: number) {
    const saved = localStorage.getItem(`rating_${movieId}`);
    if (!saved) return 0;

    const rating = Number(saved);
    return Number.isFinite(rating) ? rating : 0;
}

function getStoredWatching(movieId: number) {
    return localStorage.getItem(`watching_${movieId}`) === "true";
}

export function useDetailExtras(movieId: number | undefined) {
    const [trailerKey, setTrailerKey] = useState<string | null>(null);
    const [reviews, setReviews] = useState<Review[]>([]);
    const [provider, setProvider] = useState<WatchProviderResult | null>(null);
    const [ratingsByMovie, setRatingsByMovie] = useState<
        Record<number, number>
    >({});
    const [watchingByMovie, setWatchingByMovie] = useState<
        Record<number, boolean>
    >({});

    useEffect(() => {
        if (!movieId) return;
        fetchTrailer(movieId).then(setTrailerKey);
    }, [movieId]);

    useEffect(() => {
        if (!movieId) return;
        fetchReview(movieId).then((data) => {
            setReviews(data.results.slice(0, 3));
        });
    }, [movieId]);

    useEffect(() => {
        if (!movieId) return;
        fetchWatchProvider(movieId).then(setProvider);
    }, [movieId]);

    const userRating = movieId
        ? ratingsByMovie[movieId] ?? getStoredRating(movieId)
        : 0;

    const isWatching = movieId
        ? watchingByMovie[movieId] ?? getStoredWatching(movieId)
        : false;

    const setRating = (rating: number) => {
        if (!movieId) return;

        const newRating = userRating === rating ? 0 : rating;

        setRatingsByMovie((prev) => ({
            ...prev,
            [movieId]: newRating,
        }));
        localStorage.setItem(`rating_${movieId}`, String(newRating));
    };

    const toggleWatching = () => {
        if (!movieId) return;
        const next = !isWatching;

        setWatchingByMovie((prev) => ({
            ...prev,
            [movieId]: next,
        }));
        localStorage.setItem(`watching_${movieId}`, String(next));
    };

    return {
        trailerKey,
        reviews,
        provider,
        userRating,
        setRating,
        isWatching,
        toggleWatching,
    };
}
