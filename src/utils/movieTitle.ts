import type { Movie } from "../types/movie";
import { fetchActorDetailEnglish, fetchMovieEnglish } from "../api/tmdb";

export async function getEngTitle(movie: Movie): Promise<string> {
    const { title, original_title } = movie;
    if (/[\uAC00-\uD7A3]/.test(title)) return title;
    if (/^[A-Za-z0-9\s\W]+$/.test(original_title)) return original_title;
    try {
        const data = await fetchMovieEnglish(movie.id);
        return data.title || original_title;
    } catch {
        return original_title;
    }
}

export async function getEngName(
    actorId: number,
    name: string,
): Promise<string> {
    if (!/[\u0400-\u04FF\u0600-\u06FF\u3040-\u30FF\u4E00-\u9FFF]/.test(name))
        return name;
    try {
        const data = await fetchActorDetailEnglish(actorId);
        return data.name || name;
    } catch {
        return name;
    }
}
