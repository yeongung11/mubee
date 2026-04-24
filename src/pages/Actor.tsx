import type { Actor, Movie } from "../types/movie";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useEffectEvent } from "react";
import { fetchActorDetail, fetchActorMovies } from "../api/tmdb";
import { useRating } from "../utils/useRating";
import { getEngTitle, getEngName } from "@/utils/movieTitle";

export function Actor() {
    const navigate = useNavigate();
    const { convertFive } = useRating();
    const { actorId } = useParams<{ actorId: string }>();
    const [actor, setActor] = useState<Actor | null>(null);
    const [movies, setMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState(true);

    const loadActorData = useEffectEvent(async () => {
        if (!actorId) return;

        setLoading(true);

        try {
            const [actorData, moviesData] = await Promise.all([
                fetchActorDetail(Number(actorId)),
                fetchActorMovies(Number(actorId)),
            ]);

            const [resolvedName, resolvedMovies] = await Promise.all([
                getEngName(actorData.id, actorData.name),
                Promise.all(
                    moviesData.map(async (movie: Movie) => ({
                        ...movie,
                        title: await getEngTitle(movie),
                    })),
                ),
            ]);

            setActor({ ...actorData, name: resolvedName });
            setMovies(resolvedMovies);
        } catch (err) {
            console.error("Actor 로드 실패:", err);
        } finally {
            setLoading(false);
        }
    });

    useEffect(() => {
        loadActorData();
    }, [actorId]);

    // 로딩
    if (loading)
        return (
            <div className="animate-pulse px-20">
                {/* 프로필 영역 */}
                <div className="mt-30 mb-8 flex flex-col gap-4">
                    <div className="w-46 h-64 bg-gray-300 rounded-xl" />{" "}
                    {/* 프로필 이미지 */}
                    <div className="h-8 bg-gray-300 rounded w-40" />{" "}
                    {/* 이름 */}
                    <div className="h-4 bg-gray-300 rounded w-32" />{" "}
                    {/* 생년월일 */}
                    <div className="h-4 bg-gray-300 rounded w-48" />{" "}
                    {/* 출생지 */}
                </div>
                <div className="w-full h-px bg-gray-300 my-4" />
                {/* 출연작 목록 */}
                <div className="h-6 bg-gray-300 rounded w-20 mb-8" />{" "}
                {/* "출연작" 제목 */}
                {Array.from({ length: 5 }).map((_, i) => (
                    <div
                        key={i}
                        className="grid grid-cols-[2fr_1fr_1fr] items-center gap-4 mb-4 px-2"
                    >
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-4 bg-gray-300 rounded" />{" "}
                            {/* 연도 */}
                            <div className="w-36 h-48 bg-gray-300 rounded" />{" "}
                            {/* 포스터 */}
                            <div className="h-4 bg-gray-300 rounded w-32" />{" "}
                            {/* 제목 */}
                        </div>
                        <div className="h-4 bg-gray-300 rounded w-20" />{" "}
                        {/* 역할 */}
                        <div className="h-4 bg-gray-300 rounded w-12" />{" "}
                        {/* 별점 */}
                    </div>
                ))}
            </div>
        );

    if (!actor)
        return (
            <div className="flex justify-center items-center">
                배우 정보 없음
            </div>
        );

    const sortedMovies = [...movies].sort((a, b) => {
        const dateA = new Date(a.release_date ?? "").getTime();
        const dateB = new Date(b.release_date ?? "").getTime();
        return dateB - dateA;
    });

    return (
        <div className="px-20">
            <div className="flex gap-16 items-start mt-30 mb-12">
                {/* 왼쪽: 프로필 */}
                <div className="flex flex-col gap-4">
                    {actor.profile_path ? (
                        <img
                            className="w-56 h-86 rounded-xl object-cover"
                            src={`https://image.tmdb.org/t/p/w342${actor.profile_path}`}
                            alt={actor.name}
                        />
                    ) : (
                        <div className="w-46 h-64 rounded-xl bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                            <span className="text-gray-400 font-medium">
                                No Image
                            </span>
                        </div>
                    )}

                    <div className="flex flex-col gap-2 mt-15">
                        <div className="text-3xl">{actor.name}</div>
                        <p className="font-bold">
                            {actor.birthday || "생년월일 정보 없음"}
                        </p>
                        <p className="font-bold">
                            {actor.place_of_birth || "출생지 정보 없음"}
                        </p>
                    </div>
                </div>

                {/* 오른쪽: 대표 출연작 */}
                <div className="flex-1">
                    {/* <h2 className="text-2xl mb-6">대표 출연작</h2> */}
                    <div className="flex gap-12 overflow-x-auto justify-center">
                        {movies.slice(0, 3).map((movie) => (
                            <div key={movie.id} className="min-w-[180px]">
                                <img
                                    src={`https://image.tmdb.org/t/p/w342${movie.poster_path}`}
                                    alt={movie.title}
                                    className="w-full rounded-lg"
                                />
                                <div className="mt-3">
                                    <p>{movie.title}</p>
                                    <p className="text-sm text-gray-500">
                                        {movie.release_date?.slice(0, 4)}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="w-full h-px bg-gray-300 my-4" />

            <section>
                <h1 className="text-2xl mb-8">출연작</h1>

                <div className="grid grid-cols-[2fr_1fr_1fr] text-gray-700 text-sm mb-4 px-2">
                    <span>제목</span>
                    <span>역할</span>
                    <span>평가</span>
                </div>
                <div className="w-full h-px bg-gray-300 mb-4" />

                {sortedMovies.slice(0, 14).map((movie) => {
                    const year = movie.release_date
                        ? movie.release_date.split("-")[0]
                        : "미정";

                    return (
                        <div key={movie.id}>
                            <div className="grid grid-cols-[2fr_1fr_1fr] items-center gap-4 mb-4 px-2">
                                {/* 제목 (연도 + 이미지 + 텍스트) */}
                                <div className="flex items-center gap-4">
                                    <span className="text-sm text-gray-700 min-w-[50px]">
                                        {year}
                                    </span>
                                    {movie.poster_path ? (
                                        <img
                                            src={`https://image.tmdb.org/t/p/w185${
                                                movie.poster_path || ""
                                            }`}
                                            onClick={() =>
                                                navigate(`/movie/${movie.id}`)
                                            }
                                            alt={movie.title}
                                            className="w-36 h-48 cursor-pointer rounded"
                                        />
                                    ) : (
                                        <div className="mb-8 w-36 h-48 rounded-xl bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                                            <span className="text-gray-700 font-medium">
                                                No Image
                                            </span>
                                        </div>
                                    )}

                                    <p>{movie.title}</p>
                                </div>

                                {/* 역할 */}
                                <p className="text-gray-700">
                                    {movie.character}
                                </p>

                                {/* 별점 */}
                                <p className="text-yellow-700">
                                    ⭐ {convertFive(movie.vote_average)}
                                </p>
                            </div>

                            <div className="w-full h-px bg-gray-300 mb-4" />
                        </div>
                    );
                })}
            </section>
        </div>
    );
}
