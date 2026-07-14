import { useEffect, useState } from "react";
import { fetchSimilar, fetchRecommendations, fetchByGenre } from "../api/tmdb";
import { getEngTitle } from "../utils/movieTitle";
import type { Movie } from "../types/movie";

export function useMovieSimilar(
    movieId: number | undefined,
    movieGenreId: number | undefined,
) {
    const [sim, setSim] = useState<Movie[]>([]);
    const [simName, setSimName] = useState<
        "similar" | "recommendations" | "genre"
    >("similar");

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
    return { sim, simName };
}
