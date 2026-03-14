export interface Movie {
    id: number;
    title: string;
    poster_path: string;
    vote_average: number;
    backdrop_path?: string;
    vote_count: number;
    overview: string;
    release_date: string;
    popularity: number;
    genre_ids: number[];
    runtime?: number;
    genres: Genre[];
    adult: boolean;
    directors: Array<{
        name: string;
    }>;
    production_countries?: Array<{
        iso_3166_1: string;
        name: string;
    }>;
}

export interface MovieWithCredits extends Movie {
    credits?: {
        cast: Array<{
            id: number;
            name: string;
            character: string;
            profile_path: string | null;
            known_for_department: string;
        }>;
        crew: Array<{
            id: number;
            name: string;
            job: string;
            profile_path: string;
        }>;
    };
}

interface Genre {
    id: number;
    name: string;
}

export interface MultiSearchItem {
    id: number;
    name: string;
    title: string;
    media_type: "movie" | "tv" | "person";
    poster_path?: string | null;
    profile_path?: string | null;
    vote_average?: number;
    release_date?: string;
}

export interface MultiSearchResult {
    id: number;
    title: string;
    media_type: "movie" | "tv" | "person";
    poster_path?: string | null;
    profile_path?: string | null;
}

export interface ExtendedMovie extends Movie {
    releaseDate: Date;
}

export interface Actor {
    id: number;
    name: string;
    profile_path?: string | null;
    known_for_department: string;
    biography?: string;
}

export interface Credits {
    cast: Actor[];
}

// store/favorite.ts
export interface FavoriteStore {
    favorites: Movie[];
    addFavorite: (movie: Movie) => void;
    removeFavorite: (movieId: number) => void;
    isFavorite: (movieId: number) => boolean;
    toggleFavorite: (movie: Movie) => void;
}
