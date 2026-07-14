import { useEffect, useState } from "react";
import { fetchDetail } from "../api/tmdb";
import { getEngTitle } from "../utils/movieTitle";
import { useRecentViewStore } from "../store/recent";
import type { Movie } from "../types/movie";

export function useMovieDetail(id: string | undefined) {
    const [movie, setMovie] = useState<Movie | null>(null);
    const { addRecentView } = useRecentViewStore();

    useEffect(() => {
        if (!id) return;
        fetchDetail(id).then(async (data) => {
            const resolvedTitle = await getEngTitle(data);
            const resolvedMovie = { ...data, title: resolvedTitle };
            setMovie(resolvedMovie);
            addRecentView(resolvedMovie);
        });
    }, [id, addRecentView]);
    return { movie };
}
