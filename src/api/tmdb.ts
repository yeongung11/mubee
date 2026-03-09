const BASE_URL = "https://api.themoviedb.org/3";
const TOKEN = import.meta.env.VITE_TMDB_TOKEN;

const options = {
    headers: {
        Authorization: `Bearer ${TOKEN}`,
    }, // fetch 요청할 때 항상 같이 보내는 헤더
}; // Bearer: 토큰 기반 인증 방식

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
    const res = await fetch(
        `${BASE_URL}/movie/upcoming?language=ko-KR`,
        options,
    );
    return res.json();
};
