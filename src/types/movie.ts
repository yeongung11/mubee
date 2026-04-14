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
    character: string;
    original_title: string;
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
    place_of_birth: string;
    birthday: string;
    character: string;
    original_title?: string;
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
    place_of_birth: string;
    birthday: string;
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

export interface WatchProvider {
    provider_id: number;
    provider_name: string;
    logo_path: string;
    display_priority: number;
}

export interface WatchProviderResult {
    link: string;
    flatrate?: WatchProvider[];
    rent?: WatchProvider[];
    buy?: WatchProvider[];
}

export interface Review {
    id: string;
    author: string;
    content: string;
    created_at: string;
    rating?: number;
}

export interface ReviewResult {
    id: number;
    page: number;
    results: Review[];
    total_pages: number;
    total_results: number;
}

export interface GenreType {
    id: number;
    name: string;
}

export interface GenreDetailParams {
    genreId: string;
}

export const GENRE_NAMES: Record<number, string> = {
    28: "액션",
    12: "모험",
    16: "애니메이션",
    35: "코미디",
    80: "범죄",
    18: "드라마",
    14: "판타지",
    27: "호러",
    10749: "로맨스",
    878: "SF",
    53: "스릴러",
    10752: "전쟁",
    37: "서부",
    9648: "미스터리",
    99: "다큐멘터리",
    10770: "TV 영화",
    10740: "로맨스 코미디",
    32: "액션 코미디",
    10768: "전쟁 다큐멘터리",
};

export interface movieTitle {
    id: number;
    title: string;

    poster_path: string;
}
