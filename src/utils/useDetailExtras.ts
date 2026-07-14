import { useEffect, useState } from "react";
import { fetchTrailer, fetchReview, fetchWatchProvider } from "@/api/tmdb";
import type { Review, WatchProviderResult } from "@/types/movie";

export function useDetailExtras(movieId: number | undefined) {
    const [trailerKey, setTrailerKey] = useState<string | null>(null);
    const [reviews, setReviews] = useState<Review[]>([]);
    const [provider, setProvider] = useState<WatchProviderResult | null>(null);
    const [userRating, setUserRating] = useState(0);
    const [isWatching, setIsWatching] = useState(false);

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

    useEffect(() => {
        if (!movieId) return;
        const saved = localStorage.getItem(`rating_${movieId}`);
        setUserRating(saved ? parseInt(saved) : 0);
    }, [movieId]);

    useEffect(() => {
        if (!movieId) return;
        const saved = localStorage.getItem(`watching_${movieId}`);
        setIsWatching(saved === "true");
    }, [movieId]);

    const setRating = (rating: number) => {
        if (!movieId) return;
        const newRating = userRating === rating ? 0 : rating;
        setUserRating(newRating);
        localStorage.setItem(`rating_${movieId}`, newRating.toString());
    };

    const toggleWatching = () => {
        if (!movieId) return;
        const next = !isWatching;
        setIsWatching(next);
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
