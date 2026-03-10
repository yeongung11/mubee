const BASE_URL = "https://api.themoviedb.org/3";
const TOKEN = import.meta.env.VITE_TMDB_TOKEN;

const options = {
    headers: {
        Authorization: `Bearer ${TOKEN}`,
    }, // fetch 요청할 때 항상 같이 보내는 헤더
}; // Bearer: 토큰 기반 인증 방식

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
    return res.json(); // JSON으로 변환
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
