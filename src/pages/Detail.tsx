import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import type { Movie } from "../types/movie";
import { fetchDetail } from "../api/tmdb";

export function Detail() {
    const { id } = useParams();
    const [movie, setMovie] = useState<Movie | null>(null);

    useEffect(() => {
        if (!id) return;
        fetchDetail(id).then((data) => setMovie(data));
    }, [id]);

    if (!movie) return <div>로딩중...</div>;

    return (
        <div className="relative">
            <img
                src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                className=""
            />
            <div className="absolute top-1/2 left-3 ">
                <h1 className="text-3xl text-amber-50">{movie.title}</h1>
                <p>{movie.release_date}</p>
                {/* <p>{movie.overview}</p> */}
            </div>
            <p>평점 {movie.vote_average.toFixed(1)}</p>
        </div>
    );
}

// 실행 흐름
// 1. 영화를 클릭하면 /movie/550 이동
// 2. useParams()로 id = "550" 추출
// 3. TMDB API /movie/550 호출
