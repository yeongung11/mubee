import { useParams } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import type { Movie, MovieWithCredits } from "../types/movie";
import { fetchDetail } from "../api/tmdb";
import { useRating } from "../utils/useRating";

export function Detail() {
    const { id } = useParams();
    const [movie, setMovie] = useState<Movie | null>(null);
    const [userRating, setUserRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0); // hover
    const [castIdx, setCastIdx] = useState(0);
    const castPageSize = 15;
    const { convertFive } = useRating();

    useEffect(() => {
        if (movie?.id) {
            const saved = localStorage.getItem(`rating_${movie.id}`);
            setUserRating(saved ? parseInt(saved) : 0);
        }
    }, [movie?.id]);

    const setRating = (rating: number) => {
        const newRating = userRating === rating ? 0 : rating;
        setUserRating(newRating);
        localStorage.setItem(`rating_${movie.id}`, newRating.toString());
    };

    useEffect(() => {
        if (!id) return;
        fetchDetail(id).then((data) => setMovie(data));
    }, [id]);

    const movieWithCredits = movie ? (movie as MovieWithCredits) : null;
    const currentCasts =
        movieWithCredits?.credits?.cast?.slice(
            castIdx,
            castIdx + castPageSize,
        ) || [];

    const handleCastPrev = useCallback(() => {
        setCastIdx(Math.max(0, castIdx - castPageSize));
    }, [castIdx, castPageSize]);

    const handleCastNext = useCallback(() => {
        const maxIndex =
            (movieWithCredits?.credits?.cast?.length || 0) - castPageSize;
        setCastIdx(Math.min(maxIndex, castIdx + castPageSize));
    }, [castIdx, castPageSize, movieWithCredits?.credits?.cast?.length]);

    if (!movie) return <div>로딩중...</div>;

    return (
        <div className="relative">
            <img
                src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                className="w-full h-240 object-cover"
            />
            <div className="absolute top-150 left-3 ml-5">
                <h1 className="text-5xl text-amber-50">{movie.title}</h1>
                <p className="text-2xl text-amber-50 mt-7">
                    {movie.release_date
                        ? movie.release_date.split("-")[0]
                        : "미정"}{" "}
                    {" • "}
                    {movie.genres.slice(0, 3).map((genre) => (
                        <span key={genre.id} className="">
                            {genre.name}
                        </span>
                    ))}
                </p>
                <p className="text-2xl text-amber-50 mt-7">
                    {movie.production_countries?.[0]?.name || "기타"}
                </p>
                <p className="text-2xl text-amber-50 mt-7">
                    {movie.runtime}분{" • "}
                    {movie.adult ? (
                        <span>청소년 관람불가</span>
                    ) : (
                        <span>전체 이용가</span>
                    )}
                </p>
            </div>
            {/* 포스터 및 평점, 설명 */}
            <div className="px-6 mx-auto mt-10 mb-12 max-w-6xl">
                <div className="flex flex-col gap-6">
                    <div className="flex items-center justify-between">
                        {/* 포스터 */}
                        <img
                            src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                            className="w-44 h-64 object-cover rounded-xl shadow-2xl"
                        />
                        {/* 평점들 */}
                        <div className="flex items-center space-x-5 mr-50">
                            {/* 별점 */}
                            <div className="flex items-center space-x-2">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <svg
                                        key={star}
                                        className={`w-12 h-12 cursor-pointer transition-all hover:scale-110 ${
                                            hoverRating >= star ||
                                            userRating >= star
                                                ? "text-yellow-400 fill-current"
                                                : "text-gray-400"
                                        }`}
                                        onClick={() => setRating(star)}
                                        onMouseEnter={() =>
                                            setHoverRating(star)
                                        }
                                        onMouseLeave={() => setHoverRating(0)}
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                    >
                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                    </svg>
                                ))}
                            </div>
                            {/* 내 평점 */}

                            <p className="!text-3xl font-bold p-2 px-4 bg-gradient-to-r  text-black font-bold  text-lg min-w-[55px] text-center">
                                나의 평가 {userRating}.0
                            </p>

                            {/* 평균 */}
                            <div className="flex items-center gap-2">
                                <span className="text-3xl font-bold ">
                                    평균 {convertFive(movie.vote_average)}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* 2️⃣ 하단: 영화 내용 */}
                    <div className="pt-4 pb-8 border-t border-white/20">
                        {movie.overview ? (
                            <p>{movie.overview}</p>
                        ) : (
                            <p className="text-gray-500">
                                {movie.title}에 대한 상세 줄거리 정보가
                                없습니다. 감독{" "}
                                {movie.directors?.[0]?.name || "미상"}의{" "}
                                {movie.genres[0]?.name || ""} 장르 작품입니다.
                            </p>
                        )}
                    </div>
                </div>
            </div>
            {/* 출연제작 */}
            <div className="mt-16 mx-auto px-6 pb-20 ">
                <h2 className="text-3xl font-bold mb-8 pb-4 border-b border-white/30 text-left">
                    출연/제작
                </h2>

                {/* 그리드 */}
                <div className=" grid grid-cols-2  sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-8">
                    {currentCasts.map((actor, index) => (
                        <div
                            key={actor.id ?? index}
                            className="group flex items-center gap-3 p-3 bg-white/5 backdrop-blur-sm rounded-xl hover:bg-white/10 transition-all border border-white/10 hover:border-white/20 cursor-pointer"
                        >
                            <div className="flex-shrink-0 w-16 h-20 rounded-lg overflow-hidden shadow-md group-hover:scale-105 transition-transform">
                                {actor.profile_path ? (
                                    <img
                                        src={`https://image.tmdb.org/t/p/w92${actor.profile_path}`}
                                        alt={actor.name}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                                        <span className="text-xs text-gray-400 font-medium">
                                            No Image
                                        </span>
                                    </div>
                                )}
                            </div>
                            <div className="min-w-0 flex-1">
                                <p className="font-bold  text-sm truncate">
                                    {actor.name}
                                </p>
                                <p className="text-gray-400 text-xs line-clamp-2 leading-tight mt-3">
                                    출연 | {actor.character || "출연"}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="flex items-center justify-center gap-4">
                    <button
                        onClick={handleCastPrev}
                        disabled={castIdx === 0}
                        className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-bold shadow-lg transition-all disabled:opacity-50 min-w-[80px]"
                    >
                        이전
                    </button>

                    <button
                        onClick={handleCastNext}
                        disabled={
                            castIdx + castPageSize >=
                            (movieWithCredits?.credits?.cast?.length || 0)
                        }
                        className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-bold  transition-all disabled:opacity-50 min-w-[80px]"
                    >
                        다음
                    </button>
                </div>
            </div>
        </div>
    );
}

// 실행 흐름
// 1. 영화를 클릭하면 /movie/550 이동
// 2. useParams()로 id = "550" 추출
// 3. TMDB API /movie/550 호출
