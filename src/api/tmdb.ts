const BASE_URL = "https://api.themoviedb.org/3";
const TOKEN = import.meta.env.VITE_TMDB_TOKEN;
import type { Movie, MultiSearchItem, Actor } from "../types/movie";

const options = {
    headers: {
        Authorization: `Bearer ${TOKEN}`,
    },
};

export const fetchKoreanBoxOffice = async () => {
    const key = import.meta.env.VITE_KOBIS_KEY;
    const yesterday = new Date(Date.now() - 86400000);
    const targetDt = yesterday.toISOString().slice(0, 10).replace(/-/g, "");
    const res = await fetch(
        `http://kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?key=${key}&targetDt=${targetDt}`,
    );
    return res.json();
};

// 영화 순위
export const fetchPopularMovies = async () => {
    const res = await fetch(
        `${BASE_URL}/movie/popular?language=ko-KR`,
        options,
    );
    return res.json();
};

// 공개 예정 영화
export const fetchUpcomingMovies = async () => {
    const [page1, page2, page3] = await Promise.all([
        fetch(`${BASE_URL}/movie/upcoming?language=ko-KR&page=1`, options),
        fetch(`${BASE_URL}/movie/upcoming?language=ko-KR&page=2`, options),
        fetch(`${BASE_URL}/movie/upcoming?language=ko-KR&page=3`, options),
    ]);

    const [data1, data2, data3] = await Promise.all([
        page1.json(),
        page2.json(),
        page3.json(),
    ]);

    const allMovies = [
        ...data1.results,
        ...data2.results,
        ...data3.results,
    ].filter(
        (movie, idx, self) => idx === self.findIndex((m) => m.id === movie.id),
    );
    return { results: allMovies };
};

// 상세 페이지
export const fetchDetail = async (id: string) => {
    const res = await fetch(
        `${BASE_URL}/movie/${id}?language=ko-KR&append_to_response=credits`,
        options,
    );

    return res.json();
};

// 검색
export async function searchMovies(query: string): Promise<(Movie | Actor)[]> {
    const res = await fetch(
        `${BASE_URL}/search/multi?query=${encodeURIComponent(
            query,
        )}&language=ko-KR`,
        options,
    );
    const data: { results: MultiSearchItem[] } = await res.json();

    const movies = data.results
        .filter(
            (r): r is MultiSearchItem & { media_type: "movie" } =>
                r.media_type === "movie",
        )
        .slice(0, 2)
        .map<Movie>((item) => ({
            id: item.id,
            title: item.title,
            poster_path: item.poster_path || "",
            vote_average: item.vote_average || 0,
            release_date: item.release_date || "",
            overview: "",
            vote_count: 0,
            popularity: 0,
            genre_ids: [],
            runtime: 0,
            genres: [],
            adult: false,
            directors: [],
            character: item.character,
        }));

    const actors = data.results
        .filter(
            (r): r is MultiSearchItem & { media_type: "person" } =>
                r.media_type === "person",
        )
        .slice(0, 2)

        .map<Actor>((item) => ({
            id: item.id,
            name: item.name,
            profile_path: item.poster_path || "",
            known_for_department: "Acting",
            biography: "",
            place_of_birth: item.place_of_birth || "",
            birthday: item.birthday || "",
        }));

    return [...movies, ...actors];
}

// 배우 출연작
export const fetchActorMovies = async (actorId: number) => {
    const res = await fetch(
        `${BASE_URL}/person/${actorId}/movie_credits?language=ko-KR`,
        options,
    );
    const data = await res.json();
    return data.cast;
};

// 배우 상세 정보
export const fetchActorDetail = async (actorId: number) => {
    const res = await fetch(
        `${BASE_URL}/person/${actorId}?language=ko-KR`,
        options,
    );
    return res.json();
};
