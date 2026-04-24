import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState, useCallback, useEffectEvent } from "react";
import type {
    Movie,
    MovieWithCredits,
    WatchProviderResult,
    Review,
} from "../types/movie";
import {
    fetchDetail,
    fetchWatchProvider,
    fetchReview,
    fetchSimilar,
    fetchByGenre,
    fetchRecommendations,
} from "../api/tmdb";
import { useRating } from "../utils/useRating";
import { useFavoritesStore } from "../store/favorite";
import { getEngTitle } from "../utils/movieTitle";

export function Detail() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [reviews, setReviews] = useState<Review[]>([]);
    const [provider, setProvider] = useState<WatchProviderResult | null>(null);
    const [movie, setMovie] = useState<Movie | null>(null);
    const [userRating, setUserRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0); // hover
    const [castIdx, setCastIdx] = useState(0);
    const castPageSize = 15;
    const { convertFive } = useRating();
    const { isFavorite, toggleFavorite } = useFavoritesStore();
    const [sim, setSim] = useState<Movie[]>([]);
    const [simName, setSimName] = useState<
        "similar" | "recommendations" | "genre"
    >("similar");

    // 유사한 영화, 추천 영화, 장르 기반 추천 영화
    useEffect(() => {
        if (!id) return;

        const loadSimilar = async () => {
            // similar 호출
            const similarData = await fetchSimilar(Number(id));
            let results = similarData.results.slice(0, 6);

            if (results.length > 0) {
                setSimName("similar");
            }

            // similar 없으면 recommendations 호출
            if (results.length === 0) {
                const recData = await fetchRecommendations(Number(id)); // tmdb.ts에 추가 필요
                results = recData.results.slice(0, 6);
                if (results.length > 0) {
                    setSimName("recommendations");
                }
            }

            // 같은 장르 영화 호출
            if (results.length === 0 && movie?.genres?.[0]?.id) {
                const genreData = await fetchByGenre(movie.genres[0].id); // tmdb.ts에 추가 필요
                results = genreData.results.slice(0, 6);
                if (results.length > 0) {
                    setSimName("genre");
                }
            }

            const resolved = await Promise.all(
                results.map(async (m: Movie) => ({
                    ...m,
                    title: await getEngTitle(m),
                })),
            );
            setSim(resolved);
        };

        loadSimilar();
    }, [id, movie?.genres]);

    // 리뷰
    useEffect(() => {
        if (!movie?.id) return;
        fetchReview(movie.id).then((data) => {
            setReviews(data.results.slice(0, 3));
        });
    }, [movie?.id]);

    const loadRating = useEffectEvent(() => {
        if (movie?.id) {
            const saved = localStorage.getItem(`rating_${movie.id}`);
            setUserRating(saved ? parseInt(saved) : 0);
        }
    });

    useEffect(() => {
        loadRating();
    }, [movie?.id]);

    const setRating = (rating: number) => {
        if (!movie?.id) return;
        const newRating = userRating === rating ? 0 : rating;
        setUserRating(newRating);
        localStorage.setItem(`rating_${movie.id}`, newRating.toString());
    };

    useEffect(() => {
        if (!id) return;
        fetchDetail(id).then(async (data) => {
            const resolvedTitle = await getEngTitle(data);
            setMovie({ ...data, title: resolvedTitle });
        });
    }, [id]);

    // 스트리밍 플랫폼
    useEffect(() => {
        if (!movie?.id) return;
        fetchWatchProvider(movie.id).then(setProvider);
    }, [movie?.id]);

    // 감독/출연
    const movieWithCredits = movie ? (movie as MovieWithCredits) : null;
    const director = movieWithCredits?.credits?.crew?.find(
        (person) =>
            person.job === "Director" || person.department === "Directing",
    );
    const displayPeople = director
        ? [director, ...(movieWithCredits?.credits?.cast || [])]
        : movieWithCredits?.credits?.cast || [];

    const currentCasts = displayPeople.slice(castIdx, castIdx + castPageSize);

    const handleCastPrev = useCallback(() => {
        setCastIdx(Math.max(0, castIdx - castPageSize));
    }, [castIdx, castPageSize]);

    const handleCastNext = useCallback(() => {
        const maxIndex =
            (movieWithCredits?.credits?.cast?.length || 0) - castPageSize;
        setCastIdx(Math.min(maxIndex, castIdx + castPageSize));
    }, [castIdx, castPageSize, movieWithCredits?.credits?.cast?.length]);

    // 로딩 스켈레톤 ui
    if (!movie)
        return (
            <div className="animate-pulse relative">
                {/* 백드롭 이미지 */}
                <div className="w-full h-240 bg-gray-300" />

                {/* 제목/장르/국가/러닝타임 */}
                <div className="absolute top-150 left-3 ml-5 flex flex-col gap-5">
                    <div className="h-10 bg-gray-300 rounded w-80" />{" "}
                    {/* 제목 */}
                    <div className="h-6 bg-gray-300 rounded w-60" />{" "}
                    {/* 장르 */}
                    <div className="h-6 bg-gray-300 rounded w-40" />{" "}
                    {/* 국가 */}
                    <div className="h-6 bg-gray-300 rounded w-48" />{" "}
                    {/* 러닝타임 */}
                </div>

                {/* 포스터 + 평점 영역 */}
                <div className="px-6 mx-auto mt-10 mb-12 max-w-6xl">
                    <div className="flex flex-col gap-6">
                        <div className="flex items-center justify-between">
                            {/* 포스터 */}
                            <div className="w-44 h-64 bg-gray-300 rounded-xl" />

                            {/* 평점들 */}
                            <div className="flex items-center space-x-5 mr-50">
                                {/* 별 5개 */}
                                <div className="flex space-x-2">
                                    {Array.from({ length: 5 }).map((_, i) => (
                                        <div
                                            key={i}
                                            className="w-12 h-12 bg-gray-300 rounded-full"
                                        />
                                    ))}
                                </div>
                                <div className="h-8 bg-gray-300 rounded w-28" />{" "}
                                {/* 나의 평가 */}
                                <div className="h-8 bg-gray-300 rounded w-24" />{" "}
                                {/* 평균 */}
                                <div className="w-10 h-10 bg-gray-300 rounded-full" />{" "}
                                {/* 좋아요 */}
                            </div>
                        </div>

                        {/* 줄거리 */}
                        <div className="pt-4 pb-8 border-t border-white/20 flex flex-col gap-3">
                            <div className="h-4 bg-gray-300 rounded w-full" />
                            <div className="h-4 bg-gray-300 rounded w-full" />
                            <div className="h-4 bg-gray-300 rounded w-3/4" />
                        </div>
                    </div>
                </div>

                {/* 출연/제작 */}
                <div className="mt-16 mx-auto px-6 pb-20">
                    <div className="h-8 bg-gray-300 rounded w-32 mb-8" />{" "}
                    {/* 섹션 제목 */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-8">
                        {Array.from({ length: 10 }).map((_, i) => (
                            <div
                                key={i}
                                className="flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-white/10"
                            >
                                <div className="w-16 h-20 bg-gray-300 rounded-lg flex-shrink-0" />{" "}
                                {/* 프로필 */}
                                <div className="flex flex-col gap-2 flex-1">
                                    <div className="h-3 bg-gray-300 rounded w-full" />{" "}
                                    {/* 이름 */}
                                    <div className="h-3 bg-gray-300 rounded w-3/4" />{" "}
                                    {/* 역할 */}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 유사한 영화 */}
                <div className="px-6 mb-10">
                    <div className="h-8 bg-gray-300 rounded w-64 mb-8" />{" "}
                    {/* 섹션 제목 */}
                    <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-8">
                        {Array.from({ length: 6 }).map((_, i) => (
                            <div key={i} className="flex flex-col gap-2">
                                <div className="w-full aspect-[2/3] bg-gray-300 rounded-xl" />{" "}
                                {/* 포스터 */}
                                <div className="h-3 bg-gray-300 rounded w-full" />{" "}
                                {/* 제목 */}
                            </div>
                        ))}
                    </div>
                </div>

                {/* 리뷰 */}
                <div className="mx-auto px-6 pb-12 mt-20">
                    <div className="h-8 bg-gray-300 rounded w-32 mb-8" />{" "}
                    {/* 섹션 제목 */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {Array.from({ length: 3 }).map((_, i) => (
                            <div
                                key={i}
                                className="p-6 bg-white/10 rounded-2xl border border-white/20"
                            >
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-12 h-12 bg-gray-300 rounded-full" />{" "}
                                    {/* 아바타 */}
                                    <div className="flex flex-col gap-2">
                                        <div className="h-4 bg-gray-300 rounded w-24" />{" "}
                                        {/* 이름 */}
                                        <div className="h-3 bg-gray-300 rounded w-16" />{" "}
                                        {/* 날짜 */}
                                    </div>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <div className="h-3 bg-gray-300 rounded w-full" />
                                    <div className="h-3 bg-gray-300 rounded w-full" />
                                    <div className="h-3 bg-gray-300 rounded w-2/3" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );

    return (
        <div className="relative">
            {movie.backdrop_path ? (
                <img
                    src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                    className="w-full h-240 object-cover"
                />
            ) : (
                <div className="w-full h-240 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                    <span className="text-3xl font-bold text-gray-300">
                        {movie.title}
                    </span>
                </div>
            )}

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
            <div className="px-20 mx-auto mt-20 mb-12 max-w-8xl">
                <div className="flex flex-row gap-16 items-start">
                    {/* 왼쪽: 포스터 */}
                    <img
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        className="w-[350px] h-auto object-cover rounded-xl shadow-2xl flex-shrink-0"
                    />

                    {/* 오른쪽 전체 */}
                    <div className="flex flex-col gap- flex-1 ">
                        {/* 상단: 별점 + 예상평점 + 액션버튼 */}
                        <div className="flex items-center gap-10 border-b border-white/10 pb-6 mt-10">
                            {/* 별점 */}
                            <div className="flex flex-col items-center gap-2">
                                <div className="flex items-center space-x-1">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <svg
                                            key={star}
                                            className={`w-18 h-18 cursor-pointer transition-all hover:scale-110 ${
                                                hoverRating >= star ||
                                                userRating >= star
                                                    ? "text-yellow-400 fill-current"
                                                    : "text-gray-400"
                                            }`}
                                            onClick={() => setRating(star)}
                                            onMouseEnter={() =>
                                                setHoverRating(star)
                                            }
                                            onMouseLeave={() =>
                                                setHoverRating(0)
                                            }
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                        >
                                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                        </svg>
                                    ))}
                                </div>
                                <span className="text-sm text-gray-400">
                                    평가하기
                                </span>
                            </div>

                            {/* 예상 별점 */}
                            <div className="flex flex-col items-center gap-5">
                                <span className="text-6xl font-bold text-pink-500">
                                    {convertFive(movie.vote_average)}
                                </span>
                                <span className="text-sm text-gray-400">
                                    예상 별점
                                </span>
                            </div>

                            {/* 액션 버튼들 */}
                            <div className="flex items-center gap-10 ml-40 ">
                                <button
                                    onClick={() => toggleFavorite(movie)}
                                    className="flex flex-col items-center gap-1 w-20 text-gray-400 "
                                >
                                    <span className="text-2xl">
                                        {isFavorite(movie.id) ? "❤️" : "＋"}
                                    </span>
                                    <span className="text-2xl whitespace-nowrap">
                                        {isFavorite(movie.id)
                                            ? "찜완료"
                                            : "보고싶어요"}
                                    </span>
                                </button>

                                <button className="flex flex-col items-center gap-1 text-gray-400 ">
                                    <span className="text-2xl">✏️</span>
                                    <span className="text-2xl">코멘트</span>
                                </button>

                                <button className="flex flex-col items-center gap-1 text-gray-400">
                                    <span className="text-2xl">👁️</span>
                                    <span className="text-2xl">보는 중</span>
                                </button>
                            </div>
                        </div>
                        <div className="w-full h-px bg-gray-300 mb-4 mt-5" />
                        {/* 줄거리 */}
                        <div className="text-gray-700 leading-relaxed text-sm">
                            {movie.overview ? (
                                <p>{movie.overview}</p>
                            ) : (
                                <p className="text-gray-500">
                                    {movie.title}에 대한 상세 줄거리 정보가
                                    없습니다. 감독{" "}
                                    {movie.directors?.[0]?.name || "미상"}의{" "}
                                    {movie.genres[0]?.name || ""} 장르
                                    작품입니다.
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* 스트리밍 플랫폼 */}
            {provider?.flatrate && provider.flatrate.length > 0 ? (
                <div className="pb-4 px-6">
                    <div className="w-full h-px bg-gray-300 mb-4" />
                    <p className="text-3xl font-bold ">스트리밍 플랫폼</p>
                    {provider.flatrate.map((p) => (
                        <div
                            key={p.provider_id}
                            className="flex items-center gap-2 bg-white/10 rounded-xl px-4 py-2 mt-8"
                        >
                            <img
                                src={`https://image.tmdb.org/t/p/w45${p.logo_path}`}
                                alt={p.provider_name}
                                className="w-14 h-14 rounded-lg"
                            />
                            <span className="text-xl font-medium">
                                {p.provider_name}
                            </span>
                        </div>
                    ))}
                    <div className="w-full h-px bg-gray-300 mb-4 mt-5" />
                </div>
            ) : (
                <div>
                    <div className="pb-4 px-6">
                        <div className="w-full h-px bg-gray-300 mb-4" />
                        <p className="text-3xl font-bold">스트리밍 플랫폼</p>
                        <p className="mt-6 text-gray-500 text-lg">
                            스트리밍 플랫폼 정보가 없습니다.
                        </p>
                        <div className="w-full h-px bg-gray-300 mb-4 mt-5" />
                    </div>
                </div>
            )}
            {/* 출연제작 */}
            <div className="mt-16 mx-auto px-6 pb-20 ">
                <h2 className="text-3xl font-bold mb-8 pb-4 border-b border-white/30 text-left">
                    출연/제작
                </h2>

                {/* 그리드 */}
                <div className=" grid grid-cols-2  sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-8">
                    {currentCasts.map((person, index) => (
                        <Link
                            to={`/actor/${person.id}`}
                            key={person.id ?? index}
                            className="group flex items-center gap-3 p-3 bg-white/5 backdrop-blur-sm rounded-xl hover:bg-white/10 transition-all border border-white/10 hover:border-white/20 cursor-pointer"
                        >
                            <div className="flex-shrink-0 w-16 h-20 rounded-lg overflow-hidden shadow-md group-hover:scale-105 transition-transform">
                                {person.profile_path ? (
                                    <img
                                        src={`https://image.tmdb.org/t/p/w92${person.profile_path}`}
                                        alt={person.name}
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
                                    {person.name}
                                </p>
                                <p className="text-gray-400 text-xs line-clamp-2 leading-tight mt-3">
                                    {"character" in person
                                        ? `출연 | ${person.character || "출연"}`
                                        : `제작 | ${person.job || "감독"}`}
                                </p>
                            </div>
                        </Link>
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
            {/* 유사한 영화  */}
            {sim.length > 0 && (
                <div className="px-6 mb-10">
                    <h2 className="text-3xl font-bold mb-8 pb-4 border-b border-white/30 text-left">
                        {simName === "similar" &&
                            `"${movie.title}"와 유사한 영화`}
                        {simName === "recommendations" &&
                            `"${movie.title}"의 추천 영화`}
                        {simName === "genre" &&
                            `"${movie.title}"의 장르 기반 추천 영화`}
                    </h2>
                    <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-8">
                        {sim.map((movie) => (
                            <div
                                key={movie.id}
                                onClick={() => navigate(`/movie/${movie.id}`)}
                                className="cursor-pointer transition-all duration-300"
                            >
                                {movie.poster_path ? (
                                    <img
                                        src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                                        alt={movie.title}
                                        className="w-full h-full rounded-xl shadow-lg"
                                    />
                                ) : (
                                    <div className="w-full h-full rounded flex-shrink-0 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center text-center">
                                        <span className="text-gray-400 text-xl font-medium">
                                            No Image
                                        </span>
                                    </div>
                                )}

                                <p className="text-sm font-semibold mt-2 line-clamp-1">
                                    {movie.title}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
            {/* 리뷰 */}
            <div className="mx-auto px-6 pb-12 mt-20">
                <h2 className="text-3xl font-bold mb-8 pb-4 border-b border-white/30 text-left flex items-center gap-3">
                    리뷰 ({reviews.length}+)
                </h2>
                {reviews.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {reviews.map((review) => (
                            <div
                                key={review.id}
                                className="p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 hover:bg-white/20 transition-all"
                            >
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center font-bold text-sm text-white">
                                        {review.author
                                            .slice(0, 3)
                                            .toUpperCase()}
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-xl  truncate">
                                            {review.author}
                                        </h4>
                                        <p className=" text-sm">
                                            {new Date(
                                                review.created_at,
                                            ).toLocaleDateString("ko-KR")}
                                        </p>
                                    </div>
                                </div>
                                <p className="text-lg leading-7  line-clamp-4">
                                    {review.content}
                                </p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div>
                        <p className="text-xl">아직 등록된 리뷰가 없습니다.</p>
                    </div>
                )}
                <div className="text-center mt-8">
                    <button className="px-8 py-3 bg-gradient-to-r from-gray-500 to-gray-500 text-white font-bold rounded-xl hover:from-amber-600 hover:to-orange-600 transition-all shadow-lg">
                        모든 리뷰 보기
                    </button>
                </div>

                <div className="w-full h-px bg-gray-300 mt-12" />
            </div>
        </div>
    );
}
