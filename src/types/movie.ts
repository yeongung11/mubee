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
}

export interface ExtendedMovie extends Movie {
    releaseDate: Date;
}
