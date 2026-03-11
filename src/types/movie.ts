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

// interface Country {
//     iso_3166_1: string;
//     name: string;
// }

export interface ExtendedMovie extends Movie {
    releaseDate: Date;
}
